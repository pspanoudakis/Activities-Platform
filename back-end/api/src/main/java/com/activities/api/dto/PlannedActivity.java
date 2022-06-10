package com.activities.api.dto;

import java.time.LocalDate;

import com.activities.api.entities.Activity;
import com.activities.api.entities.ActivityAtDay;
import com.activities.api.entities.Facility;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class PlannedActivity implements Comparable<PlannedActivity>{
    private int id;
    private String name;
    private String ageCategory;
    private String category;
    private String facility;
    private String address;
    private String description;
    private LocalDate day;
    private String time;

    public PlannedActivity(ActivityAtDay aad){
        Activity activity = aad.getActivity();
        Facility facility = activity.getFacility();
        
        this.id = activity.getId();
        this.name = activity.getName();
        this.ageCategory = activity.getAgeCategory().getName();
        this.category = activity.getCategory().getName();
        this.facility = facility.getName();
        this.address = facility.getAddress();
        this.description = activity.getDescription();
        this.day = aad.getDay();
        this.time = aad.getTime();

    }

    @Override
    public int compareTo(PlannedActivity o) {
        if (this.day.isAfter(o.getDay()))return 1;
        if(this.day.isBefore(o.getDay()))return -1;
        return 0;
    }

}
