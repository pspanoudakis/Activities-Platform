import React from "react";
import { Link } from "react-router-dom";
import { ContentTile } from "../shared/ContentTile";
import { ActivityDateIndicator } from "./ActivityDateIndicator";
import { ActivityLocationIndicator } from "./ActivityLocationIndicator";
import { ActivityRatingIndicator } from "./ActivityRatingIndicator";

export function SearchResultTile({
    activityInfo: {
        // to create url
        id,
        
        imgSrc,
        name,
        locationName,
        rating,
        nextDate,
        price
    },
    onClick,
    isSelected
}) {

    return (
        <div className="cursor-pointer" onClick={() => onClick()}>
            <ContentTile
                padding="p-2"
                bgColor="bg-white"
                stretch={true}
                dimensions=""
                classExtra={`
                    ${
                        isSelected ?
                        'bg-light-cyan shadow-lg border-4 border-navbar-cyan'
                        :
                        'hover:bg-light-cyan shadow-md hover:shadow-lg'
                    }
                    duration-200
                `}
            >
                <div className="flex flex-row gap-3 items-center md:justify-between justify-center text-left flex-wrap px-2">
                    <img src={imgSrc} alt={imgSrc} className="rounded-3xl w-48"/>
                    <div className="flex-1 flex flex-row items-center md:justify-between md:px-4 justify-around text-left flex-wrap gap-2" style={{minWidth: '15rem'}}>
                        <div className="flex flex-col gap-2 justify-start">
                            <span className="text-xl font-medium text-center">{name}</span>
                            <ActivityLocationIndicator locationName={locationName} />
                            <ActivityDateIndicator date={nextDate} text="Επόμενη Κράτηση: "/>
                        </div>
                        <div className="flex flex-col gap-2 justify-center">
                            <ActivityRatingIndicator ratingScore={rating} />
                            <Link to="/" className="text-center bg-navbar-cyan hover:bg-navbar-dark-cyan px-2 py-1 rounded-xl font-semibold">
                                {`${price} Πόντοι`}
                            </Link>
                        </div>
                    </div>
                </div>
            </ContentTile>
        </div>
    )
}
