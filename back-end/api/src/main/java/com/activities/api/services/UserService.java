package com.activities.api.services;

import java.util.List;

import com.activities.api.entities.User;
import com.activities.api.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired private UserRepository userRepo;

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    public User getUserByUN(String username){
        return userRepo.findByUsername(username);
    }

    public User createOrUpdateUser(User user){
        return userRepo.save(user);
    }

    public User getUserByUsername(String username){
        return userRepo.findById(username).orElse(null);
    }

    public int countSellers(){
        return userRepo.countByAuthorities_Authority("ROLE_SELLER");
    }

    public int countParents(){
        return userRepo.countByAuthorities_Authority("ROLE_PARENT");
    }

    public User deleteUser(String username){
        User user = null;
        try {
            user = userRepo.findById(username).orElse(null);
            if(user == null)throw new Exception("User does not exist");
            userRepo.delete(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return user;
    }
}
