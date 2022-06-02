package com.activities.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.ActivityAtDay;

@Repository
public interface ActivityAtDayRepository extends JpaRepository<ActivityAtDay, Integer>{
    
}
