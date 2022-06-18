import React, { useState } from "react";
import { useEffect } from "react";
import { fetchActivityResults } from "../api/fetchAPI";
import { MultiMarkerMap } from "../components/Maps";
import { SearchResultTile } from "../components/SearchResultTile";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { GoogleUtils } from "../utils/GoogleUtils";

async function fetchLocationAdresses(activities) {
    const locations = []
    for (const a of activities) {
        const l = await GoogleUtils.coordinatesToAddressAsync(a.location.lat, a.location.lng)
        locations.push(l)
    }
    return locations
}

export function SearchActivityPage() {

    const options = {}
    const [activities, setActivities] =  useState([])
    const [activityLocations, setActivityLocations] = useState([])
    const [loading, setLoading] = useState(true)
    const [homePosition,] = useState({
        "lat": 38.11987459663194,
        "lng": 23.866071050478975
    })
    const [secondaryPositions, setSecondaryPositions] = useState([])
    const [selectedActivity, setSelectedActivity] = useState(-1)
    
    const activityClicked = (idx) => {
        setSecondaryPositions([activities[idx].location])
        setSelectedActivity(idx)
    }

    useEffect(() => {
        fetchActivityResults(options, (response) => {
            if (response.ok) {
                setActivities(response.data)
                fetchLocationAdresses(response.data).then((locations) => {
                    console.log(locations)
                    setActivityLocations(locations)
                    setLoading(false)
                })
            }
            else {
                console.log('Failed to fetch activity results')
            }
        })
    }, [])

    return (
        <div className="w-full flex flex-col gap-3 items-center">
            <MultiMarkerMap
                mainMarkerPosition={homePosition}
                restMarkersPositions={secondaryPositions}
                style={{width: '100%', height: '20rem'}}
            />
            <div className="w-10/12 flex flex-col gap-2" style={{minHeight: '25rem'}}>
            {
                loading ?
                <LoadingIndicator/>
                :
                <>
                    {
                        activities.map((a, i) => <SearchResultTile
                                                    key={i}
                                                    activityInfo={{...a, locationName: activityLocations[i]}}
                                                    onClick={() => activityClicked(i)}
                                                    isSelected={selectedActivity === i}
                                                />)
                    }
                </>
            }
            </div>
        </div>
    )    
}
