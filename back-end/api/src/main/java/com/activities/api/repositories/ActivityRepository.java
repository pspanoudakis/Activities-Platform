package com.activities.api.repositories;

import com.activities.api.entities.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer>{
    
    public List<Activity> findByPriceLessThanEqualAndPriceGreaterThanEqualAndAgeCategoryInAndFacilityInAndCategoryInAndApprovedTrue(
        int max, int min, List<AgeCategory> ageCategories, List<Facility> facilities, List<Category> categories);
    public List<Activity> findByFacilityAndApprovedTrue(Facility facility);
    public List<Activity> findByFacilityIn(Collection<Facility> facilities);
    public List<Activity> findByFacilityInAndApprovedTrue(Collection<Facility> facilities);

    public List<Activity> findByApprovedTrue();
    public Optional<Activity> findByIdAndApprovedTrue(int id);
    public Optional<Activity> findByIdAndApprovedFalse(int id);
    public Page<Activity> findAllByApprovedFalse(Pageable page);
    public Page<Activity> findAllByApprovedTrue(Pageable page);
    
    @Query("SELECT act FROM Reservation res INNER JOIN res.activityAtDay aad INNER JOIN aad.activity act WHERE act.approved = true GROUP BY act.id ORDER BY SUM(res.number) DESC")
    public List<Activity> getActivitiesSortedByReservations();

    @Query("SELECT act FROM Reservation res INNER JOIN res.activityAtDay aad INNER JOIN aad.activity act INNER JOIN res.parent par WHERE act.approved = true AND par.id = ?2 AND ?1 > aad.day  ORDER BY res.date ASC")
    public List<Activity> getRecentlyBookedActivities(LocalDate today, int pid);
    
}
