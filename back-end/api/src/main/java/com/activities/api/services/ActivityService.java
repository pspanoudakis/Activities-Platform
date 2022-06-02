package com.activities.api.services;

import java.util.List;

import com.activities.api.entities.Activity;
import com.activities.api.repositories.ActivityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    @Autowired private ActivityRepository activityRepository;

    public List<Activity> getActivities(){
        return activityRepository.findAll();
    }
}

