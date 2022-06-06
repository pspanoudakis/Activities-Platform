package com.activities.api.controllers;

import java.util.List;

import com.activities.api.dto.AuthCredentialsRequest;
import com.activities.api.entities.User;
import com.activities.api.services.UserService;
import com.activities.api.utils.JwtUtil;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired UserService userService;
    @Autowired AuthenticationManager authenticationManager;
    @Autowired JwtUtil jwtUtil;

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        System.out.println(users.get(0).getAuthorities().toString());
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
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
            user.setPassword(null);
            return ResponseEntity.ok()
                .header(
                    HttpHeaders.AUTHORIZATION,
                    jwtUtil.generateToken(user)
                )
                .body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("")
    public ResponseEntity<User> createOrUpdateUser(@RequestBody User user){
        return new ResponseEntity<User>(userService.createOrUpdateUser(user), HttpStatus.OK);
    }
    
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username){
        return new ResponseEntity<User>(userService.getUserByUsername(username), HttpStatus.OK);
    }
    
    @DeleteMapping("/{username}")
    public ResponseEntity<User> deleteUser(@PathVariable String username){
        return new ResponseEntity<User>(userService.deleteUser(username), HttpStatus.OK);
    }
}
