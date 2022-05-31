package com.activities.api.services;

import com.activities.api.entities.User;
import com.activities.api.repositories.UserRepository;
import com.activities.api.utils.CustomPasswordEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired private CustomPasswordEncoder passwordEncoder;
    @Autowired private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        // String pass = user.getPassword();
        // user.setPassword(passwordEncoder.getPasswordEncoder().encode(pass));
        return user;
    }
    
}
