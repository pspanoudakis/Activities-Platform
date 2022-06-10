package com.activities.api.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activities.api.entities.BankCard;
import com.activities.api.entities.Parent;
import com.activities.api.repositories.BankCardRepository;

@Service
public class BankCardService {
    @Autowired private BankCardRepository bankCardRepository;

    public List<BankCard> getBankCards(){
        return bankCardRepository.findAll();
    }

    public BankCard getCard(int id){
        return bankCardRepository.findById(id).orElse(null);
    }

    public void deleteCard(BankCard card){
        bankCardRepository.delete(card);
    }

    public List<BankCard> getByParent(Parent parent){
        return bankCardRepository.findByParent(parent);
    }
}
