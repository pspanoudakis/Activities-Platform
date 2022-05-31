package com.activities.api.repositories;

import com.activities.api.entities.AgeCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgeCategoryRepository extends JpaRepository<AgeCategory, Integer>{
    
}
