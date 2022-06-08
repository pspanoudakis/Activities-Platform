import React, { useContext, useEffect, useMemo, useState } from "react";

import { AppContext } from '../AppContext'
import { fetchActivity } from '../api'
import { dateText, DAY_NAMES } from "../dates";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { ActivityLocationIndicator } from "./ActivityLocationIndicator";
import { ActivityRatingIndicator } from "./ActivityRatingIndicator";
import { ActivityReservationSelector } from "./ActivityReservationSelector";
import { ActivityRateSelector } from "./ActivityRateSelector";
import { ActivityImageSelector } from "./ActivityImageSelector";

function sameDateTimes(d1, d2) {
    return d1.getHours() === d2.getHours && d1.getMinutes() === d1.getMinutes
}

function RepeatedActivityTimeline(slots) {

    const dayTimes = useMemo( () => {
        const map = []

        Object.keys(DAY_NAMES).forEach(i => map.push([]))
    
        for (const slot of slots) {
            if ( !map[slot.date.getDay()].some(date => sameDateTimes(date, slot.date)) ) {
                map[slot.date.getDay()].push(slot.date)
            }
        }

        return map

    }, [slots])

    return (
        <>
        {
            Object.keys(dayTimes).map(dayIdx => {
                if (dayTimes[dayIdx].length > 0) {
                    dayTimes[dayIdx].sort()
                    let sep = ''
                    
                    let dayStr = `${DAY_NAMES[dayIdx]}: `
                    dayTimes[dayIdx].forEach(d => {
                        dayStr = dayStr.concat(`${sep}${d.getHours()}:${d.getMinutes()}`)
                        sep = ', '
                    })
                    return (
                        <div key={dayIdx}>
                            {dayStr}
                        </div>
                    )
                }
                return null
            })
        }
        </>
    )
}

function ActivityTimelineInfo({
    repeated,
    startDate,
    endDate,
    slots
}) {

    return (
        <div className="flex flex-col gap-1">
            <span className="font-semibold text-lg">Διεξαγωγή:</span>
            <div className="flex flex-col font-light">
            {
                repeated ?
                <>
                    <span className="font-medium">{`${dateText(startDate)} - ${dateText(endDate)}`}</span>
                    {
                        RepeatedActivityTimeline(slots)
                    }
                </>
                :
                <>
                    {
                        slots.map((slot, idx) => {
                            return <span key={idx}>{`${DAY_NAMES[slot.getDay()]} ${dateText(slot.date)}, ${slot.time}`}</span>
                        })
                    }
                </>
            }
            </div>
        </div>
    )
}

export function ActivityContent({
    activityId
}) {

    const context = useContext(AppContext)

    const [activityInfo, setActivityInfo] = useState({
        name: '',
        providerName: '',
        images: [],
        rating: -1,
        description: '',
        location: {
            longitude: 0,
            latitude: 0,
            text: ''
        },
        ageCategory: '',
        price: -1,
        repeated: false,
        startDate: null,
        endDate: null,
        slots: []
    })
    const [loading, setLoading] = useState(true)
    const [reservations, setReservations] = useState([])
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetchActivity(activityId, (response) => {
            if (response.ok) {
                setActivityInfo(response.activity)
            }
            setLoading(false)
        })
    }, [])

    {/* <ActivityReservationSelector
            activityInfo={activityInfo}
            reservations={reservations}
            updateReservations={setReservations}
            quantity={quantity}
            setQuantity={setQuantity}
        /> */}

    return (
        <div
            className="w-full flex flex-col gap-2 rounded-2xl bg-cyan relative justify-center py-6 px-6 md:px-10 flex-wrap"
            style={{minHeight: '25rem'}}
        >
            {
                loading ?
                <LoadingIndicator stretchParent={false}/>
                :
                <div className="flex flex-col gap-3 justify-center md:items-start items-center">
                    <span className="font-semibold text-2xl tracking-tight">{activityInfo.name}</span>
                    <div className="flex flex-row gap-3 flex-wrap justify-center items-center">
                        <ActivityRatingIndicator
                            ratingScore={activityInfo.rating}
                            starSize="text-xl"
                            textSize="text-md"
                            starColor="text-yellow-500"
                        />
                        <button
                            className="text-sm font-semibold bg-yellow-500 hover:bg-yellow-600 duration-200 rounded-full px-4 py-1"
                            onClick={() => context.setState({
                                ...context.state,
                                showModal: true,
                                modalContent: <ActivityRateSelector activityId={activityId}/>
                            })}
                        >
                            Αξιολόγησέ το
                        </button>
                    </div>
                    <span className="tracking-tight">Πάροχος: {activityInfo.providerName}</span>
                    <div className="w-full md:gap-16 gap-8 flex flex-row flex-wrap md:justify-between justify-center items-center">
                        {/* <img
                            src={activityInfo.images[0]} alt=""
                            className="rounded-2xl max-w-sm"    
                        /> */}
                        <ActivityImageSelector images={activityInfo.images}/>
                        <div className="flex flex-row flex-wrap gap-5 flex-1 justify-center">
                            <div className="flex flex-col gap-3 items-start">
                                <ActivityTimelineInfo
                                    repeated={activityInfo.repeated}
                                    startDate={activityInfo.startDate}
                                    endDate={activityInfo.endDate}
                                    slots={activityInfo.slots}
                                />
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <span className="font-semibold text-lg">{activityInfo.price} πόντοι / φορά</span>
                                <button className="bg-green-600 text-white hover:bg-green-700 duration-200 rounded-2xl py-1 px-8 whitespace-nowrap">
                                    Το κλείνω!
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full md:gap-16 gap-8 flex-row flex-wrap justify-center items-start pt-5 md:justify-between">
                        <div className="flex flex-col flex-1 gap-2" style={{minWidth: '20rem'}}>
                            <span className="font-semibold">Περιγραφή/Σχόλια Παρόχου:</span>
                            <textarea className="rounded-xl px-4 pt-2 text-sm outline-none" rows="8" style={{resize: 'none'}} value={activityInfo.description} readOnly/>
                        </div>
                        <div className="flex flex-col flex-1 gap-3 justify-center">
                            <ActivityLocationIndicator locationName={activityInfo.location.text} textAlign="text-start"/>
                            <div className="flex justify-center items-center p-12 h-64 bg-white" style={{minWidth: '20rem'}}>Map</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
