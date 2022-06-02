package com.activities.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Evaluation;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Integer>{
    
}
