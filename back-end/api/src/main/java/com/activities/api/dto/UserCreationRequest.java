package com.activities.api.dto;

import lombok.Data;

@Data
public class UserCreationRequest {
    private String username;
    private String password;
    private String email;
}
