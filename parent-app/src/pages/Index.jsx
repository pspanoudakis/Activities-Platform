import React, { useContext } from "react"

import {TestComponent} from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { AppContext } from "../AppContext";
import { ActivitiesSection } from "../components/ActivitiesSection";

export function Index() {

    const context = useContext(AppContext)

    return (
        <div className="w-full flex flex-col gap-2 ">
            <button onClick={() => context.setState({
                ...context.state,
                showModal: true,
                modalContent: (
                    <div className="bg-blue-600 rounded-3xl px-4">Modal Content</div>
                )
            })}>
                Open Modal
            </button>
            <TestComponent/>
            <ActivitiesSection title="Κλείστε Ξανά" />
            <h2>Parent Index</h2>
        </div>
    )
}
