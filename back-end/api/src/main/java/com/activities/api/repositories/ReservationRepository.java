package com.activities.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Parent;
import com.activities.api.entities.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer>{
    List<Reservation> findByParent(Parent parent);

    @Query("SELECT DISTINCT(act.id) FROM Reservation res INNER JOIN res.activityAtDay aad INNER JOIN aad.activity act INNER JOIN res.parent par WHERE par.id = ?1")
    List<Long> getParentReservedActivityIds(int parent_id);
}
