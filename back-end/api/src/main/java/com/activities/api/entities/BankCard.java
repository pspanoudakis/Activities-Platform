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

@Entity @Table(name = "bank_cards")
@Data @AllArgsConstructor @NoArgsConstructor
public class BankCard {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String cardNumber;
    private String expirationDate;
    private String ccv;
    private String ownerName;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;
}
