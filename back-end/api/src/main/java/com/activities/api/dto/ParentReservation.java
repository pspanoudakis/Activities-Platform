package com.activities.api.dto;

import java.time.LocalDate;

import com.activities.api.entities.Activity;
import com.activities.api.entities.ActivityAtDay;
import com.activities.api.entities.Reservation;
import com.activities.api.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ParentReservation {
    String name;
    String seller_name;
    LocalDate reservation_date;
    String reservation_time;
    int amount;

    public ParentReservation(Reservation reservation){
        ActivityAtDay aad = reservation.getActivityAtDay();
        Activity activity = aad.getActivity();
        User user = activity.getFacility().getSeller().getUser();

        this.name = activity.getName();
        this.seller_name = user.getName();
        this.reservation_date = aad.getDay();
        this.reservation_time = aad.getTime();
        this.amount = reservation.getNumber() * activity.getPrice();
    }
}
