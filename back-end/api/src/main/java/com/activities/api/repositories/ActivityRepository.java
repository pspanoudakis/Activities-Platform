package com.activities.api.repositories;

import com.activities.api.dto.ActivityPopularity;
import com.activities.api.entities.Activity;
import com.activities.api.entities.AgeCategory;
import com.activities.api.entities.Category;
import com.activities.api.entities.Facility;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer>{
    
    public List<Activity> findByPriceLessThanEqualAndPriceGreaterThanEqualAndAgeCategoryInAndFacilityInAndCategoryIn(
        int max, int min, List<AgeCategory> ageCategories, List<Facility> facilities, List<Category> categories);
    public List<Activity> findByFacility(Facility facility);
    public List<Activity> findByFacilityIn(Collection<Facility> facilities);
    
    @Query("SELECT new com.activities.api.dto.ActivityPopularity(act, SUM(res.number)) FROM Reservation res INNER JOIN res.activityAtDay aad INNER JOIN aad.activity act GROUP BY act.id ORDER BY SUM(res.number) DESC")
    public List<ActivityPopularity> getActivitiesSortedByReservations();

    @Query("SELECT act FROM Reservation res INNER JOIN res.activityAtDay aad INNER JOIN aad.activity act INNER JOIN res.parent par WHERE par.id = ?2 AND ?1 > aad.day  ORDER BY res.date ASC")
    public List<Activity> getRecentlyBookedActivities(LocalDate today, int pid);
    
}
