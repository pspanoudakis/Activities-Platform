package com.activities.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityCreation {
    int id;
    String name;
    int category_id;
    int age_category_id;
    int price;
    int facility_id;
    String description;
    List<String> images;
    List<SimpleDay> days;
    boolean is_recursive;
}
