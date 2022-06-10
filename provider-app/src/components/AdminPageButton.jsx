import { TileButton } from './TileButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function AdminPageButton(props) {

    const color = 'bg-cyan';
    const hoverColor = 'hover:bg-dark-cyan';
    return (
        <TileButton
            path={props.path}
            stretch={true}
            bgColor={color}
            hoverColor={hoverColor}
            fontColor="text-white"
            padding="py-8 px-4"
            isLink={props.isLink}
            callback={props.callback}
        >
            <div className="flex flex-col white gap-2">
                <FontAwesomeIcon icon={props.icon} size="6x"/>
                <span className='text-black whitespace-nowrap text-2xl font-light text-center'>
                    { props.title }
                </span>
            </div>
        </TileButton>        
    )
}
