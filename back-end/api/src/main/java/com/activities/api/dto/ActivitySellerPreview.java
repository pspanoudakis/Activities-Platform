package com.activities.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data @NoArgsConstructor
public class ActivitySellerPreview {

    String activity_name;
    String facility_name;
    Boolean is_approved;
    int total_reservations;
    LocalDate next_occurrence;
    List<String> image_urls;
}
