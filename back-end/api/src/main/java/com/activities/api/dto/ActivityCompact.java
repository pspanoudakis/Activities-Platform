package com.activities.api.dto;

import java.time.LocalDate;

import com.activities.api.entities.Activity;
import com.activities.api.services.ActivityService;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActivityCompact {
    
    private int activity_id;
    private String name;
    private int rating;
    private String address;
    private int price;
    private LocalDate date;
    @JsonIgnore
    private Coordinates coordinates;

    public ActivityCompact(Activity activity, ActivityService activityService, LocalDate start_date){
        this.activity_id = activity.getId();
        this.name = activity.getName();
        this.price = activity.getPrice();
        this.address = activity.getFacility().getAddress();
        this.coordinates = new Coordinates(activity.getFacility().getLongitude(), activity.getFacility().getLatitude());
        this.rating = activityService.getActivityRating(activity);
        this.date = activityService.getEarliestDate(activity, start_date);
    }

}
