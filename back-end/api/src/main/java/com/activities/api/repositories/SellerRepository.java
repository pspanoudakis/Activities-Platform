package com.activities.api.repositories;

import com.activities.api.entities.Seller;

import java.util.Optional;

import com.activities.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Integer>{
    Optional<Seller> findByUser(User user);
    Optional<Seller> findByUser_Username(String username);
}
