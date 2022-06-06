package com.activities.api.controllers;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.activities.api.dto.ActivityCompact;
import com.activities.api.dto.ActivityExtended;
import com.activities.api.dto.Coordinates;
import com.activities.api.dto.PagingResponse;
import com.activities.api.dto.ShallowCategory;
import com.activities.api.entities.Activity;
import com.activities.api.entities.AgeCategory;
import com.activities.api.entities.Category;
import com.activities.api.entities.Facility;
import com.activities.api.services.ActivityService;
import com.activities.api.services.AgeCategoryService;
import com.activities.api.services.CategoryService;
import com.activities.api.services.FacilityService;
import com.activities.api.utils.MyUtil;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired private ActivityService activityService;
    @Autowired private AgeCategoryService ageCategoryService;
    @Autowired private FacilityService facilityService;
    @Autowired private CategoryService categoryService;

    @GetMapping("/categories/{parent_id}")
    public ResponseEntity<List<ShallowCategory>> getCategories(@PathVariable int parent_id){
        Category category = (parent_id == 0) ? null : categoryService.getCategory(parent_id);
        return ResponseEntity.ok().body(
            categoryService.getByParent(category).stream()
            .map(
                cat -> new ShallowCategory(cat)
            ).collect(Collectors.toList())
        );
    }
    
    @GetMapping("/activities")
    public ResponseEntity<PagingResponse<List<ActivityCompact>>> getFilteredActivities(
        @RequestParam(required = false, defaultValue = "1") Integer page_number, 
        @RequestParam(required = false, defaultValue = "1") Integer page_size,
        @RequestParam(required = false, defaultValue = "0") Integer min_price,
        @RequestParam(required = false, defaultValue = "10000000") Integer max_price,
        @RequestParam(required = false, defaultValue = "0") Integer age_category,
        @RequestParam(required = false, defaultValue = "2000-01-01")
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start_date,
        @RequestParam(required = false, defaultValue = "3000-01-01")
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end_date,
        @RequestParam(required = false, defaultValue = "getAnyDistrict") String district,
        @RequestParam(required = false, defaultValue = "0") Integer rating,
        @RequestParam(required = false, defaultValue = "0") Integer max_distance,
        @RequestBody Optional<Coordinates> coords
        ){

        List<AgeCategory> ageCategories = (
            (age_category == 0)
            ? ageCategoryService.getAgeCategories()
            : Arrays.asList(ageCategoryService.getAgeCategory(age_category))
        );

        List<Facility> facilities = (
            (district.equals("getAnyDistrict"))
            ? facilityService.getFacilities()
            : facilityService.getFacilitiesByDistrict(district)
        );

        //get activities in price range and wanted category and in wanted district
        List<Activity> activities = activityService.findInPriceRangeAndOfCategoryAndInFacilities(
            max_price, min_price, 
            ageCategories,
            facilities
            ); 
        
        //Map activities to compactActivities
        List<ActivityCompact> compactActivities = activities
                                                    .stream().map( a -> {
                                                        ActivityCompact ac = new ActivityCompact(a, activityService, start_date);
                                                        return ac;
                                                    }).collect(Collectors.toList());
        
        //remove if outside of date range or of smaller rating
        compactActivities.removeIf(
            ca -> ca.getRating() < rating 
            || ca.getNextAvailableDate().isAfter(end_date)
            || (max_distance != 0 && coords != null && ca.getCoordinates().distance(coords.orElse(null)) >= max_distance)
        );

        //Send wanted page of data, and total number of same size pages
        int total_pages = (int) Math.ceil((double) compactActivities.size() / (double) page_size);
        PagingResponse<List<ActivityCompact>> res = new PagingResponse<List<ActivityCompact>>(
            MyUtil.getPage(compactActivities, page_number, page_size), total_pages
            );

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("activity/{activity_id}")
    public ResponseEntity<ActivityExtended> getActivityPage(@PathVariable int activity_id) throws Exception{
        
        Activity activity = activityService.getActivity(activity_id);
        if(activity == null)throw new Exception("Activity with id " + activity_id + " not found");
        return ResponseEntity.ok().body(
            new ActivityExtended(activity, activityService)
        );
    }
}
