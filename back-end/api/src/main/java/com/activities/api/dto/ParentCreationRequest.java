package com.activities.api.dto;

import lombok.Data;

@Data
public class ParentCreationRequest {
    private String username;
    private String password;
    private String email;
}
