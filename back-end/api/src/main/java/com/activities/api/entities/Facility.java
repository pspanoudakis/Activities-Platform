package com.activities.api.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Table(name = "facilities")
@Data @AllArgsConstructor @NoArgsConstructor
public class Facility {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "seller_id")
    private Seller seller;

    private String name;
    private String address;
    private String district;
    private Double longitude;
    private Double latitude;
    private Boolean approved;

}
