import React from 'react';
import { SpinnerCircular } from 'spinners-react';

export function LoadingIndicator({ stretchParent }) {

    return (
        <div
            className={ stretchParent ?
                "absolute top-0 right-0 w-full h-full flex justify-center items-center flex-col gap-2 bg-xlight-cyan/80"
                :
                "flex justify-center items-center flex-col gap-3 p-4"
            }
        >
            <SpinnerCircular size={60} thickness={200} color="#D1E8E8" secondaryColor="rgba(205,205,205)"/>
            <span className="text-2xl font-thin">
                Φόρτωση...
            </span>
        </div>
    )
}
