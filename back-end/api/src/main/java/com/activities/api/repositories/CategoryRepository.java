package com.activities.api.repositories;

import com.activities.api.entities.Category;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
    public List<Category> findByParentCategory(Category category);
    public List<Category> findByParentCategoryIn(Collection<Category> categories);
    public Optional<Category> findByName(String name);
}
