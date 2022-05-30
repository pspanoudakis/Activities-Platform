import React, { useContext } from 'react'

import { faMagnifyingGlass, faUserPlus, faClipboardList, faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { AdminPageButton } from '../components/AdminPageButton'
import { AppContext } from '../AppContext';
import { FindUserForm } from '../components/FindUserForm';

export function Index() {

    const context = useContext(AppContext);

    const searchIcon = faMagnifyingGlass;
    const addUserIcon = faUserPlus;
    const statsIcon = faChartColumn;
    const approveIcon = faClipboardList;
    
    return (
        <>
            <div className='md:w-8/12 sm:w-10/12 h-full flex flex-wrap content-center basis-2/5 gap-4'>
                <AdminPageButton
                    isLink={false}
                    title="Αναζήτηση Χρήστη"
                    icon={searchIcon}
                    callback={() => context.setState({
                        ...context.state,
                        showModal: true,
                        modalContent: <FindUserForm/>
                    })}
                />
                <AdminPageButton
                    isLink={true}
                    title="Δημιουργία Χρήστη"
                    icon={addUserIcon}
                    path="/newUser"
                />
                <AdminPageButton
                    isLink={true}
                    title="Στατιστικά Πλατφόρμας"
                    icon={statsIcon}
                    path="/platformStats"
                />
                <AdminPageButton
                    isLink={true}
                    title="Έγκριση Δραστηριοτήτων"
                    icon={approveIcon}
                    path="/pendingActivities"
                />
            </div>
        </>
    )
}
