package com.activities.api.dto;

import java.time.LocalDate;

import com.activities.api.entities.Activity;
import com.activities.api.entities.ActivityAtDay;
import com.activities.api.entities.Reservation;
import com.activities.api.services.ActivityService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class ReservationDTO implements Comparable<ReservationDTO>{
    private String name;
    private LocalDate reservationDate;
    private LocalDate activityDate;
    private String activityTime;
    private String sellerName;
    private int rating;
    private int cost;
    private int number;

    public ReservationDTO(Reservation reservation, ActivityService activityService){
        ActivityAtDay aad = reservation.getActivityAtDay();
        Activity activity = aad.getActivity();

        this.name = activity.getName();
        this.reservationDate = reservation.getDate();
        this.activityDate = aad.getDay();
        this.activityTime = aad.getTime();
        this.number = reservation.getNumber();
        this.sellerName = activity.getFacility().getSeller().getUser().getName();
        this.rating = activityService.getActivityRating(activity);
        this.cost = this.number * activity.getPrice();
    }

    @Override
    public int compareTo(ReservationDTO o) {
        if (this.reservationDate.isAfter(o.getReservationDate()))return 1;
        if(this.reservationDate.isBefore(o.getReservationDate()))return -1;
        return 0;
    }
}
