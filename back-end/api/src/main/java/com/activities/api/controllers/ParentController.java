package com.activities.api.controllers;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.activities.api.dto.ActivityCompact;
import com.activities.api.dto.AuthCredentialsRequest;
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
import com.activities.api.utils.JwtUtil;
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
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/{parent_id}/add_card")
    public ResponseEntity<BankCard> addCard(@PathVariable int parent_id, @RequestBody BankCard card){

        Parent parent = parentService.getParent(parent_id);
        if(parent == null)return ResponseEntity.badRequest().header("error", "no parent with parent.id = " + parent_id).body(null);

        card.setParent(parent);
        return ResponseEntity.ok().body(bankCardService.saveOrUpdateCard(card));
    }

    @PostMapping("/{parent_id}/add_points/{points}")
    public ResponseEntity<String> addPoints(@PathVariable int parent_id, @PathVariable int points){

        Parent parent = parentService.getParent(parent_id);
        if(parent == null)return ResponseEntity.badRequest().header("error", "no parent with parent.id = " + parent_id).body(null);

        User user = parent.getUser();
        int total = user.getBalance();
        total += points;
        user.setBalance(total);

        if(parentService.saveParentWithUser(parent, user) == null)
            return ResponseEntity.badRequest().header("error", "error while saving data").body(null);

        return ResponseEntity.ok().body("ok");
    }

    @DeleteMapping("/{parent_id}/card/{card_id}")
    public ResponseEntity<BankCard> deleteCard(@PathVariable int parent_id, @PathVariable int card_id){

        Parent parent = parentService.getParent(parent_id);
        if(parent == null)return ResponseEntity.badRequest().header("error", "no parent with parent.id = " + parent_id).body(null);

        BankCard card = bankCardService.getCard(card_id);
        if(card == null)return ResponseEntity.badRequest().header("error", "no card with card.id = " + card_id).body(null);

        if(card.getParent().getId() != parent_id)return ResponseEntity.badRequest().header("error", "card (card.id = " + card_id + ") does not belong to parent (parent.id = " + parent_id + ")").body(null);

        bankCardService.deleteCard(card);
        return ResponseEntity.ok().body(card);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request){
        try {
            Authentication authenticate = authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                    )
                );

            User user = (User) authenticate.getPrincipal();
            Parent parent = parentService.getByUser(user);

            Authority parent_role = authorityService.getAuthority("ROLE_PARENT");
            if(!user.getAuthorities().contains(parent_role))
                throw new BadCredentialsException("user is not a parent");

            String token = jwtUtil.generateToken(user);
            
            user.setPassword(null);
            if(parent != null)parent.setUser(user);
            return ResponseEntity.ok()
                .header(
                    HttpHeaders.AUTHORIZATION,
                    token
                )
                .body(parent);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error", ex.getMessage()).build();
        }
    }

    @DeleteMapping("/{parent_id}")
    public ResponseEntity<Parent> deleteParent(@PathVariable int parent_id){
        Parent parent = parentService.getParent(parent_id);
        if(parent == null)return ResponseEntity.badRequest().header("error", "no parent with parent.id = " + parent_id).body(null);

        parentService.deleteParent(parent);
        return ResponseEntity.ok().body(parent);
    }

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

    @GetMapping("/profile")
    public ResponseEntity<ParentProfileDTO> getProfile(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        try {
            return ResponseEntity.ok().body(
            new ParentProfileDTO(
                getParentFromToken(token)
            )
        );
        } catch (Exception e) {
            return ResponseEntity.badRequest().header(
                "error", e.getMessage()
            ).body(null);
        }
    }

    @PostMapping("/evaluate/{activity_id}")
    public ResponseEntity<String> makeEvaluation(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable int activity_id, @RequestBody EvaluationRequest req){

        int rating = req.getRating();
        if(rating < 1 || rating > 5)
            return ResponseEntity.badRequest().header("error", "given rating: " + rating + " (must be between 1 and 5)" ).body(null);
        
        Parent parent;
        try {
            parent = getParentFromToken(token);
        } catch (Exception e) {
            return ResponseEntity.badRequest().header(
                "error", e.getMessage()
            ).body(null);
        }

        Activity activity = activityService.getActivity(activity_id);
        if(activity == null)return ResponseEntity.badRequest().header("error", "no activity with activity.id = " + activity_id).body(null);

        int parent_id = parent.getId();
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

    @GetMapping("/cards")
    public ResponseEntity<List<BankCard>> getBankCards(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        try {
        return ResponseEntity.ok().body(
            bankCardService.getByParent(
                getParentFromToken(token)
            )
        ); 
        } catch (Exception e) {
            return ResponseEntity.badRequest().header(
                "error", e.getMessage()
            ).body(null);
        }   
    }

    @GetMapping("/upcoming")
    public ResponseEntity<PagingResponse<List<PlannedActivity>>> getUpcoming(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody PageRequest req){
        Parent parent;
        try {
            parent = getParentFromToken(token);
        } catch (Exception e) {
            return ResponseEntity.badRequest().header(
                "error", e.getMessage()
            ).body(null);
        }

        List<PlannedActivity> activities = reservationService.getReservationsByParent(parent).stream().map(
            res ->{
                PlannedActivity pa = new PlannedActivity(res.getActivityAtDay());
                return pa;
            }
        ).collect(Collectors.toList());
        Collections.sort(activities);

        int total_pages = (int) Math.ceil((double) activities.size() / (double) req.getPageSize());
        return ResponseEntity.ok().body(
            new PagingResponse<List<PlannedActivity>>(MyUtil.getPage(activities, req.getPageNumber(), req.getPageSize()), total_pages, req.getPageNumber())
        );
    }

    @GetMapping("/history")
    public ResponseEntity<PagingResponse<List<ReservationDTO>>> getHistory(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody PageRequest req){
        
        //get reservations of parent
        Parent parent;
        try {
            parent = getParentFromToken(token);
        } catch (Exception e) {
            return ResponseEntity.badRequest().header(
                "error", e.getMessage()
            ).body(null);
        }
        
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
            MyUtil.getPage(res, req.getPageNumber(), req.getPageSize()), total_pages, req.getPageNumber()
            );

        return ResponseEntity.ok().body(response);

    }

    @PostMapping("/reservation")
    public ResponseEntity<List<ReservationRequest>> makeReservation(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody List<ReservationRequest> reservations){
        try {
            parentService.makeReservations(reservations, getParentFromToken(token).getId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().header("error", e.getMessage()).body(reservations);
        }
        return ResponseEntity.ok().body(reservations);
    }

    @PostMapping("/signup")
    public ResponseEntity<Parent> createNewParent(@RequestBody UserCreationRequest req){
        Authority authority = authorityService.getAuthority("ROLE_PARENT");

        if(userService.getUserByUN(req.getUsername()) != null)
            return ResponseEntity.badRequest().header("error", "username already exists").body(null);

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


    Parent getParentFromToken(String token) throws BadCredentialsException{
        String username = jwtUtil.getUsernameFromToken(token.split(" ")[1]);
        User user = userService.getUserByUN(username);
        if(user == null)throw new BadCredentialsException("user " + username + " does not exist");

        Parent parent = parentService.getByUser(user);
        if(parent == null)throw new BadCredentialsException("user " + username + " is not a parent)");
        return parent;
    }
}
