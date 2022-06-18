package com.activities.api.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.activities.api.dto.SellerActivity;
import com.activities.api.entities.Activity;
import com.activities.api.entities.ActivityAtDay;

@Repository
public interface ActivityAtDayRepository extends JpaRepository<ActivityAtDay, Integer>{

    public List<ActivityAtDay> findByActivityAndDayAfterOrderByDayAsc(Activity activity, LocalDate strart_date);
    public List<ActivityAtDay> findByActivity(Activity activity);

    @Query("SELECT new com.activities.api.dto.SellerActivity(act, MIN(aad.day), MAX(aad.day) ) FROM ActivityAtDay aad INNER JOIN aad.activity act WHERE act.id = ?1 GROUP BY act.id")
    public SellerActivity activityToSellerActivity(int id);
}
