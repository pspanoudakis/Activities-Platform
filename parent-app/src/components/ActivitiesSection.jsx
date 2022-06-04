import React, { useEffect, useState } from "react";

import { LoadingIndicator } from "../shared/LoadingIndicator";
import { SectionTitle } from "../shared/SectionTitle";
import { ActivitySectionPageButton } from "./ActivitySectionPageButton";

const TOTAL_ACTIVITIES = 9
const PAGE_SIZE = 3

export function ActivitiesSection({
    showBg,
    title,
    fetchData,
    TileRenderer
}) {

    const [activities, setActivities] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData(TOTAL_ACTIVITIES, (response) => {
            if (response.ok) {
                setActivities(response.results)
            }
            else {
                console.error(response)
            }
            setLoading(false)
        })
    }, [])

    return (
        <div className="flex flex-col w-full h-max gap-4 pt-3">
            <SectionTitle>
                {title}
            </SectionTitle>
            <div
                className={`flex flex-row justify-center gap-4 w-full rounded-xl ${showBg ? 'bg-cyan' : ''} p-4 items-center relative`}
                style={{
                    minHeight: '15rem'
                }}
            >
                {
                    loading ?
                    <LoadingIndicator stretchParent={false}/>
                    :
                    <>
                        <ActivitySectionPageButton
                            direction="left"
                            disabled={page === 0}
                            switchPage={() => setPage(page - 1)}
                        />
                        {
                            activities.slice(page*PAGE_SIZE, Math.min(page*PAGE_SIZE + PAGE_SIZE, activities.length))
                                        .map((a, i) => <TileRenderer activityInfo={a} key={i}/>)
                        }
                        <ActivitySectionPageButton
                            direction="right"
                            disabled={page === (TOTAL_ACTIVITIES / PAGE_SIZE) - 1}
                            switchPage={() => setPage(page + 1)}
                        />
                        {/* {
                            loading ?
                            <LoadingIndicator stretchParent={true}/>
                            :
                            null
                        } */}
                    </>
                }
            </div>
        </div>
    )
}
