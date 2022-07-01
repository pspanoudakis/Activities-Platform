package com.activities.api.dto;

import com.activities.api.entities.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShallowCategory {
    
    private int id;
    private int parent_id;
    private String name;
    private String image;

    public ShallowCategory(Category category){
        this.id = category.getId();
        Category parent = category.getParentCategory();
        this.parent_id = (parent == null) ? 0 : parent.getId();
        this.name = category.getName();
        this.image = category.getImage();
    }
}
