import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { LoadingIndicator } from "../shared/LoadingIndicator";
import { SectionTitle } from "../shared/SectionTitle";
import { RecommendedActivityTile } from "./RecommendedActivityTile";
import { ActivitySectionPageButton } from "./ActivitySectionPageButton";

const TOTAL_ACTIVITIES = 9
const PAGE_SIZE = 3

export function ActivitiesSection({
    title
    //fetchData,
    //renderTile,
}) {

    const [activities, setActivities] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setActivities(
                [...Array(TOTAL_ACTIVITIES).keys()].map((_, i) => {

                    (new Image()).src = `img${i}`

                    return {
                        imgSrc: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1000&h=-1&s=1`,
                        name: `Activity${i}`,
                        rating: 3.9,
                        location: `Κυκλαμίνων 48, Άνοιξη Αττικής`,
                        price: 100
                    }
                })
            )
            setLoading(false)
        }, 1200)
    }, [])

    return (
        <div className="flex flex-col w-full h-max gap-4">
            <SectionTitle>
                {title}
            </SectionTitle>
            <div
                className="flex flex-row justify-center gap-4 w-full rounded-xl bg-cyan p-4 items-center relative"
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
                                        .map((a, i) => 
                                            <RecommendedActivityTile
                                                key={i}
                                                imgSrc={a.imgSrc}
                                                name={a.name}
                                                locationName={a.location}
                                                rating={a.rating}
                                                price={a.price}
                                            />
                                        )
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
