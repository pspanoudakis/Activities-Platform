package com.activities.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class  PagingResponse <T> {
    T page;
    int total_pages;
}
