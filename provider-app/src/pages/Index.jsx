import React, { useContext, useState } from 'react'

import { faMagnifyingGlass, faUserPlus, faClipboardList, faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { AdminPageButton } from '../components/AdminPageButton'
import { AppContext } from '../AppContext';

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
                    title="Αναζήτηση Χρήστη"
                    icon={searchIcon}
                    callback={() => context.setState({
                        ...context.state,
                        showModal: true,
                        modalContent: <div>Hellosdkldslksdklsdlkdsklsdlsdlsd</div>
                    })}
                />
                <AdminPageButton title="Εισαγωγή Χρήστη" icon={addUserIcon} callback={() => null}/>
                <AdminPageButton title="Στατιστικά Πλατφόρμας" icon={statsIcon} callback={() => null}/>
                <AdminPageButton title="Έγκριση Δραστηριοτήτων" icon={approveIcon} callback={() => null}/>
            </div>
        </>
    )
}
