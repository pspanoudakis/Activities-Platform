package com.activities.api.dto;

import java.time.LocalDate;

import com.activities.api.entities.Activity;
import com.activities.api.services.ActivityService;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActivityCompact {
    
    private String name;
    private int rating;
    private String address;
    private int price;
    private LocalDate nextAvailableDate;

    public ActivityCompact(Activity activity, ActivityService activityService){
        this.name = activity.getName();
        this.price = activity.getPrice();
        this.address = activity.getFacility().getAddress();
        this.rating = activityService.getActivityRating(activity);
        this.nextAvailableDate = activityService.getEarliestDate(activity);
    }

}
