import React from "react";
import { Link } from "react-router-dom";
import { ContentTile } from "../shared/ContentTile";
import { PLACEHOLDER_ACTIVITY_IMG } from "../utils/placeholders";
import { ActivityDateIndicator } from "./ActivityDateIndicator";
import { ActivityLocationIndicator } from "./ActivityLocationIndicator";

export function UpcomingActivityResultTile({
    activityInfo: {
        activityId,
        images,
        name,
        address,
        date
    }
}) {

    return (
        <Link to={`/activities/${activityId}`}>
            <ContentTile
                padding="p-2"
                bgColor="bg-white"
                stretch={true}
                dimensions=""
                classExtra='hover:bg-light-cyan shadow-md hover:shadow-lg duration-200'
            >
                <div
                    className="flex flex-row gap-3 items-center md:justify-between justify-center text-left flex-wrap px-2"
                    style={{minHeight: '7rem'}}
                >
                    <img src={images[0] ?? PLACEHOLDER_ACTIVITY_IMG} alt={images[0]} className="rounded-3xl w-48" style={{maxHeight: '7rem'}}/>
                    <div className="flex-1 flex flex-row items-center md:justify-between md:px-4 justify-around text-left flex-wrap gap-2" style={{minWidth: '15rem'}}>
                        <div className="flex flex-col gap-2 justify-start">
                            <span className="text-xl font-medium text-center">{name}</span>
                            <ActivityLocationIndicator locationName={address} />
                            <ActivityDateIndicator date={date} text="Κράτηση: "/>
                        </div>
                    </div>
                </div>
            </ContentTile>
        </Link>
    )
}
