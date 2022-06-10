package com.activities.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activities.api.entities.ActivityPhoto;
import com.activities.api.repositories.ActivityPhotoRepository;

@Service
public class ActivityPhotoService {
    
    @Autowired private ActivityPhotoRepository activityPhotoRepository;

    public List<ActivityPhoto> getActivityPhotos(){
        return activityPhotoRepository.findAll();
    }
}
