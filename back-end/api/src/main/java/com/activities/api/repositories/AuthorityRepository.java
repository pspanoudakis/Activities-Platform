package com.activities.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Authority;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer>{
    
}
