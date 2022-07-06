package com.activities.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activities.api.entities.Parent;
import com.activities.api.entities.Reservation;
import com.activities.api.repositories.ReservationRepository;

@Service
public class ReservationService {
    
    @Autowired private ReservationRepository reservationRepository;

    public List<Reservation> getReservationsByParent(Parent parent){
        return reservationRepository.findByParent(parent);
    }

    public List<Long> getParentReservedActivityIds(int parent_id){
        return reservationRepository.getParentReservedActivityIds(parent_id);
    }

    public List<Reservation> getReservations(){
        return reservationRepository.findAll();
    }

}
