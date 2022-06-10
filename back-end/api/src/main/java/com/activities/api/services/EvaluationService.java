package com.activities.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.activities.api.entities.Evaluation;
import com.activities.api.repositories.EvaluationRepository;

@Service
public class EvaluationService {
    
    @Autowired private EvaluationRepository evaluationRepository;

    public Evaluation saveOrUpdate(Evaluation evaluation){
        return evaluationRepository.save(evaluation);
    }

    public List<Evaluation> getEvaluations(){
        return evaluationRepository.findAll();
    }
}
