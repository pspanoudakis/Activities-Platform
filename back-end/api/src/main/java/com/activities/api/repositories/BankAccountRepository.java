package com.activities.api.repositories;

import com.activities.api.entities.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.BankAccount;

import java.util.List;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Integer>{

    List<BankAccount> findBySeller(Seller seller);

    void deleteById(int id);
}
