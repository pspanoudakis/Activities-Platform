package com.activities.api.services;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.activities.api.dto.ActivityPopularity;
import com.activities.api.entities.Activity;
import com.activities.api.entities.ActivityAtDay;
import com.activities.api.entities.ActivityPhoto;
import com.activities.api.entities.AgeCategory;
import com.activities.api.entities.Category;
import com.activities.api.entities.Evaluation;
import com.activities.api.entities.Facility;
import com.activities.api.entities.Seller;
import com.activities.api.repositories.ActivityAtDayRepository;
import com.activities.api.repositories.ActivityPhotoRepository;
import com.activities.api.repositories.ActivityRepository;
import com.activities.api.repositories.EvaluationRepository;
import com.activities.api.repositories.FacilityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    @Autowired private ActivityRepository activityRepository;
    @Autowired private EvaluationRepository evaluationRepository;
    @Autowired private ActivityAtDayRepository activityAtDayRepository;
    @Autowired private ActivityPhotoRepository activityPhotoRepository;
    @Autowired private FacilityRepository facilityRepository;


    public Activity saveOrUpdateActivity(Activity activity){
        return activityRepository.save(activity);
    }

    public List<Activity> getActivities(){
        return activityRepository.findByApprovedTrue();
    }

    public Activity getById(int id){
        return activityRepository.findById(id).orElse(null);
    }

    public Activity getActivity(int id){
        Activity a = activityRepository.findByIdAndApprovedTrue(id).orElse(null);
        // System.out.println(a.toString());
        return a;
    }

    public void deleteActivity(Activity activity){
        activityRepository.delete(activity);
    }

    public Page<Activity> getPendingActivitiesPage(int pageNumber, int pageSize){
        Pageable page = PageRequest.of(pageNumber-1, pageSize);
        return activityRepository.findAllByApprovedFalse(page);
    }

    public List<ActivityPopularity> getActivitiesSortedByReservations(){
        return activityRepository.getActivitiesSortedByReservations();
    }

    public int getActivityRating(Activity activity){
        List<Evaluation> evaluations = evaluationRepository.findByActivityAndActivity_ApprovedTrue(activity);
        return calculateRating(evaluations);
    }

    public long countActivities(){
        return activityRepository.count();
    }

    public List<ActivityPhoto> getActivityPhotos(Activity activity){
        return activityPhotoRepository.findByActivity(activity);
    }

    public List<Activity> getActivitiesByFacility(Facility facility){
        return activityRepository.findByFacilityAndApprovedTrue(facility);
    }

    public List<Activity> getActivitiesOfSeller(Seller seller){
        return activityRepository.findByFacilityInAndApprovedTrue(facilityRepository.findBySeller(seller));
    }

    public List<Activity> getActivitiesBySeller(Activity activity){
        return activityRepository.findByFacilityInAndApprovedTrue(facilityRepository.findBySeller(activity.getFacility().getSeller()));
    }


    public List<ActivityAtDay> getDaysOfActivity(Activity activity){
        return activityAtDayRepository.findByActivityAndDayAfterOrderByDayAsc(activity, LocalDate.now());
    }

    public List<Activity> getRecentlyBooked(int parent_id, int limit){
        return activityRepository.getRecentlyBookedActivities(
            /*LocalDate.now().minusDays(1)*/ LocalDate.parse("2022-08-30"), parent_id)
        .stream().limit(limit).collect(Collectors.toList());
    }

    public LocalDate getEarliestDate(Activity activity, LocalDate start_date){
        List<ActivityAtDay> days = activityAtDayRepository.findByActivityAndDayAfterAndCapacityGreaterThanOrderByDayAsc(activity, start_date.minusDays(1), 0);
        return (!days.isEmpty()) ? days.get(0).getDay() : LocalDate.parse("3000-01-02");
    }

    private int calculateRating(List<Evaluation> evaluations){
        int size = evaluations.size();
        int total = 0;
        for(int i = 0; i < size; i++) total += evaluations.get(i).getRating();
        return (int) ((double) total/size + 0.5);
    }

    public List<String> getActivityImages(Activity activity){
        return activityPhotoRepository.findByActivity(activity)
            .stream().map(
                act -> act.getUrl()
            ).collect(Collectors.toList());
    }

    public List<Activity> filterPriceAgeCategoryFacilityCategory(
        int max, int min, 
        List<AgeCategory> ageCategories, 
        List<Facility> facilities,
        List<Category> categories){

        return activityRepository.findByPriceLessThanEqualAndPriceGreaterThanEqualAndAgeCategoryInAndFacilityInAndCategoryInAndApprovedTrue(
            max, min, ageCategories, facilities, categories);
    }
}

