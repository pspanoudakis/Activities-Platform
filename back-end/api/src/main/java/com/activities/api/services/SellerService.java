package com.activities.api.services;

import java.util.List;

import com.activities.api.entities.Facility;
import com.activities.api.entities.Parent;
import com.activities.api.entities.Seller;
import com.activities.api.entities.User;
import com.activities.api.repositories.FacilityRepository;
import com.activities.api.repositories.SellerRepository;

import com.activities.api.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

@Service
public class SellerService {
    
    @Autowired private SellerRepository sellerRepository;

    @Autowired private JwtUtil jwtUtil;

    @Autowired private UserService userService;

    public List<Seller> getSellers(){
        return sellerRepository.findAll();
    }

    public Seller getByUser(User user){return sellerRepository.findByUser(user).orElse(null);}

    public Seller saveOrUpdateSeller(Seller seller){
        return sellerRepository.save(seller);
    }

    public Seller getSellerByUN(String username){
        return sellerRepository.findByUser_Username(username).orElse(null);
    }

    public Seller getSellerFromToken(String token) throws BadCredentialsException {
        String username = jwtUtil.getUsernameFromToken(token.split(" ")[1]);
        User user = userService.getUserByUN(username);
        if(user == null)throw new BadCredentialsException("user " + username + " does not exist");

        Seller seller = getByUser(user);
        if(seller == null)throw new BadCredentialsException("user " + username + " is not a parent)");
        return seller;
    }
}
