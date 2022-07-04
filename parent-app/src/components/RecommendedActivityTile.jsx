import React from "react";
import { ActivityTile } from "./ActivityTile";
import { ActivityRatingIndicator } from "./ActivityRatingIndicator";

export function RecommendedActivityTile({
    activityInfo: {
        activityId,
        imgSrc,
        name,
        rating,
        locationName,
        price
    }
}) {

    return (
        <ActivityTile
            activityId={activityId}
            activityName={name}
            locationName={locationName}
            imgSrc={imgSrc}
        >
            <ActivityRatingIndicator ratingScore={rating} />
            <span className="font-semibold">{price} Πόντοι</span>
        </ActivityTile>
    )
}
