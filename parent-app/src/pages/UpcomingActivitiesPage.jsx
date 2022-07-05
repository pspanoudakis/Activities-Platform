import React, { useContext, useEffect, useState } from "react";
import { fetchAllUpcomingActivities } from "../api/profileAPI";
import { AppContext } from "../AppContext";
import { NeedSignIn } from "../components/NeedSignIn";
import { SectionTitle } from "../shared/SectionTitle";
import { PageSelector } from "../shared/PaginatedTable";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { UpcomingActivityResultTile } from "../components/UpcomingActivityResultTile";
import { PLACEHOLDER_ACTIVITY_IMG } from "../utils/placeholders";

const PAGE_SIZE = 4
export function UpcomingActivitiesPage() {
    const context = useContext(AppContext)

    const [loading, setLoading] = useState(true)

    const [activities, setActivities] =  useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(-1)

    useEffect(() => {
        setLoading(true)
        fetchAllUpcomingActivities(currentPage + 1, PAGE_SIZE, (response) => {
            if (response.ok) {
                setTotalPages(response.data.total_pages)
                setActivities(response.data.page)
                setLoading(false)
            }
        })
    }, [currentPage])

    return (
        context.state.userInfo ?
        <div className="flex flex-col gap-3 pt-5">
            <SectionTitle>
                Επερχόμενες Δραστηριότητες
            </SectionTitle>
            <div className="py-3 flex flex-col justify-start items-center relative gap-6" style={{minHeight: '15rem'}}>
            {
                activities.length === 0 ?
                (
                    loading ?
                    <LoadingIndicator customColor="bg-xlight-cyan/80"/>
                    :
                    <span className="text-center font-light text-lg">
                        Οι Δραστηριότητές σας που πρόκειται να διεξαχθούν θα εμφανίζονται εδώ.
                    </span>
                )
                :
                <>
                <PageSelector
                    canNextPage={currentPage < totalPages - 1}
                    canPreviousPage={currentPage > 0}
                    currentPage={currentPage}
                    gotoPage={(newPage) => setCurrentPage(newPage)}
                    previousPage={() => setCurrentPage(currentPage - 1)}
                    nextPage={() => setCurrentPage(currentPage + 1)}
                    totalPages={totalPages}
                />
                <div className="flex flex-col gap-3">
                {
                    activities.map((a, i) => {
                        return (
                            <UpcomingActivityResultTile
                                key={i}
                                activityInfo={{
                                    activityId: a.id,
                                    name: a.name,
                                    address: a.address,
                                    date: `${a.day}, ${a.time}`,
                                    images: [i % 2 ? PLACEHOLDER_ACTIVITY_IMG : 'https://secure.toolkitfiles.co.uk/clients/40147/siteimages/hires/c700x420.jpg']
                                }}
                            />
                        )
                    })
                }
                </div>
                {
                    loading ?
                    <LoadingIndicator stretchParent={true}/>
                    :
                    null
                }                
                </>
            }
            </div>
        </div>
        :
        <NeedSignIn/>
    )   
}
