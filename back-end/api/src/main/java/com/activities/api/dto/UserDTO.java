package com.activities.api.dto;

import java.util.stream.Collectors;

import com.activities.api.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class UserDTO {
    private String username;
    private String status;
    private String image;
    private String role;

    public UserDTO(User user){
        this.username = user.getUsername();
        this.status = (user.isActive() ? "active" : "blocked");
        this.image = user.getImage();
        this.role = user.getAuthorities().stream().collect(Collectors.toList()).get(0).getAuthority();
    }
}
