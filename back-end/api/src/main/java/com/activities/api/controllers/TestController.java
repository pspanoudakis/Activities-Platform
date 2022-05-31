package com.activities.api.controllers;

import java.util.List;

import com.activities.api.entities.AgeCategory;
import com.activities.api.services.AgeCategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    
    @Autowired private AgeCategoryService ageCategoryService;

    @GetMapping("/agecats")
    public ResponseEntity<List<AgeCategory>> getAllAgeCategories(){
        return ResponseEntity.ok().body(ageCategoryService.getAgeCategories());
    }
}
