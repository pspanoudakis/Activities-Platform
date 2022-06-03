package com.activities.api.services;

import java.util.List;

import com.activities.api.entities.AgeCategory;
import com.activities.api.repositories.AgeCategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgeCategoryService {
    
    @Autowired private AgeCategoryRepository ageCategoryRepository;

    public List<AgeCategory> getAgeCategories(){
        return ageCategoryRepository.findAll();
    }

    public AgeCategory getAgeCategory(int id){
        return ageCategoryRepository.findById(id).orElse(null);
    }
}
