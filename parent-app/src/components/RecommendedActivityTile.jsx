import React from "react";
import { ContentTile } from "../shared/ContentTile";
import { ActivityLocationIndicator } from "./ActivityLocationIndicator";
import { ActivityRatingIndicator } from "./ActivityRatingIndicator";

export function RecommendedActivityTile({
    imgSrc,
    name,
    rating,
    locationName,
    price,
    // needed for url
    //activityId
}) {
    return (
        <a href="/">
            <ContentTile
                padding="p-4"
                bgColor="bg-white"
                stretch={false}
                dimensions=""
                classExtra="hover:bg-xlight-cyan shadow-md hover:shadow-lg duration-200"
            >
                <div className="flex flex-col gap-3 items-center">
                    <img src={imgSrc} alt={imgSrc} className="rounded-3xl"/>
                    <span className="text-lg font-medium">{name}</span>
                    <ActivityLocationIndicator locationName={locationName} />
                    <ActivityRatingIndicator ratingScore={rating} />
                    <span className="font-semibold">{price} Points</span>
                </div>

            </ContentTile>

        </a>
    )
}
