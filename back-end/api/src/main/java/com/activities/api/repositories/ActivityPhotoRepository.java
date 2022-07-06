package com.activities.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Activity;
import com.activities.api.entities.ActivityPhoto;

@Repository
public interface ActivityPhotoRepository extends JpaRepository<ActivityPhoto, Integer>{
    List<ActivityPhoto> findByActivity(Activity activity);
    void deleteActivityPhotoByActivity(Activity activity);
}
