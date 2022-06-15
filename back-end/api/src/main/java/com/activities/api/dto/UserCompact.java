package com.activities.api.dto;

import java.util.stream.Collectors;

import com.activities.api.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class UserCompact {
    String username;
    String role;
    String status;

    public UserCompact(User user){
        this.username = user.getUsername();
        this.role = user.getAuthorities().stream().collect(Collectors.toList()).get(0).getAuthority();
        this.status = (user.isActive() ? "active" : "blocked");
    }
}
