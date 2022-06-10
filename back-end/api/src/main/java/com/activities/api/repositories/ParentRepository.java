package com.activities.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Parent;
import com.activities.api.entities.User;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Integer>{
    Optional<Parent> findByUser(User user);
}
