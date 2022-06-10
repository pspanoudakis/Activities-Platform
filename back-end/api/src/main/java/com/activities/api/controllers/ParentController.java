package com.activities.api.controllers;

import java.time.LocalDate;
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

import com.activities.api.dto.ActivityCompact;
import com.activities.api.dto.EvaluationRequest;
import com.activities.api.dto.PageRequest;
import com.activities.api.dto.PagingResponse;
import com.activities.api.dto.ParentProfileDTO;
import com.activities.api.dto.PlannedActivity;
import com.activities.api.dto.ReservationDTO;
import com.activities.api.dto.ReservationRequest;
import com.activities.api.dto.UserCreationRequest;
import com.activities.api.entities.Activity;
import com.activities.api.entities.Authority;
import com.activities.api.entities.BankCard;
import com.activities.api.entities.Evaluation;
import com.activities.api.entities.Parent;
import com.activities.api.entities.Reservation;
import com.activities.api.entities.User;
import com.activities.api.services.ActivityService;
import com.activities.api.services.AuthorityService;
import com.activities.api.services.BankCardService;
import com.activities.api.services.EvaluationService;
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
    @Autowired private EvaluationService evaluationService;

    @PostMapping("/edit_profile")
    public ResponseEntity<ParentProfileDTO> editProfile(@RequestBody ParentProfileDTO profile){
    
        Parent parent = parentService.getParent(profile.getId());
        if(parent == null)return ResponseEntity.badRequest().header("error", "no parent with parent.id = " + profile.getId()).body(null);

        User user = parent.getUser();
        if(user.getBalance() != profile.getBalance())return ResponseEntity.badRequest().header("error", "you cannot change balance from here").body(null);

        user.setEmail(profile.getEmail());
        user.setImage(profile.getImage());
        user.setName(profile.getName());
        user.setSurname(profile.getSurname());
        
        parent.setAddress(profile.getAddress());
        parent.setLatitude(profile.getLatitude());
        parent.setLongitude(profile.getLongitude());

        return ResponseEntity.ok().body(new ParentProfileDTO(parentService.saveParentWithUser(parent, user)));
    }

    @GetMapping("/{parent_id}/profile")
    public ResponseEntity<ParentProfileDTO> getProfile(@PathVariable int parent_id){
        Parent parent = parentService.getParent(parent_id);
        if(parent == null)return ResponseEntity.badRequest().header("error", "no parent with parent.id = " + parent_id).body(null);

        return ResponseEntity.ok().body(new ParentProfileDTO(parent));
    }

    @PostMapping("/{parent_id}/evaluate/{activity_id}")
    public ResponseEntity<String> makeEvaluation(@PathVariable int parent_id, @PathVariable int activity_id, @RequestBody EvaluationRequest req){

        int rating = req.getRating();
        if(rating < 1 || rating > 5)
            return ResponseEntity.badRequest().header("error", "given rating: " + rating + " (must be between 1 and 5)" ).body(null);
        
        Parent parent = parentService.getParent(parent_id);
        if(parent == null)return ResponseEntity.badRequest().header("error", "no parent with parent.id = " + parent_id).body(null);

        Activity activity = activityService.getActivity(activity_id);
        if(activity == null)return ResponseEntity.badRequest().header("error", "no activity with activity.id = " + activity_id).body(null);

        List<Long> parentReservedActivityIds = reservationService.getParentReservedActivityIds(parent_id);
        if(!parentReservedActivityIds.contains((long) activity_id))
            return ResponseEntity.badRequest().header("error", "parent (parent.id = " + parent_id + ") has not made reservation to activity (activity.id = " + activity_id + ")").body(null);

        Evaluation evaluation = new Evaluation();
        evaluation.setActivity(activity);
        evaluation.setComment(req.getComment());
        evaluation.setParent(parent);
        evaluation.setRating(rating);

        if(evaluationService.saveOrUpdate(evaluation) == null)
            return ResponseEntity.badRequest().header("error", "error with saving new evaluation").body(null);

        return ResponseEntity.ok().body("evaluation saved");
    }

    @GetMapping("/{parent_id}/recently_booked")
    public ResponseEntity<List<ActivityCompact>> getMyTest(@PathVariable int parent_id){
        
        return ResponseEntity.ok().body(activityService.getRecentlyBooked(parent_id, 5).stream().map(
            act -> new ActivityCompact(act, activityService, LocalDate.now())).collect(Collectors.toList())
        );
    }

    @GetMapping("/{parent_id}/cards")
    public ResponseEntity<List<BankCard>> getBankCards(@PathVariable int parent_id){
        
        Parent parent = parentService.getParent(parent_id);
        if(parent == null)return ResponseEntity.badRequest().header("error", "no parent with parent.id = " + parent_id).body(null);

        return ResponseEntity.ok().body(
            bankCardService.getByParent(parent)
        );     
    }

    @GetMapping("/{parent_id}/upcoming")
    public ResponseEntity<List<PlannedActivity>> getUpcoming(@PathVariable int parent_id){
        Parent parent = parentService.getParent(parent_id);
        if(parent == null)return ResponseEntity.badRequest().header("error", "no parent with parent.id = " + parent_id).body(null);

        List<PlannedActivity> activities = reservationService.getReservationsByParent(parent).stream().map(
            res ->{
                PlannedActivity pa = new PlannedActivity(res.getActivityAtDay());
                return pa;
            }
        ).collect(Collectors.toList());
        Collections.sort(activities);
        activities = activities.stream().limit(5).collect(Collectors.toList());

        return ResponseEntity.ok().body(activities);
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
