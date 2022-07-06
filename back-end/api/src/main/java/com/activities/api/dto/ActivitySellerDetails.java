package com.activities.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivitySellerDetails {

    private String name;
    private String category_name;
    private String age_category_name;
    private String facility_name;
    private int    total_reservations;
    private double average_rating;
    private String description;
    private boolean is_recursive;
    private int total_earnings;
    private List<SimpleDay> occurrences;
    private List<String>    images;

}
