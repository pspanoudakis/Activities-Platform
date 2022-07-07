import React from "react";
import { ActivityDateIndicator } from "./ActivityDateIndicator";
import { ActivityTile } from "./ActivityTile";

export function UpcomingActivityTile({
    activityInfo: {
        activityId,
        imgSrc,
        name,
        locationName,
        nextDate
    }
}) {

    return (
        <ActivityTile
            activityId={activityId}
            activityName={name}
            locationName={locationName}
            imgSrc={imgSrc}
        >
            <ActivityDateIndicator date={nextDate} />
        </ActivityTile>
    )
}
