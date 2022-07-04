package com.activities.api.controllers;


import com.activities.api.dto.ActivityCreation;
import com.activities.api.dto.AuthCredentialsRequest;
import com.activities.api.dto.FacilityDTO;
import com.activities.api.dto.UserCreationRequest;
import com.activities.api.entities.*;
import com.activities.api.services.*;
import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.Data;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;

import com.activities.api.utils.CustomPasswordEncoder;
import com.activities.api.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
    private AuthenticationManager authenticationManager;

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
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );

            User user = (User) authenticate.getPrincipal();
            Seller seller = sellerService.getByUser(user);

            Authority parent_role = authorityService.getAuthority("ROLE_SELLER");
            if(!user.getAuthorities().contains(parent_role))
                throw new BadCredentialsException("user is not a seller");

            String token = jwtUtil.generateToken(user);

            user.setPassword(null);
            if(seller != null)seller.setUser(user);
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

    @PostMapping("/quick_login")
    public ResponseEntity<?> quickLogin(@RequestHeader(HttpHeaders.AUTHORIZATION) String full_token){

        try {
            String token = full_token.split(" ")[1];
            User user = userService.getUserByUN(jwtUtil.getUsernameFromToken(token));
            Seller seller = sellerService.getByUser(user);
            if(jwtUtil.validateToken(token, user) == false)throw new BadCredentialsException("Token not valid");
            Authority seller_role = authorityService.getAuthority("ROLE_SELLER");
            if(!user.getAuthorities().contains(seller_role))
                throw new BadCredentialsException("user is not a seller");
            if(seller != null)seller.setUser(user);
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error","this seller is not the ower of the requested facility").body(null);
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

//    @GetMapping("/activities")
//    public ResponseEntity<List<>> getAllActivities(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
//        Seller seller;
//        try{
//            seller = sellerService.getSellerFromToken(token);
//        }catch (Exception e) {
//            return ResponseEntity.badRequest().header(
//                    "error",e.getMessage()
//            ).body(null);
//        }
//
//
//
//    }

//    @GetMapping("/activity/{activity_id}")
//    public ResponseEntity<> getAllActivities(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,@PathVariable int activity_id){
//        Seller seller;
//        try{
//            seller = sellerService.getSellerFromToken(token);
//        }catch (Exception e) {
//            return ResponseEntity.badRequest().header(
//                    "error",e.getMessage()
//            ).body(null);
//        }
//
//
//
//    }

//    @GetMapping("/total_activities")
//    public ResponseEntity<?> getTotalActivities(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
//
//
//    }






}
