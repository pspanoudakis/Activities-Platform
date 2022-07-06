package com.activities.api.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.activities.api.entities.Activity;
import com.activities.api.services.ActivityService;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ActivityExtended {
    
    String name;
    List<String> images;
    List<SimpleDay> days;
    int cost;
    String seller_name;
    String address;
    double longitude;
    double latitude;
    String description;
    private Boolean periodic;
    Double rating;

    public ActivityExtended(Activity activity, ActivityService activityService){
        this.name = activity.getName();
        this.cost = activity.getPrice();
        this.periodic = activity.getPeriodic();
        this.seller_name = activity.getFacility().getSeller().getUser().getUsername();
        this.address = activity.getFacility().getAddress();
        this.longitude = activity.getFacility().getLongitude();
        this.latitude = activity.getFacility().getLatitude();
        this.description = activity.getDescription();
        this.rating = activityService.getActivityRating(activity);
        this.days = activityService.getDaysOfActivity(activity);
        this.images = activityService.getActivityImages(activity);
    }
}
