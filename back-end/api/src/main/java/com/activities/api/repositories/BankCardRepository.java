package com.activities.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.BankCard;
import com.activities.api.entities.Parent;

@Repository
public interface BankCardRepository extends JpaRepository<BankCard, Integer>{
    public List<BankCard> findByParent(Parent parent);

}
