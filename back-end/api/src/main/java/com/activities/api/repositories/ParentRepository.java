package com.activities.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Parent;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Integer>{
    
}
