export const USER_ROLE = {
    PARENT: 'ROLE_PARENT',
    SELLER: 'ROLE_SELLER',
    ADMIN: 'ROLE_ADMIN',
}

export const roleText = {
    [USER_ROLE.PARENT]: <div>Γονέας</div>,
    [USER_ROLE.SELLER]: <div>Πάροχος</div>,
    [USER_ROLE.ADMIN]: <div className='text-blue-700 font-semibold'>Διαχειριστής</div>
}

export const USER_STATUS = {
    ACTIVE: 'active',
    BLOCKED: 'blocked'
}

export const statusText = {
    [USER_STATUS.ACTIVE]: <div className='text-green-700 font-semibold'>Ενεργός</div>,
    [USER_STATUS.BLOCKED]: <div className='text-red-700 font-semibold'>Ανεσταλμένος</div>
}

export const isStatusActive = status => status === USER_STATUS.ACTIVE
export const toggleStatus = status => isStatusActive(status) ? USER_STATUS.BLOCKED : USER_STATUS.ACTIVE
