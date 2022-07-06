package com.activities.api.services;

import java.util.List;
import java.util.stream.Collectors;

import com.activities.api.dto.BankAccountDTO;
import com.activities.api.entities.Seller;
import com.activities.api.entities.User;
import com.activities.api.entities.BankAccount;
import com.activities.api.repositories.BankAccountRepository;
import com.activities.api.repositories.SellerRepository;

import com.activities.api.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class SellerService {
    
    @Autowired private SellerRepository sellerRepository;

    @Autowired private BankAccountRepository bankAccountRepository;

    @Autowired private JwtUtil jwtUtil;

    @Autowired private UserService userService;



    public List<Seller> getSellers(){
        return sellerRepository.findAll();
    }

    public Seller getByUser(User user){return sellerRepository.findByUser(user).orElse(null);}

    public Seller saveOrUpdateSeller(Seller seller){
        return sellerRepository.save(seller);
    }

    public Seller getSellerByUN(String username){
        return sellerRepository.findByUser_Username(username).orElse(null);
    }

    public Seller getSellerFromToken(String token) throws BadCredentialsException {
        String username = jwtUtil.getUsernameFromToken(token.split(" ")[1]);
        User user = userService.getUserByUN(username);
        if(user == null)throw new BadCredentialsException("user " + username + " does not exist");

        Seller seller = getByUser(user);
        if(seller == null)throw new BadCredentialsException("user " + username + " is not a parent)");
        return seller;
    }

    public List<BankAccountDTO> getBankAccounts(Seller seller) {
        return  bankAccountRepository.findBySeller(seller).stream().map(
                account -> {
                    BankAccountDTO acc = new BankAccountDTO();
                    acc.setAccount_number(account.getAccountNumber());
                    acc.setId(account.getId());
                    acc.setIban(account.getIban());
                    acc.setOwner_name(acc.getOwner_name());
                    return acc;
                }
        ).collect(Collectors.toList());
    }

    @Transactional
    public BankAccountDTO addBankAccount(BankAccountDTO new_account,Seller seller){
        BankAccount account = new BankAccount();
        account.setSeller(seller);
        account.setIban(new_account.getIban());
        account.setAccountNumber(new_account.getAccount_number());
        account.setOwnerName(new_account.getOwner_name());
        account = bankAccountRepository.save(account);
        new_account.setId(account.getId());
        return new_account;
    }

    public int getPoints(Seller seller){
        return seller.getUser().getBalance();
    }

    @Transactional
    public boolean redeemPoints(Seller seller,int points){
        System.out.println(points);
        User user = seller.getUser();
        if(user.getBalance() < points)
            return false;
        int newBalance = seller.getUser().getBalance() - points;
        user.setBalance(newBalance);
        seller.setUser(userService.saveOrUpdate(user));
        sellerRepository.save(seller);
        return true;
    }


}
