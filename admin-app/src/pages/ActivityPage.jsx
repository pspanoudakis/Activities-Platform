import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchActivity } from '../api/activitiesAPI'
import { ActivityImageSelector } from '../shared/ActivityImageSelector'
import { ActivityLocationIndicator } from '../shared/ActivityLocationIndicator'
import { SingleMarkerMap } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1"
import { ModalVerifyPrompt } from '../shared/ModalVerifyPrompt'
import { AppContext } from "../AppContext"
import { LoadingIndicator } from '../shared/LoadingIndicator'

const ACTIVITY_ACTIONS = {
    APPROVE: 'APPROVE',
    REJECT: 'REJECT'
}
const activityActionDispatcher = {
    [ACTIVITY_ACTIONS.APPROVE]: null,
    [ACTIVITY_ACTIONS.REJECT]: null
}
export function ActivityPage() {

    const params = useParams()

    const context = useContext(AppContext)

    const [activityInfo, setActivityInfo] = useState(null)

    const [loading, setLoading] = useState(true)

    function fetchContent() {
        setLoading(true)
        fetchActivity(params.activityId, (response) => {
            if (response.ok) {
                setActivityInfo({
                    ...response.data,
                    loaded: true
                })
            }
            else {
                setActivityInfo({
                    loaded: false
                })
            }
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchContent()
    }, [params.activityId])

    /* const verifyActionPrompt = (action) => {
        context.setState({
            ...context.state,
            showModal: true,
            modalProps: {
                content: <ModalVerifyPrompt
                            onVerify={action === ACTIVITY_ACTIONS.APPROVE ? approveActivity : rejectActivity}
                            text={
                                action === ACTIVITY_ACTIONS.APPROVE ?
                                "Είστε βέβαιοι ότι θέλετε να εγκρίνετε αυτή την δραστηριότητα?"
                                :
                                "Είστε βέβαιοι ότι θέλετε να απορρίψετε αυτή την δραστηριότητα?"
                            }
                        />
            }
        })
    } */
    
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
