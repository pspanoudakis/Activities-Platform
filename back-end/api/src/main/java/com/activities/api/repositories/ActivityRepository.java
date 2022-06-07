package com.activities.api.repositories;

import com.activities.api.entities.Activity;
import com.activities.api.entities.AgeCategory;
import com.activities.api.entities.Facility;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer>{
    public List<Activity> findByPriceLessThanEqualAndPriceGreaterThanEqualAndAgeCategoryInAndFacilityIn(
        int max, int min, List<AgeCategory> ageCategories, List<Facility> facilities);
    public List<Activity> findByFacility(Facility facility);
    public List<Activity> findByFacilityIn(Collection<Facility> facilities);
    
}
