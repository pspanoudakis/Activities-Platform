import React from "react";
import { useParams } from "react-router-dom";
import { fetchRecommendedActivities } from "../api";
import { ActivitiesSection } from "../components/ActivitiesSection";
import { ActivityContent } from "../components/ActivityContent";
import { RecommendedActivityTile } from "../components/RecommendedActivityTile";

export function ActivityPage() {

    const { activityId } = useParams()

    const fetchSamePlaceActivities = (totalActivities, callback) => {
        // to be changed
        fetchRecommendedActivities(totalActivities, callback)
    }

    const fetchSameProviderActivities = (totalActivities, callback) => {
        // to be changed
        fetchRecommendedActivities(totalActivities, callback)
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <ActivityContent activityId={activityId}/>
            <ActivitiesSection
                title="Δραστηριότητες στο ίδιο μέρος"
                TileRenderer={RecommendedActivityTile}
                showBg={false}
                fetchData={fetchSamePlaceActivities}
            />
            <ActivitiesSection
                title="Δραστηριότητες από τον ίδιο πάροχο"
                TileRenderer={RecommendedActivityTile}
                showBg={true}
                fetchData={fetchSameProviderActivities}
            />
        </div>
    )    
}
