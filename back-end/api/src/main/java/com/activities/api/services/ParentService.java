package com.activities.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activities.api.entities.Parent;
import com.activities.api.repositories.ParentRepository;

@Service
public class ParentService {
    
    @Autowired private ParentRepository parentRepository;

    public List<Parent> getParents(){
        return parentRepository.findAll();
    }

    public Parent saveOrUpdateParent(Parent parent){
        return parentRepository.save(parent);
    }
}
