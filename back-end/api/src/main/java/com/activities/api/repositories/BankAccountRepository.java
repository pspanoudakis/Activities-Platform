package com.activities.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.BanckAccount;

@Repository
public interface BankAccountRepository extends JpaRepository<BanckAccount, Integer>{
    
}
