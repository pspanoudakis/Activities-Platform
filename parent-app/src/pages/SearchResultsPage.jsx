import React from "react";
import { ActivityResults } from "./ActivityResults";

export function SearchResultsPage() {
    return (
        <div className="w-full flex flex-col gap-3 items-center justify-start">
            <ActivityResults
                options={{}}
                initialHomePosition={{
                    "lat": 38.11987459663194,
                    "lng": 23.866071050478975
                }}
            />
        </div>
    )
}