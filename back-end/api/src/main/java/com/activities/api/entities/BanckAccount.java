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

@Entity @Table(name = "bank_accounts")
@Data @AllArgsConstructor @NoArgsConstructor
public class BanckAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String iban;
    private String accountNumber;
    private String ownerName;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;
    
}
