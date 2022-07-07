package com.activities.api.services;

import java.util.List;

import com.activities.api.entities.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activities.api.entities.BankAccount;
import com.activities.api.repositories.BankAccountRepository;

@Service
public class BankAccountService {
    @Autowired
    private BankAccountRepository bankAccountRepository;

    public List<BankAccount> getBankAccounts(){
        return bankAccountRepository.findAll();
    }

    public boolean exists(int account_id) {return bankAccountRepository.findById(account_id).isPresent();}

    public boolean IsOwnedBySeller(int account_id, Seller seller) {
        BankAccount account = bankAccountRepository.findById(account_id).get();
        return seller.getId() == account.getSeller().getId();
    }

    public void deleteAccount(int account_id){
        bankAccountRepository.deleteById(account_id);
    }
}
