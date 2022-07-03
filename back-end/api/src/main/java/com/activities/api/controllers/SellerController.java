package com.activities.api.controllers;



import com.activities.api.dto.AuthCredentialsRequest;
import com.activities.api.dto.UserCreationRequest;
import com.activities.api.entities.Authority;
import com.activities.api.entities.Parent;
import com.activities.api.entities.Seller;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;

import com.activities.api.entities.User;
import com.activities.api.services.AuthorityService;
import com.activities.api.services.SellerService;
import com.activities.api.services.UserService;
import com.activities.api.utils.CustomPasswordEncoder;
import com.activities.api.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

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



}
