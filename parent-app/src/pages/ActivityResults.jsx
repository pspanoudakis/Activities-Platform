import { faHouse, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchActivityResults } from "../api/fetchAPI";
import { MultiMarkerMap } from "../components/Maps";
import { SearchResultTile } from "../components/SearchResultTile";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { GoogleUtils } from "../utils/GoogleUtils";

function HomeAddressIndicator({
    address,
    onSelectNew,
    pending,
    onLock
}) {
    return (
        <div className="w-full flex flex-row gap-x-4 gap-y-2 flex-wrap justify-start items-start px-3 pt-2">
            <div className="flex flex-row gap-1">
                <span className="font-semibold">Επιλεγμένη διεύθυνση:</span>
                <span>{address}</span>
            </div>
            {
                pending ?
                <button
                    className={`
                        flex flex-row gap-1 
                        bg-dark-cyan hover:bg-xdark-cyan
                        py-1 px-3 rounded-2xl
                    `}
                    onClick={onLock}
                >
                    <FontAwesomeIcon icon={faLock}/>
                    <span className="text-sm">Κλείδωμα διεύθυνσης</span>
                </button>
                :
                <button
                className={`
                    flex flex-row gap-1 
                    bg-dark-cyan hover:bg-xdark-cyan
                    py-1 px-3 rounded-2xl
                `}
                onClick={onSelectNew}
            >
                <FontAwesomeIcon icon={faHouse}/>
                <span className="text-sm">Επιλογή νέας διεύθυνσης</span>
            </button>
            }
        </div>
    )
}

async function fetchLocationAdresses(activities) {
    const locations = []
    for (const a of activities) {
        const l = await GoogleUtils.coordinatesToAddressAsync(a.location.lat, a.location.lng)
        locations.push(l)
    }
    return locations
}

export function ActivityResults({
    options,
    initialHomePosition
}) {

    const [loading, setLoading] = useState(true)

    const [homePosition, setHomePosition] = useState(initialHomePosition)
    const [pendingHomeSelection, setPendingHomeSelection] = useState(false)
    const [homeAddress, setHomeAddress] = useState('')
    const [secondaryPositions, setSecondaryPositions] = useState([])

    const [selectedActivity, setSelectedActivity] = useState(-1)
    const [activities, setActivities] =  useState([])
    const [activityLocations, setActivityLocations] = useState([])
    
    const activityClicked = (idx) => {
        setSecondaryPositions([activities[idx].location])
        setSelectedActivity(idx)
    }

    useEffect(() => {
        GoogleUtils.coordinatesToAddress(homePosition.lat, homePosition.lng, (addr) => {
            setHomeAddress(addr)
        })
    }, [homePosition])

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

    const homePositionSelected = (pos) => {
        setHomePosition(pos)
    }

    const lockHomePosition = () => {
        setPendingHomeSelection(false)
    }

    const selectNewHome = () => {
        setSecondaryPositions([])
        setSelectedActivity(-1)
        setPendingHomeSelection(true)
    }

    return (
        <>
            <HomeAddressIndicator
                address={homeAddress}
                onSelectNew={selectNewHome}
                pending={pendingHomeSelection}
                onLock={lockHomePosition}
            />
            <MultiMarkerMap
                mainMarkerPosition={homePosition}
                restMarkersPositions={secondaryPositions}
                style={{width: '100%', height: '20rem'}}
                onClick={homePositionSelected}
                notifyOnClick={pendingHomeSelection}
            />
            <div className="w-10/12 flex flex-col gap-2">
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
        </>
    )    
}
