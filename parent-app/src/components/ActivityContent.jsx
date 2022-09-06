import React, { useContext, useEffect, useMemo, useState } from "react";

import { AppContext } from '../AppContext'
import { dateText, dateTimeText, DAY_NAMES } from "../utils/dates";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { ActivityLocationIndicator } from "../shared/ActivityLocationIndicator";
import { ActivityRatingIndicator } from "./ActivityRatingIndicator";
import { ActivityReservationSelector } from "./ActivityReservationSelector";
import { ActivityRateSelector } from "./ActivityRateSelector";
import { ActivityImageSelector } from "../shared/ActivityImageSelector";
import { ModalVerifyPrompt } from "../shared/ModalVerifyPrompt";
import { ModalResultMessage } from "../shared/ModalResultMessage";
//import { SingleMarkerMap } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { SingleMarkerMap } from "../shared/Maps";
import { fetchActivity, fetchBookReservations } from "../api/activityAPI";
import { SignInForm } from "./SignInForm";

function sameDateTimes(d1, d2) {
    return d1.getHours() === d2.getHours() && d1.getMinutes() === d2.getMinutes()
}

function RepeatedActivityTimeline(dayTimes) {
    return (
        <>
        {
            dayTimes.map((times, d) => {
                if (times.length > 0) {
                    let sep = ''
                    
                    let dayStr = `${DAY_NAMES[d]}: `
                    times.forEach(dt => {
                        dayStr = dayStr.concat(`${sep}${dateTimeText(dt)}`)
                        sep = ', '
                    })
                    return (
                        <div key={d}>
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
    dayTimes,
    slots
}) {

    const startText = dateText(startDate)
    const endText = dateText(endDate)

    return (
        <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="font-semibold text-lg">Διεξαγωγή:</span>
            <div className="flex flex-col font-light">
            {
                repeated ?
                <>
                    <span className="font-medium">
                        {`${!startText || !endText ? 'Αυτή η δραστηριότητα δεν διεξάγεται προς το παρόν.' : `${dateText(startDate)} - ${dateText(endDate)}`}`}
                    </span>
                    {
                        RepeatedActivityTimeline(dayTimes)
                    }
                </>
                :
                <>
                    {
                        slots.length > 0 ?
                        slots.map((slot, idx) => {
                            return <span key={idx}>{`${DAY_NAMES[slot.date.getDay()]} ${dateText(slot.date)}, ${dateTimeText(slot.date)}`}</span>
                        })
                        :
                        <span>Αυτή η δραστηριότητα δεν διεξάγεται προς το παρόν.</span>
                    }
                </>
            }
            </div>
        </div>
    )
}

const initialState = {
    loaded: false,
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
}

export function ActivityContent({
    activityId
}) {

    const context = useContext(AppContext)

    const [activityInfo, setActivityInfo] = useState(initialState)

    const dayTimes = useMemo(() => {
        const map = []
        if (activityInfo.repeated) {
            Object.keys(DAY_NAMES).forEach(i => map.push([]))
        
            for (const slot of activityInfo.slots) {
                if ( !map[slot.date.getDay()].some(date => sameDateTimes(date, slot.date)) ) {
                    map[slot.date.getDay()].push(slot.date)
                }
            }
            for (const d in map) {
                map[d].sort()
            }
        }
        return map
    }, [activityInfo.slots, activityInfo.repeated])

    const [loading, setLoading] = useState(true)
    const [reservations, setReservations] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setTotalPrice(reservations.reduce((total, r) => {
            return total + (r.quantity)*activityInfo.price
        }, 0))
    }, [reservations, activityInfo.price])

    function fetchContent() {
        setLoading(true)
        window.scrollTo(0, 0)
        fetchActivity(activityId, (response) => {
            if (response.ok) {
                setActivityInfo({
                    ...response.data,
                    loaded: true
                })
            }
            else {
                setActivityInfo({
                    ...activityInfo.data,
                    loaded: false
                })
            }
            setLoading(false)
        })
    }

    function resetState() {
        setReservations([])
        setQuantity(1)
        setTotalPrice(0)
        fetchContent()
    }

    useEffect(() => {
        fetchContent()
    }, [activityId])

    const verifyPrompt = () => {
        if (context.state.userInfo) {
            context.setState({
                ...context.state,
                showModal: true,
                modalProps: {
                    content: <ModalVerifyPrompt
                                onVerify={bookReservations}
                                text="Είστε βέβαιοι ότι θέλετε να προχωρήσετε με τις επιλεγμένες κρατήσεις?"
                            />
                }
            })
        }
        else {
            context.setState({
                ...context.state,
                showModal: true,
                modalProps: {
                    bgColor: 'bg-cyan',
                    canScroll: true,
                    content: <SignInForm/>
                }
            })
        }
    }

    function bookReservations() {
        fetchBookReservations(reservations, (response) => {
            context.setState({
                ...context.state,
                userInfo: response.ok ? response.data : context.state.userInfo,
                showModal: true,
                modalProps: {
                    content: <ModalResultMessage
                                success={response.ok}
                                onVerify={bookReservations}
                                text={
                                    response.ok?
                                    "Οι κρατήσεις σας καταχωρήθηκαν επιτυχώς."
                                    :
                                    "Υπήρξε κάποιο πρόβλημα με την καταχώρηση των κρατήσεών σας. Προσπαθήστε ξανά."
                                }
                            />
                }
            })
            resetState()
        })
    }
    
    return (
        <div
            className="w-full flex flex-col gap-2 rounded-2xl bg-cyan relative justify-center py-6 px-2 md:px-10 flex-wrap"
            style={{minHeight: '25rem'}}
        >
            {
                loading ?
                <LoadingIndicator stretchParent={false}/>
                : (
                    activityInfo.loaded ?
                    <div className="flex flex-col gap-6 justify-center items-center">
                        <div className="flex flex-col gap-2 items-center">
                            <span className="font-semibold text-2xl tracking-tight">{activityInfo.name}</span>
                            <div className="flex flex-row gap-3 flex-wrap justify-center items-center">
                                <ActivityRatingIndicator
                                    ratingScore={activityInfo.rating}
                                    starSize="text-xl"
                                    textSize="text-md"
                                    starColor="text-yellow-500"
                                />
                                <button
                                    className="text-sm font-semibold bg-yellow-500 hover:bg-yellow-600 rounded-full px-4 py-1"
                                    onClick={() => {
                                        if (context.state.userInfo) {
                                            context.setState({
                                                ...context.state,
                                                showModal: true,
                                                modalProps: {
                                                    content: <ActivityRateSelector activityId={activityId}/>
                                                }
                                            })
                                        }
                                        else {
                                            context.setState({
                                                ...context.state,
                                                showModal: true,
                                                modalProps: {
                                                    bgColor: 'bg-cyan',
                                                    canScroll: true,
                                                    content: <SignInForm/>
                                                }
                                            })
                                        }
                                    }}
                                >
                                    Αξιολόγησέ το
                                </button>
                            </div>
                            <span className="tracking-tight">Πάροχος: {activityInfo.providerName}</span>
                        </div>
                        <div className="w-full flex flex-row gap-1 flex-wrap justify-center items-start">
                            <div className="flex flex-col">
                                <ActivityImageSelector images={activityInfo.images}/>
                                <div className="flex flex-col flex-1 gap-2 px-7" style={{minWidth: '20rem'}}>
                                    <span className="font-semibold">Περιγραφή/Σχόλια Παρόχου:</span>
                                    <textarea className="rounded-xl px-4 pt-2 text-sm outline-none" rows="10" style={{resize: 'none'}} value={activityInfo.description} readOnly/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 p-3">
                                <ActivityTimelineInfo
                                    repeated={activityInfo.repeated}
                                    startDate={activityInfo.startDate}
                                    endDate={activityInfo.endDate}
                                    slots={activityInfo.slots}
                                    dayTimes={dayTimes}
                                />
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <span className="font-semibold text-lg">{activityInfo.price} πόντοι / φορά</span>
                                    {
                                        reservations.length > 0 ?
                                        <button
                                            onClick={verifyPrompt}
                                            className="bg-green-600 text-white text-lg hover:bg-green-700 rounded-2xl py-2 px-8 whitespace-nowrap"
                                        >
                                            {`Αγορά για ${totalPrice} πόντους`}
                                        </button>
                                        :
                                        <button
                                            disabled
                                            className="bg-green-600/70 text-white text-lg rounded-2xl py-2 px-8"
                                        >
                                            Αγορά
                                        </button>
                                    }
                                </div>
                                <ActivityReservationSelector
                                    id="reservation-selector"
                                    activityInfo={activityInfo}
                                    reservations={reservations}
                                    updateReservations={setReservations}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col flex-1 gap-3 justify-center items-center">
                            <ActivityLocationIndicator locationName={activityInfo.location.address} textAlign="text-start"/>
                            <SingleMarkerMap
                                position={{
                                    "lat": activityInfo.location.latitude,
                                    "lng": activityInfo.location.longitude
                                }}
                                style={{width: '100%', height: '20rem'}}
                            />
                        </div>
                    </div>
                    :
                    <span className="font-light text-lg text-center">Η δραστηριότητα δεν βρέθηκε.</span>
                )

            }
        </div>
    )
}
