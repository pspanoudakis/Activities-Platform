import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ActivityLocationIndicator({
    locationName,
    textAlign
}) {
    return (
        <span className={`font-light ${textAlign ?? ''}`}>
            <FontAwesomeIcon icon={faLocationDot} size="xl" style={{paddingRight: ".5rem"}}/>
            {locationName}
        </span>
    )
}
