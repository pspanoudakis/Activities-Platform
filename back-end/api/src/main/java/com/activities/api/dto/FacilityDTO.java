package com.activities.api.dto;

import com.activities.api.entities.Facility;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FacilityDTO {
    private int id;
    private String name;
    private String address;
    private String district;
    private Double longitude;
    private Double latitude;


    public void setFromEntity(Facility facility) {
        this.id = facility.getId();
        this.address = facility.getAddress();
        this.district = facility.getDistrict();
        this.name = facility.getName();
        this.longitude = facility.getLongitude();
        this.latitude = facility.getLatitude();
    }
}
