package com.activities.api.repositories;

import com.activities.api.entities.Facility;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Integer>{
    List<Facility> findByDistrict(String district);
}
