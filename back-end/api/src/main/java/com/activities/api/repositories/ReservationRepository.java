package com.activities.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer>{
    
}
