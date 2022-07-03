import React, { useState, useEffect } from "react";
import { faArrowRotateRight, faHouse, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchActivityResults } from "../api/searchAPI";
import { MultiMarkerMap } from "./Maps";
import { SearchResultTile } from "./SearchResultTile";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { PageSelector } from "../shared/PaginatedTable";
import { GoogleUtils } from "../utils/GoogleUtils";

function HomeAddressIndicator({
    address,
    onSelectNew,
    pending,
    onLock,
    canReset,
    onReset
}) {
    return (
        <div className="w-full flex flex-row gap-x-4 gap-y-2 flex-wrap justify-start items-center px-3 pt-2">
            <div className="flex flex-row gap-1">
                <span className="font-semibold">Επιλεγμένη διεύθυνση:</span>
                <span>{address}</span>
            </div>
            {
                pending ?
                <button
                    className={`
                        flex flex-row gap-1 items-center
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
                        flex flex-row gap-1 items-center
                        bg-dark-cyan hover:bg-xdark-cyan
                        py-1 px-3 rounded-2xl
                    `}
                    onClick={onSelectNew}
                >
                    <FontAwesomeIcon icon={faHouse}/>
                    <span className="text-sm">Επιλογή νέας διεύθυνσης</span>
                </button>
            }
            {
                canReset ?
                <button
                    className={`
                        flex flex-row gap-1 items-center
                        hover:underline font-semibold
                    `}
                    onClick={onReset}
                >
                    <FontAwesomeIcon icon={faArrowRotateRight}/>
                    <span className="text-sm">Επαναφορά Διεύθυνσης</span>
                </button>
                :
                null
            }
        </div>
    )
}

function comparePositions(a, b) {
    return a.lng === b.lng && a.lat === b.lat
}

const PAGE_SIZE = 4
export function ActivityResults({
    options,
    initialHomePosition,
    initialAddress
}) {

    const [loading, setLoading] = useState(true)

    const [homePosition, setHomePosition] = useState(initialHomePosition)
    const [pendingHomeSelection, setPendingHomeSelection] = useState(false)
    const [homeAddress, setHomeAddress] = useState(initialAddress)
    const [secondaryPositions, setSecondaryPositions] = useState([])

    const [selectedActivity, setSelectedActivity] = useState(-1)
    const [activities, setActivities] =  useState([])
    //const [activityLocations, setActivityLocations] = useState([])

    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(-1)
    
    const activityClicked = (idx) => {
        //console.log(activities[idx].coordinates);
        setSecondaryPositions([{
            lat: activities[idx].coordinates.latitude,
            lng: activities[idx].coordinates.longitude
        }])
        setSelectedActivity(idx)
    }

    useEffect(() => {
        if (!comparePositions(homePosition, initialHomePosition)) {
            setHomePosition(initialHomePosition)
            setHomeAddress(initialAddress)
        }
    }, [initialHomePosition.lat, initialHomePosition.lng, initialAddress])

    useEffect(() => {
        if (!comparePositions(homePosition, initialHomePosition) || initialAddress === '') {
            GoogleUtils.coordinatesToAddress(homePosition.lat, homePosition.lng, (addr) => {
                setHomeAddress(addr)
            })
        }
        else {
            setHomeAddress(initialAddress)
        }
    }, [homePosition, homeAddress, initialHomePosition, initialAddress])

    const loadData = (page) => {
        if (!loading) {
            setLoading(true)
        }
        setSelectedActivity(-1)
        setSecondaryPositions([])
        fetchActivityResults({...options, homePosition}, page, PAGE_SIZE, (response) => {
            if (response.ok) {
                setTotalPages(response.totalPages)
                setActivities(response.data)
                setLoading(false)
            }
            else {
                console.log('Failed to fetch activity results')
                setTotalPages(0)
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        if (currentPage !== 0) {
            setCurrentPage(0)
        }
        else if (totalPages !== -1) {
            loadData(0)
        }
    }, [options, homePosition])

    useEffect(() => {
        loadData(currentPage)
    }, [currentPage])

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
        <div className="w-full flex flex-col gap-3 items-center justify-start">
            <HomeAddressIndicator
                address={homeAddress}
                onSelectNew={selectNewHome}
                pending={pendingHomeSelection}
                onLock={lockHomePosition}
                canReset={!comparePositions(homePosition, initialHomePosition)}
                onReset={() => {
                    setHomePosition(initialHomePosition)
                    setHomeAddress(initialAddress)
                }}
            />
            <MultiMarkerMap
                mainMarkerPosition={homePosition}
                restMarkersPositions={secondaryPositions}
                style={{width: '100%', height: '20rem'}}
                onClick={homePositionSelected}
                notifyOnClick={pendingHomeSelection}
            />
            <div className="w-full flex flex-col gap-2 relative">
                <PageSelector
                    canNextPage={currentPage < totalPages - 1}
                    canPreviousPage={currentPage > 0}
                    currentPage={currentPage}
                    gotoPage={(newPage) => setCurrentPage(newPage)}
                    previousPage={() => setCurrentPage(currentPage - 1)}
                    nextPage={() => setCurrentPage(currentPage + 1)}
                    totalPages={totalPages}
                />
                <div className="w-full flex flex-col gap-2 overflow-y-auto" style={{maxHeight: '50vh'}}>
                {
                    activities.length > 0 ?
                    activities.map((a, i) => <SearchResultTile
                                                key={i}
                                                activityInfo={a}
                                                onClick={() => activityClicked(i)}
                                                isSelected={selectedActivity === i}
                                            />)
                    :
                    (
                        loading ?
                        null
                        :
                        <div className="flex justify-center items-center text-xl font-light h-16 text-center">
                            Δεν βρέθηκαν αποτελέσματα με βάση τα κριτήρια αναζήτησης.
                        </div>
                    )
                }
                </div>
            {
                loading ?
                <LoadingIndicator stretchParent={activities.length > 0}/>
                :
                null
            }
            </div>
        </div>
    )    
}
