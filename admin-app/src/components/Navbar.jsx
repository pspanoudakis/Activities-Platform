import React, { useContext } from 'react'
import { faHouse, faArrowRightFromBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../AppContext';
import { AdminNavbarButton } from './AdminNavbarButton'
import { FindUserForm } from './FindUserForm';
import { deleteJwt } from '../api/jwt';

export function Navbar() {

    const houseIcon = faHouse;
    const searchIcon = faMagnifyingGlass
    const exitIcon = faArrowRightFromBracket;

    const context = useContext(AppContext);
    return (
        <div className='flex w-full justify-center p-1'>
            <div className='flex flex-row text-white justify-between w-full'>
                <AdminNavbarButton icon={houseIcon} isLink={true} path="/" />
                <AdminNavbarButton
                    icon={searchIcon}
                    isLink={false}
                    callback={() => context.setState({
                        ...context.state,
                        showModal: true,
                        modalContent: <FindUserForm />
                })}/>
                <AdminNavbarButton
                    icon={exitIcon}
                    isLink={false}
                    callback={() => {
                        deleteJwt()
                        context.setState({
                            ...context.state,
                            user: null
                        })
                    }}
                />
            </div>
        </div>
    );
}
