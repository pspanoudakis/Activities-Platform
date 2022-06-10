package com.activities.api.dto;

import com.activities.api.entities.Parent;
import com.activities.api.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ParentProfileDTO {
    
    private int id;
    private Double longitude;
    private Double latitude;
    private String address;

    private String email;
    private String image;
    private String name;
    private String surname;
    
    private int balance;

    public ParentProfileDTO(Parent parent){
        this.id = parent.getId();
        this.longitude = parent.getLongitude();
        this.latitude = parent.getLatitude();
        this.address = parent.getAddress();

        User user = parent.getUser();
        this.email = user.getEmail();
        this.image = user.getImage();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.balance = user.getBalance();
    }

}
