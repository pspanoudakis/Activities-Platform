import React from "react"
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function ActivityRatingIndicator({
    ratingScore
}) {
    return (
        <div className="flex flex-row gap-2 flex-wrap items-center justify-center">
            <div className="flex flex-row gap-1 text-xl text-xdark-cyan">
                {
                    [...Array(5).keys()].map((_, i) => {
                        if (ratingScore >= (i + 1)) {
                            return <FontAwesomeIcon icon={faStar} key={i}/>
                        }
                        if (Math.ceil(ratingScore) === (i + 1) ) {
                            return <FontAwesomeIcon icon={faStarHalf} key={i}/>
                        }
                        return null
                    })
                }
            </div>
            <span className="text-sm">
                {ratingScore} / 5
            </span>
        </div>
    )
}
