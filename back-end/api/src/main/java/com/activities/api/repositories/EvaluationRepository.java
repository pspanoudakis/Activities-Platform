package com.activities.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.activities.api.entities.Activity;
import com.activities.api.entities.Evaluation;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Integer>{
    
    public List<Evaluation> findByActivityAndActivity_ApprovedTrue(Activity activity);
    List<Evaluation> findByActivity(Activity activity);
}
