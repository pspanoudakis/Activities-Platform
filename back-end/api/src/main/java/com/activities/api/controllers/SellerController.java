package com.activities.api.controllers;


import com.activities.api.dto.*;
import com.activities.api.entities.*;
import com.activities.api.services.*;
import org.springframework.data.util.Pair;

import com.activities.api.utils.CustomPasswordEncoder;
import com.activities.api.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import com.activities.api.entities.Facility;

import java.util.List;

@RestController
@RequestMapping("/seller")
public class SellerController {

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomPasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private SellerService sellerService;


    @Autowired
    private FacilityService facilityService;

    @Autowired
    private  ActivityService activityService;




    @PostMapping("/signup")
    public ResponseEntity<Seller> createNewSeller(@RequestBody UserCreationRequest request){
        Authority authority = authorityService.getAuthority("ROLE_SELLER");

        if(userService.getUserByUN(request.getUsername()) != null)
            return ResponseEntity.badRequest().header("error", "username already exists").body(null);
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(encoder.getPasswordEncoder().encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.addRole(authority);
        userService.createOrUpdateUser(user);

        Seller seller = new Seller();
        seller.setUser(user);
        sellerService.saveOrUpdateSeller(seller);
        String token = jwtUtil.generateToken(user);

        user.setPassword(null);
        seller.setUser(user);

        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, token).body(seller);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request){
        try {
            Pair<String, User> pair = userService.login(request, "ROLE_SELLER");
            User user = pair.getSecond();

            Seller seller = sellerService.getByUser(user);

            if(seller != null)seller.setUser(user);
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            pair.getFirst()
                    )
                    .body(seller);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error", ex.getMessage()).build();
        }
    }

    @PostMapping("/quick_login")
    public ResponseEntity<?> quickLogin(@RequestHeader(HttpHeaders.AUTHORIZATION) String full_token){

        try {
            String token = full_token.split(" ")[1];
            Pair<String, User> pair = userService.quick_login(token, "ROLE_SELLER");

            User user = pair.getSecond();
            Seller seller = sellerService.getByUser(user);
            if(seller != null) seller.setUser(user);

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            token
                    )
                    .body(seller);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error", ex.getMessage()).build();
        }
    }

    @PostMapping("/new_facility")
    public ResponseEntity<FacilityDTO> createNewFacility(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody Facility newFacility){
        Seller seller;
        try{
            seller = sellerService.getSellerFromToken(token);
        }catch (Exception e) {
            return ResponseEntity.badRequest().header(
                    "error",e.getMessage()
            ).body(null);
        }
        newFacility.setSeller(seller);
        FacilityDTO resp = facilityService.saveOrUpdateFacility(newFacility);
        return ResponseEntity.ok().body(resp);
    }

    //TODO: Add paging and sorting
    @GetMapping("/facilities")
    public ResponseEntity<List<FacilityDTO>> getAllFacilities(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        Seller seller;
        try{
            seller = sellerService.getSellerFromToken(token);
            List<FacilityDTO> facilities = facilityService.getFacilitiesBySeller(seller);
            return ResponseEntity.ok().body(facilities);

        }catch (Exception e) {
            return ResponseEntity.badRequest().header(
                    "error",e.getMessage()
            ).body(null);
        }
    }

    @PutMapping("facility/{facility_id}")
    public ResponseEntity<FacilityDTO> editFacility(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,@PathVariable int facility_id, @RequestBody Facility updatedFacility){
        Seller seller;
        try{
            seller = sellerService.getSellerFromToken(token);
        }catch (Exception e) {
            return ResponseEntity.badRequest().header(
                    "error",e.getMessage()
            ).body(null);
        }

        if(!facilityService.exists(facility_id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header("error","no facility with such id").body(null);

        if(!facilityService.isOwnedBySeller(seller,facility_id))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error","this seller is not the owner of the requested facility").body(null);
        updatedFacility.setId(facility_id);
        updatedFacility.setSeller(seller);
        return ResponseEntity.ok().body(facilityService.saveOrUpdateFacility(updatedFacility));
        
    }

    @GetMapping("/total_facilities")
    public ResponseEntity<?> getTotalFacilities(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        Seller seller;
        try{
            seller = sellerService.getSellerFromToken(token);
        }catch (Exception e) {
            return ResponseEntity.badRequest().header(
                    "error",e.getMessage()
            ).body(null);
        }

        Object responseBody = new Object() {
            public final int total_facilities = facilityService.getFacilitiesBySeller(seller).size();
        };
        return new ResponseEntity<>(responseBody,HttpStatus.OK);

    }

    @PostMapping("/new_activity")
    public ResponseEntity<ActivityCreation> createNewActivity(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody ActivityCreation newActivity){
        return ResponseEntity.ok().body(activityService.createNewActivity(newActivity));
    }

    //TODO: Add paging and sorting
    @GetMapping("/activities")
    public ResponseEntity<List<ActivitySellerPreview>> getAllActivities(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        Seller seller;
        try{
            seller = sellerService.getSellerFromToken(token);
        }catch (Exception e) {
            return ResponseEntity.badRequest().header(
                    "error",e.getMessage()
            ).body(null);
        }
        return ResponseEntity.ok().body(activityService.getActivitySellerPreviewList(seller));
    }

    @GetMapping("/activity_details/{activity_id}")
    public ResponseEntity<ActivitySellerDetails> getActivityDetails(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,@PathVariable int activity_id){
        Seller seller;
        try{
            seller = sellerService.getSellerFromToken(token);
        }catch (Exception e) {
            return ResponseEntity.badRequest().header(
                    "error",e.getMessage()
            ).body(null);
        }

        if(!activityService.exists(activity_id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header("error","no activity with such id").body(null);

        if(!activityService.isOwnedBySeller(seller,activity_id))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error","this seller is not the owner of the requested activity").body(null);

        return ResponseEntity.ok().body(activityService.getActivitySellerDetails(activity_id));

    }

    @PutMapping("/activity_update/{activity_id}")
    public ResponseEntity<ActivityUpdate> updateActivity(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,@PathVariable int activity_id,@RequestBody ActivityUpdate updated){
        Seller seller;
        try{
            seller = sellerService.getSellerFromToken(token);
        }catch (Exception e) {
            return ResponseEntity.badRequest().header(
                    "error",e.getMessage()
            ).body(null);
        }

        if(!activityService.exists(activity_id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header("error","no activity with such id").body(null);

        if(!activityService.isOwnedBySeller(seller,activity_id))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error","this seller is not the owner of the requested activity").body(null);


        return ResponseEntity.ok().body(activityService.updateActivity(updated,activity_id));
    }

    @GetMapping("/total_activities")
    public ResponseEntity<?> getTotalActivities(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        Seller seller;
        try{
            seller = sellerService.getSellerFromToken(token);
        }catch (Exception e) {
            return ResponseEntity.badRequest().header(
                    "error",e.getMessage()
            ).body(null);
        }

        Object responseBody = new Object() {
            public final int total_activities = activityService.getAllActivitiesOfSeller(seller).size();
        };
        return new ResponseEntity<>(responseBody,HttpStatus.OK);

    }

    @GetMapping("/activity_reviews/{activity_id}")
    public ResponseEntity<List<ActivityReview>> getReviewsofActivity(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,@PathVariable int activity_id){
        Seller seller;
        try{
            seller = sellerService.getSellerFromToken(token);
        }catch (Exception e) {
            return ResponseEntity.badRequest().header(
                    "error",e.getMessage()
            ).body(null);
        }

        if(!activityService.exists(activity_id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header("error","no activity with such id").body(null);

        if(!activityService.isOwnedBySeller(seller,activity_id))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error","this seller is not the owner of the requested activity").body(null);

        return ResponseEntity.ok().body(activityService.getReviews(activity_id));
    }






}
