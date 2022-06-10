import React from "react";
import { Link } from "react-router-dom";
import { ContentTile } from "../shared/ContentTile";
import { ActivityDateIndicator } from "./ActivityDateIndicator";
import { ActivityLocationIndicator } from "./ActivityLocationIndicator";
import { ActivityRatingIndicator } from "./ActivityRatingIndicator";

export function SearchResultTile({
    activityInfo: {
        imgSrc,
        name,
        locationName,
        rating,
        nextDate,
        price
    }
}) {
    return (
        <Link to="/">
            <ContentTile
                padding="p-2"
                bgColor="bg-white"
                stretch={true}
                dimensions=""
                classExtra="hover:bg-xlight-cyan shadow-md hover:shadow-lg duration-200"
            >
                <div className="flex flex-row gap-3 items-center justify-around text-left flex-wrap">
                    <img src={imgSrc} alt={imgSrc} className="rounded-3xl w-48"/>
                    <div className="flex flex-col gap-2 justify-start">
                        <span className="text-xl font-medium text-center">{name}</span>
                        <ActivityLocationIndicator locationName={locationName} />
                        <ActivityDateIndicator date={nextDate} text="Επόμενη Κράτηση: "/>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <ActivityRatingIndicator ratingScore={rating} />
                        <span className="font-semibold text-lg text-center">{price} Πόντοι</span>
                    </div>
                </div>
            </ContentTile>
        </Link>
    )
}
