import React, { useContext } from "react"

import {TestComponent} from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { AppContext } from "../AppContext";
import { ActivitiesSection } from "../components/ActivitiesSection";
import { fetchRebookActivities, fetchUpcomingActivities } from "../api";
import { RecommendedActivityTile } from "../components/RecommendedActivityTile";
import { UpcomingActivityTile } from "../components/UpcomingActivityTile";

export function Index() {

    const context = useContext(AppContext)

    return (
        <div className="w-full flex flex-col gap-3">
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
        </div>
    )
}
