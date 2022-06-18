package com.activities.api.dto;

import java.time.LocalDate;

import com.activities.api.entities.Activity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class SellerActivity {
    
    String name;
    String seller_name;
    LocalDate start_date;
    LocalDate end_date;
    int price;

    public SellerActivity(Activity act, LocalDate min, LocalDate max){
        this.name = act.getName();
        this.seller_name = act.getFacility().getSeller().getUser().getName();
        this.start_date = min;
        this.end_date = max;
        this.price = act.getPrice();
    }
}
