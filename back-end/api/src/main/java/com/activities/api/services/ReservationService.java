package com.activities.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activities.api.entities.Reservation;
import com.activities.api.repositories.ReservationRepository;

@Service
public class ReservationService {
    
    @Autowired private ReservationRepository reservationRepository;

    public List<Reservation> getReservations(){
        return reservationRepository.findAll();
    }
}
