package com.activities.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.BankCard;

@Repository
public interface BankCardRepository extends JpaRepository<BankCard, Integer>{
    
}
