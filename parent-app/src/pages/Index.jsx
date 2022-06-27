import React, { useContext } from "react"

//import {TestComponent} from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { ActivitiesSection } from "../components/ActivitiesSection";
import { fetchRebookActivities, fetchUpcomingActivities } from "../api/fetchAPI";
import { RecommendedActivityTile } from "../components/RecommendedActivityTile";
import { UpcomingActivityTile } from "../components/UpcomingActivityTile";
import { AppContext } from "../AppContext";

export function Index() {

    const context = useContext(AppContext)

    return (
        context.state.userInfo ?
        <div className="w-full flex flex-col gap-3 items-center">
            <ActivitiesSection
                showBg={true}
                title="Κλείστε Ξανά"
                fetchData={(n, callback) => fetchRebookActivities(-1, n, callback)}
                TileRenderer={RecommendedActivityTile}
            />
            <ActivitiesSection
                showBg={false}
                title="Επερχόμενες Δραστηριότητες"
                fetchData={(n, callback) => fetchUpcomingActivities(-1, n, callback)}
                TileRenderer={UpcomingActivityTile}
            />
        </div>
        :
        <div className="w-full flex flex-col gap-3 items-center">
            <ActivitiesSection
                showBg={true}
                title="Κλείστε Ξανά"
                fetchData={(n, callback) => fetchRebookActivities(-1, n, callback)}
                TileRenderer={RecommendedActivityTile}
            />
            <ActivitiesSection
                showBg={false}
                title="Επερχόμενες Δραστηριότητες"
                fetchData={(n, callback) => fetchUpcomingActivities(-1, n, callback)}
                TileRenderer={UpcomingActivityTile}
            />
        </div>
    )
}
