package com.activities.api.controllers;

import java.util.List;

import com.activities.api.entities.Activity;
import com.activities.api.entities.ActivityAtDay;
import com.activities.api.entities.ActivityPhoto;
import com.activities.api.entities.AgeCategory;
import com.activities.api.entities.Authority;
import com.activities.api.entities.BanckAccount;
import com.activities.api.entities.BankCard;
import com.activities.api.entities.Category;
import com.activities.api.entities.Evaluation;
import com.activities.api.entities.Facility;
import com.activities.api.entities.Parent;
import com.activities.api.entities.Reservation;
import com.activities.api.entities.Seller;
import com.activities.api.services.ActivityAtDayService;
import com.activities.api.services.ActivityPhotoService;
import com.activities.api.services.ActivityService;
import com.activities.api.services.AgeCategoryService;
import com.activities.api.services.AuthorityService;
import com.activities.api.services.BankAccountService;
import com.activities.api.services.BankCardService;
import com.activities.api.services.CategoryService;
import com.activities.api.services.EvaluationService;
import com.activities.api.services.FacilityService;
import com.activities.api.services.ParentService;
import com.activities.api.services.ReservationService;
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
    @Autowired private BankCardService bankCardService;
    @Autowired private ActivityAtDayService activityAtDayService;
    @Autowired private ActivityPhotoService activityPhotoService;
    @Autowired private EvaluationService evaluationService;
    @Autowired private AuthorityService authorityService;
    @Autowired private ReservationService reservationService;

    @GetMapping("/auths")
    public ResponseEntity<List<Authority>> getAuthorities(){
        return ResponseEntity.ok().body(authorityService.getAuthorities());
    }

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

    @GetMapping("/bankcards")
    public ResponseEntity<List<BankCard>> getBankCards(){
        return ResponseEntity.ok().body(bankCardService.getBankCards());
    }

    @GetMapping("/daysofacts")
    public ResponseEntity<List<ActivityAtDay>> getDaysOfActivities(){
        return ResponseEntity.ok().body(activityAtDayService.getDaysOfActivities());
    }

    @GetMapping("/accphotos")
    public ResponseEntity<List<ActivityPhoto>> getActivityPhotos(){
        return ResponseEntity.ok().body(activityPhotoService.getActivityPhotos());
    }

    @GetMapping("/evaluations")
    public ResponseEntity<List<Evaluation>> getEvaluations(){
        return ResponseEntity.ok().body(evaluationService.getEvaluations());
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<Reservation>> getReservations(){
        return ResponseEntity.ok().body(reservationService.getReservations());
    }
}
