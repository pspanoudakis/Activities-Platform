package com.activities.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.activities.api.dto.UserCreationRequest;
import com.activities.api.entities.Authority;
import com.activities.api.entities.Parent;
import com.activities.api.entities.User;
import com.activities.api.services.AuthorityService;
import com.activities.api.services.ParentService;
import com.activities.api.services.UserService;
import com.activities.api.utils.CustomPasswordEncoder;

@RestController
@RequestMapping("parent")
public class ParentController {
    
    @Autowired private AuthorityService authorityService;
    @Autowired private CustomPasswordEncoder encoder;
    @Autowired private ParentService parentService;
    @Autowired private UserService userService;

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
