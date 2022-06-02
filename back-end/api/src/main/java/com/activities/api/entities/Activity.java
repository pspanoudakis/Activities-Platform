package com.activities.api.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Table(name = "activities")
@Data @AllArgsConstructor @NoArgsConstructor
public class Activity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "age_category_id")
    private AgeCategory ageCategory;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private int capacity;
    
    @ManyToOne
    @JoinColumn(name = "facility_id")
    private Facility facility;

    private String description;
    private int price;
    private Boolean approved;
}
