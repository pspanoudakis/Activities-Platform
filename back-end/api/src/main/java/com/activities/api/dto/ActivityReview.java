package com.activities.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data @NoArgsConstructor
public class ActivityReview {
    private double rating;
    private String username;
    private String review_text;
}
