import React from "react";
import { Link } from 'react-router-dom'
import { ContentTile } from "../shared/ContentTile";
import { ActivityLocationIndicator } from "./ActivityLocationIndicator";
import { ActivityRatingIndicator } from "./ActivityRatingIndicator";

export function RecommendedActivityTile({
    activityInfo: {
        imgSrc,
        name,
        rating,
        locationName,
        price,
        // needed for url
        //activityId
    }
}) {
    return (
        <Link to="/">
            <ContentTile
                padding="p-4"
                bgColor="bg-white"
                stretch={false}
                dimensions="max-w-xs"
                classExtra="hover:bg-xlight-cyan shadow-md hover:shadow-lg duration-200"
            >
                <div className="flex flex-col gap-3 items-center text-center">
                    <img src={imgSrc} alt={imgSrc} className="rounded-3xl"/>
                    <span className="text-lg font-medium">{name}</span>
                    <ActivityLocationIndicator locationName={locationName} />
                    <ActivityRatingIndicator ratingScore={rating} />
                    <span className="font-semibold">{price} Πόντοι</span>
                </div>
            </ContentTile>
        </Link>
    )
}
