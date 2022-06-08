package com.activities.api.controllers;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.activities.api.dto.PageRequest;
import com.activities.api.dto.PagingResponse;
import com.activities.api.dto.ReservationDTO;
import com.activities.api.dto.ReservationRequest;
import com.activities.api.dto.UserCreationRequest;
import com.activities.api.entities.Authority;
import com.activities.api.entities.BankCard;
import com.activities.api.entities.Parent;
import com.activities.api.entities.Reservation;
import com.activities.api.entities.User;
import com.activities.api.services.ActivityService;
import com.activities.api.services.AuthorityService;
import com.activities.api.services.BankCardService;
import com.activities.api.services.ParentService;
import com.activities.api.services.ReservationService;
import com.activities.api.services.UserService;
import com.activities.api.utils.CustomPasswordEncoder;
import com.activities.api.utils.MyUtil;

@RestController
@RequestMapping("parent")
public class ParentController {
    
    @Autowired private AuthorityService authorityService;
    @Autowired private CustomPasswordEncoder encoder;
    @Autowired private ParentService parentService;
    @Autowired private UserService userService;
    @Autowired private ActivityService activityService;
    @Autowired private ReservationService reservationService;
    @Autowired private BankCardService bankCardService;

    @GetMapping("/{parent_id}/cards")
    public ResponseEntity<List<BankCard>> getBankCards(@PathVariable int parent_id){
        return ResponseEntity.ok().body(
            bankCardService.getByParent(parentService.getParent(parent_id))
        );     
    }

    @GetMapping("/{parent_id}/history")
    public ResponseEntity<PagingResponse<List<ReservationDTO>>> getHistory(@PathVariable int parent_id, @RequestBody PageRequest req){
        
        //get reservations of parent
        Parent parent = parentService.getParent(parent_id);
        if(parent == null) return ResponseEntity.badRequest().header("error", "parent (parent.id=" + parent_id +") does not exist").body(null);
        
        List<Reservation> reservations = reservationService.getReservationsByParent(parent);
        if(reservations == null) return ResponseEntity.ok().body(null);

        //format them
        List<ReservationDTO> res = reservations.stream().map(
            reservation -> new ReservationDTO(reservation, activityService)
        ).collect(Collectors.toList());

        //sort list
        Collections.sort(res);

        int total_pages = (int) Math.ceil((double) res.size() / (double) req.getPageSize());
        PagingResponse<List<ReservationDTO>> response = new PagingResponse<List<ReservationDTO>>(
            MyUtil.getPage(res, req.getPageNumber(), req.getPageSize()), total_pages
            );

        return ResponseEntity.ok().body(response);

    }

    @PostMapping("/{parent_id}/reservation")
    public ResponseEntity<List<ReservationRequest>> makeReservation(@PathVariable int parent_id, @RequestBody List<ReservationRequest> reservations){
        try {
            parentService.makeReservations(reservations, parent_id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().header("error", e.getMessage()).body(reservations);
        }
        return ResponseEntity.ok().body(reservations);
    }

    @PostMapping("/signup")
    public ResponseEntity<Parent> createNewParent(@RequestBody UserCreationRequest req){
        Authority authority = authorityService.getAuthority("ROLE_PARENT");

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(encoder.getPasswordEncoder().encode(req.getPassword()));
        user.setEmail(req.getEmail());
        user.addRole(authority);
        userService.createOrUpdateUser(user);

        Parent parent = new Parent();
        parent.setUser(user);
        parentService.saveOrUpdateParent(parent);

        user.setPassword(null);
        parent.setUser(user);

        return ResponseEntity.ok().body(parent);
    }
}
