package com.activities.api.services;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.activities.api.dto.ActivityCreation;
import com.activities.api.dto.SimpleDay;
import com.activities.api.entities.Activity;
import com.activities.api.entities.ActivityAtDay;
import com.activities.api.entities.ActivityPhoto;
import com.activities.api.entities.AgeCategory;
import com.activities.api.entities.Category;
import com.activities.api.entities.Evaluation;
import com.activities.api.entities.Facility;
import com.activities.api.entities.Seller;
import com.activities.api.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ActivityService {

    @Autowired private ActivityRepository activityRepository;
    @Autowired private EvaluationRepository evaluationRepository;
    @Autowired private ActivityAtDayRepository activityAtDayRepository;
    @Autowired private ActivityPhotoRepository activityPhotoRepository;
    @Autowired private FacilityRepository facilityRepository;

    @Autowired private  CategoryRepository categoryRepository;

    @Autowired private AgeCategoryRepository ageCategoryRepository;

    @Autowired private ReservationRepository reservationRepository;


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

    public List<Activity> getActivitiesSortedByReservations(){
        return activityRepository.getActivitiesSortedByReservations();
    }

    public Double getActivityRating(Activity activity){
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

    public List<Activity> getApprovedActivitiesOfSeller(Seller seller){
        return activityRepository.findByFacilityInAndApprovedTrue(facilityRepository.findBySeller(seller));
    }

    public List<Activity> getAllActivitiesOfSeller(Seller seller){
        return  activityRepository.findByFacilityIn(facilityRepository.findBySeller(seller));
    }

    public List<Activity> getApprovedActivitiesBySeller(Activity activity){
        return activityRepository.findByFacilityInAndApprovedTrue(facilityRepository.findBySeller(activity.getFacility().getSeller()));
    }

    public List<ActivityAtDay> getDaysOfActivity(Activity activity){
        return activityAtDayRepository.findByActivityAndDayAfterOrderByDayAsc(activity, LocalDate.now());
    }

    public LocalDate getNextOccurrence(Activity activity){
        List<ActivityAtDay> activityAtDays = activityAtDayRepository.findByActivity(activity);
        List<LocalDate> occurrences = activityAtDays.stream().map(ActivityAtDay::getDay).sorted().collect(Collectors.toList());
        for(LocalDate day: occurrences) {
            if(day.isBefore(LocalDate.now()))
                continue;
            // This is the next occurrence
            return day;
        }
        //All the days in the list were before the current date so there is no upcomming date for the activity
        return null;
    }

    public int getTotalReservations(Activity activity){
        return reservationRepository.getTotalReservationsByActivity(activity.getId());
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

    private Double calculateRating(List<Evaluation> evaluations){
        int size = evaluations.size();
        int total = 0;
        for(int i = 0; i < size; i++) total += evaluations.get(i).getRating();
        return ((double) total/size + 0.5);
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

    @Transactional
    public ActivityCreation createNewActivity(ActivityCreation newActivity){
        Activity activity = new Activity();
        Category category = categoryRepository.findById(newActivity.getCategory_id()).get();
        Facility facility = facilityRepository.findById(newActivity.getFacility_id()).get();
        AgeCategory ageCategory = ageCategoryRepository.findById(newActivity.getAge_category_id()).get();

        activity.setAgeCategory(ageCategory);
        activity.setFacility(facility);
        activity.setCategory(category);

        activity.setName(newActivity.getName());
        activity.setDescription(newActivity.getDescription());
        activity.setPrice(newActivity.getPrice());
        activity.setPeriodic(newActivity.is_recursive());
        activity.setApproved(false);

        activity = saveOrUpdateActivity(activity);
        newActivity.setId(activity.getId());


        for (String image_url:newActivity.getImages()) {
            ActivityPhoto image = new ActivityPhoto();
            image.setActivity(activity);
            image.setUrl(image_url);
            activityPhotoRepository.save(image);
        }

        for (SimpleDay day: newActivity.getDays()) {
            ActivityAtDay new_day = new ActivityAtDay();
            new_day.setDay(day.getDay());
            new_day.setTime(day.getTime());
            new_day.setCapacity(day.getCapacity());
            new_day.setActivity(activity);
            activityAtDayRepository.save(new_day);
        }
        return newActivity;
    }


}

