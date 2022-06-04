import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ActivityLocationIndicator({
    locationName
}) {
    return (
        <span className="font-light text-center">
            <FontAwesomeIcon icon={faLocationDot} size="xl" style={{paddingRight: ".5rem"}}/>
            {locationName}
        </span>
    )
}
