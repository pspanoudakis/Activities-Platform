package com.activities.api.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.activities.api.dto.ActivityCompact;
import com.activities.api.dto.PagingResponse;
import com.activities.api.entities.Activity;
import com.activities.api.services.ActivityService;
import com.activities.api.utils.MyUtil;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired private ActivityService activityService;
    
    @GetMapping("/activities")
    public ResponseEntity<PagingResponse<List<ActivityCompact>>> getFilteredActivities(
        @RequestParam(required = false, defaultValue = "1") Integer page_number, 
        @RequestParam(required = false, defaultValue = "1") Integer page_size){

        List<Activity> activities = activityService.getActivities();
        List<ActivityCompact> compactActivities = activities
                                                    .stream().map( a -> {
                                                        ActivityCompact ac = new ActivityCompact(a, activityService);
                                                        return ac;
                                                    }).collect(Collectors.toList());
        int total_pages = (int) Math.ceil((double) compactActivities.size() / (double) page_size);
        PagingResponse<List<ActivityCompact>> res = new PagingResponse<List<ActivityCompact>>(MyUtil.getPage(compactActivities, page_number, page_size), total_pages);

        return ResponseEntity.ok().body(res);
    }
}
