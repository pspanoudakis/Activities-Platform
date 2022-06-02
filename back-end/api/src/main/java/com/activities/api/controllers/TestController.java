package com.activities.api.controllers;

import java.util.List;

import com.activities.api.entities.Activity;
import com.activities.api.entities.AgeCategory;
import com.activities.api.entities.BanckAccount;
import com.activities.api.entities.Category;
import com.activities.api.entities.Facility;
import com.activities.api.entities.Parent;
import com.activities.api.entities.Seller;
import com.activities.api.services.ActivityService;
import com.activities.api.services.AgeCategoryService;
import com.activities.api.services.BankAccountService;
import com.activities.api.services.CategoryService;
import com.activities.api.services.FacilityService;
import com.activities.api.services.ParentService;
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
    @Autowired private FacilityService facilityService;
    @Autowired private ActivityService activityService;
    @Autowired private ParentService parentService;
    @Autowired private BankAccountService bankAccountService;

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

    @GetMapping("/facilities")
    public ResponseEntity<List<Facility>> getFacilities(){
        return ResponseEntity.ok().body(facilityService.getFacilities());
    }

    @GetMapping("/activities")
    public ResponseEntity<List<Activity>> getActivities(){
        return ResponseEntity.ok().body(activityService.getActivities());
    }

    @GetMapping("/parents")
    public ResponseEntity<List<Parent>> getParents(){
        return ResponseEntity.ok().body(parentService.getParents());
    }

    @GetMapping("/bankaccs")
    public ResponseEntity<List<BanckAccount>> getBankAccounts(){
        return ResponseEntity.ok().body(bankAccountService.getBankAccounts());
    }

}
