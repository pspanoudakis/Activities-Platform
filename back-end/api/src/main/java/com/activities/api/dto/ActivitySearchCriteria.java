package com.activities.api.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ActivitySearchCriteria {
    private String name;
    private String description;
    private int min_price;
    private int max_price;
    Integer age_category;
    LocalDate start_date;
    LocalDate end_date;
    String district;
    Integer rating;
    Integer max_distance;
    Double latitude;
    Double longitude;
    List<String> categoriesList;
}
