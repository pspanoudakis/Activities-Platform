package com.activities.api.services;

import java.time.LocalDate;
import java.util.List;

import com.activities.api.entities.Activity;
import com.activities.api.entities.Evaluation;
import com.activities.api.repositories.ActivityAtDayRepository;
import com.activities.api.repositories.ActivityRepository;
import com.activities.api.repositories.EvaluationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    @Autowired private ActivityRepository activityRepository;
    @Autowired private EvaluationRepository evaluationRepository;
    @Autowired private ActivityAtDayRepository activityAtDayRepository;

    public List<Activity> getActivities(){
        return activityRepository.findAll();
    }

    public int getActivityRating(Activity activity){
        List<Evaluation> evaluations = evaluationRepository.findByActivity(activity);
        return calculateRating(evaluations);
    }

    public LocalDate getEarliestDate(Activity activity){
        return activityAtDayRepository.findByActivityOrderByDayAsc(activity).get(0).getDay();
    }

    private int calculateRating(List<Evaluation> evaluations){
        int size = evaluations.size();
        int total = 0;
        for(int i = 0; i < size; i++) total += evaluations.get(i).getRating();
        return (int) ((double) total/size + 0.5);
    }
}

