import React, { useEffect } from "react";
import { useState } from "react";
import { ActivityResults } from "../components/ActivityResults";
import { SearchFiltersWrapper } from "../components/SearchFiltersWrapper";
import { useHasMaxWidth } from "../hooks/useHasMaxWidth";
import { MD_PXLIMIT } from "../utils/deviceConstants";

export function SearchResultsPage() {

    const mdDevice = useHasMaxWidth(MD_PXLIMIT)

    const [filtersOpen, setFiltersOpen] = useState(false)

    useEffect(() => {
        setFiltersOpen(false)
    }, [mdDevice])

    return (
        <div className={`w-full flex ${mdDevice ? 'flex-col gap-2 px-2' : 'flex-row gap-3'} items-center justify-center`}>
            <SearchFiltersWrapper isOpen={filtersOpen || !mdDevice} keepOpen={!mdDevice} options={{}} setOpen={setFiltersOpen}/>
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