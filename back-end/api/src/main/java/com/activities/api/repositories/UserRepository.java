package com.activities.api.repositories;

import com.activities.api.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
    User findByUsername(String username);
    public int countByAuthorities_Authority(String authority);
}
