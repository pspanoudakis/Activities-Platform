import React, { useContext } from "react"

import {TestComponent} from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { AppContext } from "../AppContext";
import { ActivitiesSection } from "../components/ActivitiesSection";
import { fetchRebookActivities, fetchUpcomingActivities } from "../api";
import { RecommendedActivityTile } from "../components/RecommendedActivityTile";
import { UpcomingActivityTile } from "../components/UpcomingActivityTile";
import { SearchResultTile } from "../components/SearchResultTile";

export function Index() {

    const context = useContext(AppContext)

    const activities =  [...Array(4).keys()].map((_, i) => {

        (new Image()).src = `img${i}`

        return {
            imgSrc: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1000&h=-1&s=1`,
            name: `Activity${i}`,
            rating: 3.9,
            locationName: `Κυκλαμίνων 48, Άνοιξη Αττικής`,
            price: 100,
            nextDate: `11/4/22 14:00`
        }
    })

    return (
        <div className="w-full flex flex-col gap-3 items-center">
            {/* <button onClick={() => context.setState({
                ...context.state,
                showModal: true,
                modalContent: (
                    <div className="bg-blue-600 rounded-3xl px-4">Modal Content</div>
                )
            })}>
                Open Modal
            </button>
            <TestComponent/>
            <h2>Parent Index</h2> */}
            <ActivitiesSection
                showBg={true}
                title="Κλείστε Ξανά"
                fetchData={fetchRebookActivities}
                TileRenderer={RecommendedActivityTile}
            />
            <ActivitiesSection
                showBg={false}
                title="Επερχόμενες Δραστηριότητες"
                fetchData={fetchUpcomingActivities}
                TileRenderer={UpcomingActivityTile}
            />
            <div className="w-10/12 flex flex-col gap-2">
                {
                    activities.map((a, i) => <SearchResultTile key={i} activityInfo={a}/>)
                }
            </div>
        </div>
    )
}
