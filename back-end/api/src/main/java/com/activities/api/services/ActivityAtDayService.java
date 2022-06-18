package com.activities.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activities.api.dto.SellerActivity;
import com.activities.api.entities.ActivityAtDay;
import com.activities.api.repositories.ActivityAtDayRepository;

@Service
public class ActivityAtDayService {
    
    @Autowired private ActivityAtDayRepository activityAtDayRepository;

    public List<ActivityAtDay> getDaysOfActivities(){
        return activityAtDayRepository.findAll();
    }

    public SellerActivity getSellerActivity(int id){
        return activityAtDayRepository.activityToSellerActivity(id);
    }
}
