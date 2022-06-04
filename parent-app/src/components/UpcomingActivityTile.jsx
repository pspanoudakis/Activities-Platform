import React from "react";
import { Link } from 'react-router-dom'
import { ContentTile } from "../shared/ContentTile";
import { ActivityDateIndicator } from "./ActivityDateIndicator";
import { ActivityLocationIndicator } from "./ActivityLocationIndicator";

export function UpcomingActivityTile({
    activityInfo: {
        imgSrc,
        name,
        locationName,
        nextDate
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
                dimensions=""
                classExtra="hover:bg-xlight-cyan shadow-md hover:shadow-lg duration-200"
            >
                <div className="flex flex-col gap-3 items-center text-center">
                    <img src={imgSrc} alt={imgSrc} className="rounded-3xl"/>
                    <span className="text-lg font-medium">{name}</span>
                    <ActivityLocationIndicator locationName={locationName} />
                    <ActivityDateIndicator date={nextDate} />
                </div>
            </ContentTile>
        </Link>
    )
}
