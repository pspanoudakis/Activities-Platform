import { TileButton } from './TileButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function AdminNavbarButton(props) {

    const color = 'bg-cyan';
    const hoverColor = 'hover:bg-dark-cyan';
    return (
        <TileButton
            path={props.path}
            stretch={false}
            bgColor={color}
            hoverColor={hoverColor}
            fontColor="text-white"
            padding="py-2 px-4"
            isLink={props.isLink}
            callback={props.callback}
        >
            <div className="flex flex-col white">
                <FontAwesomeIcon icon={props.icon} size="2x"/>
            </div>
        </TileButton>        
    )
}
