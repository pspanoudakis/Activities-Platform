package com.activities.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class BankAccountDTO {
    int id;
    String iban;
    String account_number;
    String owner_name;
}
