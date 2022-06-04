import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ActivityDateIndicator({
    date
}) {
    return (
        <span className="font-light text-center">
            <FontAwesomeIcon icon={faCalendar} size="xl" style={{paddingRight: ".5rem"}}/>
            {date}
        </span>
    )
}
