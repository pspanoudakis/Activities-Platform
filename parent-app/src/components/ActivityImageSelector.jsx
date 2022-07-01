import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { SwitchPageSideButton } from "./SwitchPageSideButton";

const PLACEHOLDER_IMG = 'https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png'
export function ActivityImageSelector({
    images
}) {
    const [nextImageIdx, setNextImageIdx] = useState(0)
    const [{loading, currentImageIdx, cachedImages}, setState] = useState({
        loading: true,
        currentImageIdx: -1,
        cachedImages: [...Array(images.length).keys()].map(_ => null)
    })

    useEffect(() => {
        if (images.length > 0) {
            if (nextImageIdx !== 0 && !cachedImages[nextImageIdx]) {
                setState({
                    cachedImages,
                    currentImageIdx,
                    loading: true
                })
            }
            else {
                setState({
                    cachedImages,
                    loading,
                    currentImageIdx: nextImageIdx
                })
            }
        }
        else {
            const placeholderImg = new Image()
            placeholderImg.src = PLACEHOLDER_IMG
            setState({
                cachedImages: [placeholderImg],
                currentImageIdx: 0,
                loading: false
            })
        }
    }, [nextImageIdx, images.length])

    useEffect(() => {
        if (loading && images.length > 0) {
            const imgObj = new Image()
            imgObj.src = images[nextImageIdx]
            imgObj.onload = () => {
                setState({
                    cachedImages: cachedImages.map((c, i) => {
                        if (i === nextImageIdx) {                            
                            return imgObj
                        }
                        return c
                    }),
                    loading: false,
                    currentImageIdx: nextImageIdx,
                })
            }
        }
    }, [loading, images])

    return (
        <div className="flex flex-row justify-between items-center relative gap-1" style={{height: '20rem', minWidth: '20rem'}}>
            <SwitchPageSideButton
                direction="left"
                disabled={currentImageIdx === 0}
                switchPage={() => setNextImageIdx(nextImageIdx - 1)}
            />
            {
                currentImageIdx >= 0 ?
                <img src={images[currentImageIdx] ?? PLACEHOLDER_IMG} alt="" className="rounded-2xl max-w-xs sm:max-w-sm"/>
                :
                null
            }
            <SwitchPageSideButton
                direction="right"
                disabled={currentImageIdx === images.length - 1 || images.length === 0}
                switchPage={() => setNextImageIdx(nextImageIdx + 1)}
            />
            {
                loading ?
                <LoadingIndicator stretchParent={true} customColor="bg-cyan/80"/>
                :
                null
            }
        </div>
    )
}
