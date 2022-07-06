package com.activities.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @NoArgsConstructor
public class ActivityUpdate {
    private String name;
    private String description;
    private int category_id;
    private int age_category_id;
    private int facility_id;
    private List<String>  images;
}
