package com.activities.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activities.api.entities.BanckAccount;
import com.activities.api.repositories.BankAccountRepository;

@Service
public class BankAccountService {
    @Autowired
    private BankAccountRepository bankAccountRepository;

    public List<BanckAccount> getBankAccounts(){
        return bankAccountRepository.findAll();
    }
}
