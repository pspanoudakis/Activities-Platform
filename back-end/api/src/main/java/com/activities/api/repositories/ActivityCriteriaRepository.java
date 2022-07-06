package com.activities.api.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.activities.api.dto.ActivityPage;
import com.activities.api.dto.ActivitySearchCriteria;
import com.activities.api.entities.Activity;

@Repository
public class ActivityCriteriaRepository {

    private final EntityManager entityManager;
    private final CriteriaBuilder criteriaBuilder;

    ActivityCriteriaRepository(EntityManager entityManager){
        this.entityManager = entityManager;
        criteriaBuilder = entityManager.getCriteriaBuilder();
    }
    
    public Page<Activity> findAllWithFilters(
        ActivityPage activityPage, 
        ActivitySearchCriteria activitySearchCriteria){
        
        CriteriaQuery<Activity> criteriaQuery = criteriaBuilder.createQuery(Activity.class);
        Root<Activity> activityRoot =  criteriaQuery.from(Activity.class);
        Predicate predicate = getPredicate(activitySearchCriteria, activityRoot);
        criteriaQuery.where(predicate);
        setOrder(activityPage, criteriaQuery, activityRoot);

        TypedQuery<Activity> typedQuery = entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(activityPage.getPageNumber() * activityPage.getPageSize());
        typedQuery.setMaxResults(activityPage.getPageSize());

        Pageable pageable = getPageable(activityPage);

        long activityCount = getActivitiesCount(predicate);
        return new PageImpl<>(typedQuery.getResultList(), pageable, activityCount);
    }

    private Predicate getPredicate(
        ActivitySearchCriteria activitySearchCriteria,
        Root<Activity> activityRoot
    ) {
        List<Predicate> textPredicates = new ArrayList<>();
        List<Predicate> capPredicates = new ArrayList<>();
        
        //max price
        if(
            Objects.nonNull(activitySearchCriteria.getMax_price()) &&
            activitySearchCriteria.getMax_price() != 0
        ){
            capPredicates.add(
              criteriaBuilder.le(
                activityRoot.get("price"),
                activitySearchCriteria.getMax_price())  
            );
        }

        //min price
        if(
            Objects.nonNull(activitySearchCriteria.getMin_price()) &&
            activitySearchCriteria.getMin_price() != 0
        ){
            capPredicates.add(
              criteriaBuilder.ge(
                activityRoot.get("price"),
                activitySearchCriteria.getMin_price())  
            );
        }

        //in date range
        // if(
        //     Objects.nonNull(activitySearchCriteria.getStart_date()) &&
        //     Objects.nonNull(activitySearchCriteria.getEnd_date())
        // ){
        //     capPredicates.add(
        //         criteriaBuilder.between(
        //             activityRoot.get("")
        //         )
        //     )
        // }

        //text in name
        if(Objects.nonNull(activitySearchCriteria.getName())){
            textPredicates.add(
                criteriaBuilder.like(
                    activityRoot.get("name"),
                    "%" + activitySearchCriteria.getName() + "%"
                )
            );
        }
        
        //text in description
        if(Objects.nonNull(activitySearchCriteria.getDescription())){
            textPredicates.add(
                criteriaBuilder.like(
                    activityRoot.get("description"),
                    "%" + activitySearchCriteria.getDescription() + "%"
                )
            );
        }
        
        //if no filters are given return everything
        if(capPredicates.size() == 0 && textPredicates.size() == 0)
            return criteriaBuilder.ge(
                activityRoot.get("id"),
                0
            );

        //if no cap predicates defined return result of text search
        if(capPredicates.size() == 0)
            return criteriaBuilder.or(textPredicates.toArray(new Predicate[0]));

        //if no text predicates defined return result of cap predicates
        if(textPredicates.size() == 0)
            return criteriaBuilder.and(capPredicates.toArray(new Predicate[0]));

        //else combine everything
        return criteriaBuilder.and(
            criteriaBuilder.and(capPredicates.toArray(new Predicate[0])),
            criteriaBuilder.or(textPredicates.toArray(new Predicate[0]))
        );
    }

    private void setOrder(ActivityPage activityPage, CriteriaQuery<Activity> criteriaQuery,
            Root<Activity> activityRoot) {

        if(activityPage.getSortDirection().equals(Sort.Direction.ASC)){
            criteriaQuery.orderBy(
                criteriaBuilder.asc(activityRoot.get(activityPage.getSortBy()))
            );
        }else {
            criteriaQuery.orderBy(
                criteriaBuilder.desc(activityRoot.get(activityPage.getSortBy()))
            );
        }
    }

    private Pageable getPageable(ActivityPage activityPage) {

        Sort sort = Sort.by(activityPage.getSortDirection(), activityPage.getSortBy());
        return PageRequest.of(activityPage.getPageNumber(), activityPage.getPageSize(), sort);
    }

    private long getActivitiesCount(Predicate predicate) {
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<Activity> countRoot = countQuery.from(Activity.class);
        countQuery.select(criteriaBuilder.count(countRoot)).where(predicate);
        return entityManager.createQuery(countQuery).getSingleResult();
    }
    
}
