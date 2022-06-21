package com.activities.api.services;

import java.util.ArrayList;
import java.util.List;

import com.activities.api.entities.Category;
import com.activities.api.repositories.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    
    @Autowired private CategoryRepository categoryRepository;

    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }

    public List<Category> getByParent(Category category){
        return  categoryRepository.findByParentCategory(category);
    }

    public Category getCategory(int id){
        return categoryRepository.findById(id).orElse(null);
    }

    public List<Category> getCategoriesRecursively(String name){

        if(name == null)return getCategories();

        Category root = categoryRepository.findByName(name).orElse(null);
        if(root == null)return null;

        ArrayList<Category> res = new ArrayList<>();
        res.add(root);
        List<Category> temp = categoryRepository.findByParentCategoryIn(res);
        while(!temp.isEmpty()){
            res.addAll(temp);
            temp = categoryRepository.findByParentCategoryIn(temp);
        }

        return res; 
    }
}
