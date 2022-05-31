package com.activities.api.controllers;

import java.util.List;

import com.activities.api.entities.User;
import com.activities.api.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        System.out.println(users.get(0).getAuthorities().toString());
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @GetMapping("/byun/{username}")
    public ResponseEntity<User> getUserByUN(@PathVariable String username){
        return ResponseEntity.ok().body(userService.getUserByUN(username));
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
