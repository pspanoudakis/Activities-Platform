package com.activities.api.repositories;

import com.activities.api.entities.Facility;
import com.activities.api.entities.Seller;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Integer>{
    List<Facility> findByDistrict(String district);
    List<Facility> findBySeller(Seller seller);


    @Query("SELECT DISTINCT(fac.district) FROM Facility fac")
    List<String> getDistricts();
}
