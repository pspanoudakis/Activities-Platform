package com.activities.api.dto;

import java.time.LocalDate;

import com.activities.api.entities.ActivityAtDay;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SimpleDay {
    
    private int id;
    private String time;
    private LocalDate day;
    private int activity_id;

    public SimpleDay(ActivityAtDay activityAtDay){
        this.id = activityAtDay.getId();
        this.time = activityAtDay.getTime();
        this.day = activityAtDay.getDay();
        this.activity_id = activityAtDay.getActivity().getId();
    }
}
