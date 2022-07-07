package com.activities.api.repositories;

import java.util.List;

import com.activities.api.entities.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Parent;
import com.activities.api.entities.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer>{
    List<Reservation> findByParent(Parent parent);

    @Query("SELECT res from Reservation res inner JOIN res.activityAtDay aad INNER JOIN aad.activity act INNER JOIN act.facility fac INNER JOIN fac.seller sel WHERE sel.id = ?1 and aad.day >= CURRENT_DATE ORDER BY res.date DESC ")
    List<Reservation> findBySeller(int seller_id);

    @Query("SELECT DISTINCT(act.id) FROM Reservation res INNER JOIN res.activityAtDay aad INNER JOIN aad.activity act INNER JOIN res.parent par WHERE par.id = ?1")
    List<Long> getParentReservedActivityIds(int parent_id);

    @Query("SELECT COALESCE(SUM(res.number),0) FROM Reservation res INNER JOIN res.activityAtDay aad INNER JOIN aad.activity act WHERE act.id = ?1")
    int getTotalReservationsByActivity(int activity_id);
}
