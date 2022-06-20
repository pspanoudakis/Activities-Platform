import React from "react";
import { useParams } from "react-router-dom";
import { fetchSamePlaceActivities, fetchSameProviderActivities } from "../api/fetchAPI";
import { ActivitiesSection } from "../components/ActivitiesSection";
import { ActivityContent } from "../components/ActivityContent";
import { RecommendedActivityTile } from "../components/RecommendedActivityTile";

export function ActivityPage() {

    const { activityId } = useParams()

    return (
        <div className="w-full flex flex-col gap-3">
            <ActivityContent activityId={activityId}/>
            <ActivitiesSection
                title="Δραστηριότητες στο ίδιο μέρος"
                TileRenderer={RecommendedActivityTile}
                showBg={false}
                fetchData={(n, callback) => fetchSamePlaceActivities(activityId, n, callback)}
            />
            <ActivitiesSection
                title="Δραστηριότητες από τον ίδιο πάροχο"
                TileRenderer={RecommendedActivityTile}
                showBg={true}
                fetchData={(n, callback) => fetchSameProviderActivities(activityId, n, callback)}
            />
        </div>
    )    
}
