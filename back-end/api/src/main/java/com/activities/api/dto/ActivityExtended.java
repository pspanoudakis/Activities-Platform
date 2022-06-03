package com.activities.api.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.activities.api.entities.Activity;
import com.activities.api.services.ActivityService;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ActivityExtended {
    
    String name;
    List<String> images;
    List<SimpleDay> days;
    int cost;
    String seller_name;
    String address;
    double longitude;
    double latitude;
    String description;
    List<ActivityCompact> colocatedActivities;

    public ActivityExtended(Activity activity, ActivityService activityService){
        this.name = activity.getName();
        this.cost = activity.getPrice();
        this.seller_name = activity.getFacility().getSeller().getUser().getUsername();
        this.address = activity.getFacility().getAddress();
        this.longitude = activity.getFacility().getLongitude();
        this.latitude = activity.getFacility().getLatitude();
        this.description = activity.getDescription();
        this.days = activityService.getDaysOfActivity(activity).stream().map(
            day -> new SimpleDay(day)
        ).collect(Collectors.toList());
        this.images = activityService.getActivityPhotos(activity).stream().map(
            photo -> photo.getUrl()
        ).collect(Collectors.toList());
        this.colocatedActivities = activityService.getActivitiesByFacility(
            activity.getFacility()
        ).stream().map(
            a -> new ActivityCompact(a, activityService, LocalDate.parse("2000-01-01"))
        ).collect(Collectors.toList());
        this.colocatedActivities.removeIf(item -> item.getActivity_id() == activity.getId());
    }
}
