package com.activities.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data @NoArgsConstructor
public class ReservationSellerPreview {
    private String activity_name;
    private LocalDate reservation_date;
    private LocalDate activity_date;
    private int number_of_people_in_reservation;
    private String parent_username;
    private int total_cost;
}
