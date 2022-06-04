import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ActivityDateIndicator({
    date,
    text
}) {
    return (
        <span className="font-light">
            <FontAwesomeIcon icon={faCalendar} size="xl" style={{paddingRight: ".5rem"}}/>
            {text ? text : null}{date}
        </span>
    )
}
