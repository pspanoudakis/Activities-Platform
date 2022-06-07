import { useContext } from "react";
import { AppContext } from "../AppContext";

export function ActivityRateSelector({
    activityId
}) {
    
    // get userId & close modal from here
    const context = useContext(AppContext)

    return (
        <div>Rate Here</div>
    )
}
