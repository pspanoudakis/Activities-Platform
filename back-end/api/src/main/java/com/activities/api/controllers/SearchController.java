package com.activities.api.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
import com.activities.api.dto.ActivityPopularityCompact;
import com.activities.api.dto.CatCoordRequest;
import com.activities.api.dto.CategoryWithChildren;
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

    @GetMapping("/districts")
    public ResponseEntity<List<String>> getDistricts(){
        return ResponseEntity.ok().body(facilityService.getDistricts());
    }

    @GetMapping("/age_categories")
    public ResponseEntity<List<AgeCategory>> getAgeCategories(){
        return ResponseEntity.ok().body(
            ageCategoryService.getAgeCategories()
        );
    }

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

    @GetMapping("/activities/popular")
    public ResponseEntity<List<ActivityPopularityCompact>> getPopularActivities(){
        return ResponseEntity.ok().body(activityService.getActivitiesSortedByReservations().stream().map(
            ac -> new ActivityPopularityCompact(ac, activityService)
        ).limit(5).collect(Collectors.toList()));
    }
    
    @GetMapping("/all_categories")
    public ResponseEntity<List<CategoryWithChildren>> getCategoriesWithChildren(@RequestParam(required = false, defaultValue = "false") Boolean recursion){

        return ResponseEntity.ok().body(
            categoryService.getByParent(null)
            .stream()
            .map(
                cat -> new CategoryWithChildren(cat, categoryService, recursion)
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
        @RequestParam(required = false, defaultValue = "") Double latitude,
        @RequestParam(required = false, defaultValue = "") Double longitude,
        @RequestParam(required = false, defaultValue = "") List<String> categoriesList,
        @RequestBody Optional<CatCoordRequest> request
        ){
            
        CatCoordRequest req = new CatCoordRequest();
        if(latitude != null && longitude != null)
            req.setCoordinates(new Coordinates(longitude, latitude));
        if(categoriesList.size() != 0)
            req.setCategories(categoriesList);

        List<String> category_names = (req == null || (req != null && req.getCategories() == null))
        ?   null
        :   req.getCategories();
        List<Category> categories;
        
        if(category_names == null)categories = categoryService.getCategories();
        else{
            int size = category_names.size();
            ArrayList<Category> cats = new ArrayList<Category>();

            for(int i = 0; i < size; i++){
                String category_name = category_names.get(i);
                List<Category> toAdd = categoryService.getCategoriesRecursively(category_name);
                if(toAdd == null)return ResponseEntity.badRequest().header("error", "no category " + category_name).body(null);

                cats.addAll(toAdd);
            }
            categories = new ArrayList<Category>(Set.copyOf(cats));
        }

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
        List<Activity> activities = activityService.filterPriceAgeCategoryFacilityCategory(
            max_price, min_price, 
            ageCategories,
            facilities,
            categories
            ); 
        
        //Map activities to compactActivities
        List<ActivityCompact> compactActivities = activities
                                                    .stream().map( a -> {
                                                        ActivityCompact ac = new ActivityCompact(a, activityService, start_date);
                                                        return ac;
                                                    }).collect(Collectors.toList());
        
        Coordinates coords = (req == null || (req != null && req.getCoordinates() == null))
        ?   null
        :   req.getCoordinates();
        //remove if outside of date range or of smaller rating
        compactActivities.removeIf(
            ca -> ca.getRating() < rating 
            || ca.getDate().isAfter(end_date)
            || (max_distance != 0 && coords != null && ca.getCoordinates().distance(coords) >= max_distance)
        );

        //Send wanted page of data, and total number of same size pages
        int total_pages = (int) Math.ceil((double) compactActivities.size() / (double) page_size);
        PagingResponse<List<ActivityCompact>> res = new PagingResponse<List<ActivityCompact>>(
            MyUtil.getPage(compactActivities, page_number, page_size), total_pages, page_number
            );

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("activity/{activity_id}/same_place")
    public ResponseEntity<List<ActivityCompact>> getActivitiesSamePlace(@PathVariable int activity_id){
        Activity activity = activityService.getActivity(activity_id);
        if(activity == null){
            return ResponseEntity.badRequest().body(null);
        }
        List<ActivityCompact> compacts = activityService.getActivitiesByFacility(activity.getFacility()).stream()
            .map(ac -> new ActivityCompact(ac, activityService, LocalDate.now())).collect(Collectors.toList());
        compacts.removeIf(ac -> ac.getActivity_id() == activity_id || ac.getDate().equals(LocalDate.parse("3000-01-02")));
        
        return ResponseEntity.ok().body(compacts);
    }

    @GetMapping("activity/{activity_id}/same_seller")
    public ResponseEntity<List<ActivityCompact>> getActivitiesSameSeller(@PathVariable int activity_id){
        Activity activity = activityService.getActivity(activity_id);
        if(activity == null){
            return ResponseEntity.badRequest().body(null);
        }
        List<ActivityCompact> compacts = activityService.getActivitiesBySeller(activity).stream()
            .map(ac -> new ActivityCompact(ac, activityService, LocalDate.now())).collect(Collectors.toList());
        compacts.removeIf(ac -> ac.getActivity_id() == activity_id || ac.getDate().equals(LocalDate.parse("3000-01-02")));
        
        return ResponseEntity.ok().body(compacts);
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
