package com.activities.api.dto;

import com.activities.api.entities.Activity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  @NoArgsConstructor @AllArgsConstructor
public class ActivityPopularity {
    
    Activity activity;
    Long reservations;

}
