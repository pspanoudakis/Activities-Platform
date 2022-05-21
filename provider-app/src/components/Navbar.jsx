import React, { useContext } from 'react'
import { faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

//import { Link, } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { AdminNavbarButton } from './AdminNavbarButton'

export function Navbar() {

    const houseIcon = faHouse;
    const exitIcon = faArrowRightFromBracket;

    const context = useContext(AppContext);
    return (
        <div className='flex w-full justify-center p-1'>
            <div className='flex flex-row text-white justify-between w-full'>
                <AdminNavbarButton icon={houseIcon} callback={() => context.state.navigate("/")}/>
                <AdminNavbarButton icon={exitIcon} callback={() => context.state.navigate("/users")}/>
            </div>
        </div>
    );
}
