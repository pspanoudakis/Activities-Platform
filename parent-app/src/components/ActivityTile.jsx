import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { ContentTile } from "./ContentTile";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { ActivityLocationIndicator } from "../shared/ActivityLocationIndicator";
import { PLACEHOLDER_ACTIVITY_IMG } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { useHasMaxWidth } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { MD_PXLIMIT, SM_PXLIMIT } from "../utils/deviceConstants";

export function ActivityTile({
    activityId,
    activityName,
    locationName,
    imgSrc,
    children
}) {
    const [usedImgSrc, setUsedImgSrc] = useState(imgSrc)
    const [loading, setLoading] = useState(true)
    const loadedImgObj = useRef(null)

    const mdDevice = useHasMaxWidth(MD_PXLIMIT)
    const smDevice = useHasMaxWidth(SM_PXLIMIT)

    useEffect(() => {
        setUsedImgSrc(imgSrc)
    }, [imgSrc])

    useEffect(() => {

        if (usedImgSrc !== PLACEHOLDER_ACTIVITY_IMG) {
            const imgObj = new Image()
            imgObj.src = usedImgSrc

            imgObj.onload = () => setLoading(false)
            imgObj.onerror = () => {
                loadedImgObj.current = imgObj
                setUsedImgSrc(PLACEHOLDER_ACTIVITY_IMG)
            }
        }
        else {
            setLoading(false)
        }
    }, [usedImgSrc])

    return (
        <Link to={`/activities/${activityId}`}>
            <ContentTile
                padding="p-4"
                bgColor="bg-white"
                stretch={false}
                dimensions="max-w-xs"
                classExtra="hover:bg-xlight-cyan shadow-md hover:shadow-lg duration-200"
            >
                <div className="flex flex-col gap-3 items-center text-center">
                    <div
                        className="flex justify-center items-center"
                        style={{
                            height: '10rem',
                            width: `${smDevice ? '45vw' : (mdDevice ? '30vw' : 'min(20rem, 20vw)')}`
                        }}    
                    >
                    {
                        loading ?
                        <LoadingIndicator
                            customColor='transparent'
                            stretchParent={false}
                            text=""
                        />
                        :
                        <img
                            src={usedImgSrc}
                            alt={usedImgSrc}
                            className="rounded-3xl"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%'
                            }}
                        />
                    }
                    </div>
                    <span className="text-lg font-medium">{activityName}</span>
                    <ActivityLocationIndicator locationName={locationName} />
                    {children}
                </div>
            </ContentTile>
        </Link>
    )
}
