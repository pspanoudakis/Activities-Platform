const dummyUsers = {
    0: {
        username: 'nick_pap',
        role: 'parent',
        isLocked: false,
        latestBookings: [
            {
                service: 'Ποδόσφαιρο 5x5',
                provider: 'chris_pap',
                data: '21/2/22 14:31',
                value: 15
            },
            {
                service: 'Ποδόσφαιρο 5x5',
                provider: 'chris_pap',
                data: '21/2/22 14:31',
                value: 15
            },
            {
                service: 'Ποδόσφαιρο 5x5',
                provider: 'chris_pap',
                data: '21/2/22 14:31',
                value: 15
            }
        ]
    },
    1: {
        username: 'ben_pap',
        role: 'parent',
        isLocked: false,
        latestBookings: [
            {
                service: 'Μπάσκετ 3x3',
                provider: 'john_pap',
                data: '22/1/21 14:32',
                value: 20
            },
            {
                service: 'Μπάσκετ 3x3',
                provider: 'john_pap',
                data: '22/1/21 14:32',
                value: 20
            }
        ]
    },
    2: {
        username: 'mike_pap',
        role: 'parent',
        isLocked: true,
        latestBookings: [
            {
                service: 'Υδατοσφαίριση',
                provider: 'jim_pap',
                data: '2/2/22 12:31',
                value: 100
            },
            {
                service: 'Υδατοσφαίριση',
                provider: 'jim_pap',
                data: '2/2/22 12:31',
                value: 100
            },
            {
                service: 'Υδατοσφαίριση',
                provider: 'jim_pap',
                data: '2/2/22 12:31',
                value: 100
            },
            {
                service: 'Υδατοσφαίριση',
                provider: 'jim_pap',
                data: '2/2/22 12:31',
                value: 100
            }
        ]
    }
}

const dummyActivity = {
    name: 'Ποδόσφαιρο 5x5',
    providerName: 'chris_pap'
}

export const __users__ = [...Array(35).keys()].map((_, i) => {
    return {
        username: `${dummyUsers[0].username}_${i}`,
        role: i % 2 === 0 ? 'provider' : (i % 3 === 0 ? 'admin' : 'parent'),
        isLocked: i % 2 === 0,
        latestBookings: []
    }
})

if (!localStorage.getItem("__users__")) {
    localStorage.setItem("__users__", JSON.stringify(__users__))
}

export const PENDING_ACTIVITY = 'pending_activity'
export const APPROVED_ACTIVITY = 'approved_activity'
export const __activities__ = [...Array(15).keys()].map((_, i) => {
    return {
        id: i,
        name: `${dummyActivity.name}_${i}`,
        providerName: `${dummyActivity.providerName}_${i}`,
        status: PENDING_ACTIVITY
    }
})

if (!localStorage.getItem("__activities__")) {
    localStorage.setItem("__activities__", JSON.stringify(__activities__))
}
