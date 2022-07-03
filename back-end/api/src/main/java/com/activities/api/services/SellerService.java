package com.activities.api.services;

import java.util.List;

import com.activities.api.entities.Parent;
import com.activities.api.entities.Seller;
import com.activities.api.entities.User;
import com.activities.api.repositories.SellerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellerService {
    
    @Autowired private SellerRepository sellerRepository;

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
}
