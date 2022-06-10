package com.activities.api.entities;

import java.time.LocalDate;

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

@Entity @Table(name = "reservations")
@Data @NoArgsConstructor @AllArgsConstructor
public class Reservation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "activity_at_day_id")
    private ActivityAtDay activityAtDay;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;

    int number;
}
