package com.activities.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Activity;
import com.activities.api.entities.ActivityAtDay;

@Repository
public interface ActivityAtDayRepository extends JpaRepository<ActivityAtDay, Integer>{

    public List<ActivityAtDay> findByActivityOrderByDayAsc(Activity activity);
    
}
