package com.activities.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activities.api.entities.Authority;
import com.activities.api.repositories.AuthorityRepository;

@Service
public class AuthorityService {
    @Autowired private AuthorityRepository authorityRepository;

    public List<Authority> getAuthorities(){
        return authorityRepository.findAll();
    }

    public Authority getAuthority(String authority){
        return authorityRepository.findByAuthority(authority).orElse(null);
    }
}
