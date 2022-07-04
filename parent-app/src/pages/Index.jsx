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
                placeholderText="Δεν βρέθηκαν Δραστηριότητες."
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
                placeholderText="Οι Δραστηριότητες που έχετε κλείσει στο παρελθόν, θα εμφανίζονται εδώ."
                fetchData={(n, callback) => fetchRebookActivities(n, callback)}
                TileRenderer={RecommendedActivityTile}
            />
            <ActivitiesSection
                showBg={false}
                title="Επερχόμενες Δραστηριότητες"
                placeholderText="Δεν έχετε κλείσει κάποια επερχόμενη Δραστηριότητα."
                fetchData={(n, callback) => fetchUpcomingActivities(n, callback)}
                TileRenderer={UpcomingActivityTile}
            />
        </>
    )
}

export function Index() {

    const context = useContext(AppContext)
    return (
        // not sure if px in needed here
        <div className="w-full flex flex-col gap-3 items-center pt-4">
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
