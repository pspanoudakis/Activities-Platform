package com.activities.api.controllers;

import java.util.List;

import com.activities.api.entities.AgeCategory;
import com.activities.api.entities.Category;
import com.activities.api.entities.Seller;
import com.activities.api.services.AgeCategoryService;
import com.activities.api.services.CategoryService;
import com.activities.api.services.SellerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    
    @Autowired private AgeCategoryService ageCategoryService;
    @Autowired private CategoryService categoryService;
    @Autowired private SellerService sellerService;

    @GetMapping("/agecats")
    public ResponseEntity<List<AgeCategory>> getAgeCategories(){
        return ResponseEntity.ok().body(ageCategoryService.getAgeCategories());
    }

    @GetMapping("/cats")
    public ResponseEntity<List<Category>> getCategories(){
        return ResponseEntity.ok().body(categoryService.getCategories());
    }

    @GetMapping("/sellers")
    public ResponseEntity<List<Seller>> getSellers(){
        return ResponseEntity.ok().body(sellerService.getSellers());
    }
}
