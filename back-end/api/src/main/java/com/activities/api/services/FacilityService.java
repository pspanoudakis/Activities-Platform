package com.activities.api.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.activities.api.dto.FacilityDTO;
import com.activities.api.entities.Facility;
import com.activities.api.entities.Seller;
import com.activities.api.repositories.ActivityRepository;
import com.activities.api.repositories.FacilityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacilityService {
    

    @Autowired private FacilityRepository facilityRepository;

    @Autowired private ActivityRepository activityRepository;

    public List<String> getDistricts(){
        return facilityRepository.getDistricts();
    }

    public FacilityDTO saveOrUpdateFacility(Facility facility){
        Facility saved_facility = facilityRepository.save(facility);
        FacilityDTO facilityDTO = new FacilityDTO();
        facilityDTO.setFromEntity(saved_facility);
        return facilityDTO;
    }

    public List<Facility> getFacilities(){
        return facilityRepository.findAll();
    }

    public boolean exists(int facility_id){
        return facilityRepository.findById(facility_id).isPresent();
    }

    public List<FacilityDTO> getFacilitiesBySeller(Seller seller) {
        List<Facility> facilities_entities = facilityRepository.findBySeller(seller);
        List<FacilityDTO> facilityDTOS = facilities_entities.stream().map(
                entity -> {
                    FacilityDTO facilityDTO = new FacilityDTO();
                    facilityDTO.setFromEntity(entity);
                    facilityDTO.setActivity_count(activityRepository.findTotalInFacility(entity.getId()));
                    return facilityDTO;
                }
        ).collect(Collectors.toList());
        return facilityDTOS;
    }


    public void update(Facility updatedFacility,int facility_id) {
        Facility facility = facilityRepository.findById(facility_id).get();
        facility.setName(updatedFacility.getName());
        facility.setAddress(updatedFacility.getAddress());
        facility.setDistrict(updatedFacility.getDistrict());
        saveOrUpdateFacility(facility);
    }



    public boolean isOwnedBySeller(Seller seller,int facility_id){
        Facility facility = facilityRepository.findById(facility_id).get();
        System.out.println(facility);
        return seller.getId() == facility.getSeller().getId();

    }

    public List<Facility> getFacilitiesByDistrict(String district){
        return facilityRepository.findByDistrict(district);
    }
}
