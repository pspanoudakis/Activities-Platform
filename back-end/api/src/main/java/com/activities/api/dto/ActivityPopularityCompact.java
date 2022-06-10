package com.activities.api.dto;

import java.time.LocalDate;

import com.activities.api.services.ActivityService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ActivityPopularityCompact {
    ActivityCompact activity;
    Long reservations;

    public ActivityPopularityCompact(ActivityPopularity ap, ActivityService activityService){
        this.activity = new ActivityCompact(ap.getActivity(), activityService, LocalDate.now());
        this.reservations = ap.getReservations();
    }
}
