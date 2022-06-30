import React, { useContext } from "react"

//import {TestComponent} from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { ActivitiesSection } from "../components/ActivitiesSection";
import { RecommendedActivityTile } from "../components/RecommendedActivityTile";
import { UpcomingActivityTile } from "../components/UpcomingActivityTile";
import { AppContext } from "../AppContext";
import { fetchPopularActivities, fetchRebookActivities, fetchUpcomingActivities } from "../api/recommendationsAPI";
import { PlatformShowcase } from "../components/PlatformShowcase";
import { ActivityCategoryPicker } from "../components/ActivityCategoryPicker";

function LandingHomeContent() {
    return (
        <>
            <ActivitiesSection
                showBg={true}
                title="Δημοφιλείς Δραστηριότητες"
                fetchData={(n, callback) => fetchPopularActivities(n, callback)}
                TileRenderer={RecommendedActivityTile}
            />
            <PlatformShowcase/>
        </>
    )
}

function UserHomeContent() {
    return (
        <>
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
        </>
    )
}

export function Index() {

    const context = useContext(AppContext)
    return (
        <div className="w-full flex flex-col gap-3 items-center px-3 pt-4">
            <ActivityCategoryPicker/>
        {
            context.state.userInfo ?
            <UserHomeContent/>
            :
            <LandingHomeContent/>
        }
        </div>
        
    )
}
