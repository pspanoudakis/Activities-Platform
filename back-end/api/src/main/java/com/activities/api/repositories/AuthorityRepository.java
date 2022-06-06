package com.activities.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Authority;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer>{
    public Optional<Authority> findByAuthority(String authority);
}
