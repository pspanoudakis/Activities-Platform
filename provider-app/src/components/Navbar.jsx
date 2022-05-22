import React, { useContext } from 'react'
import { faHouse, faArrowRightFromBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

//import { Link, } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { AdminNavbarButton } from './AdminNavbarButton'
import { FindUserForm } from './FindUserForm';

export function Navbar() {

    const houseIcon = faHouse;
    const searchIcon = faMagnifyingGlass
    const exitIcon = faArrowRightFromBracket;

    const context = useContext(AppContext);
    return (
        <div className='flex w-full justify-center p-1'>
            <div className='flex flex-row text-white justify-between w-full'>
                <AdminNavbarButton icon={houseIcon} callback={() => context.state.navigate("/")}/>
                <AdminNavbarButton
                    icon={searchIcon}
                    callback={() => context.setState({
                        ...context.state,
                        showModal: true,
                        modalContent: <FindUserForm />
                })}/>
                <AdminNavbarButton icon={exitIcon} callback={() => context.state.navigate("/users")}/>
            </div>
        </div>
    );
}
