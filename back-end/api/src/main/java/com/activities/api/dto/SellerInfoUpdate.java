package com.activities.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class SellerInfoUpdate {
    private String username;
    private String email;
    private String new_password;
}
