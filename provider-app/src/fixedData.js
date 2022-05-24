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

export const __users__ = [...Array(50).keys()].map((_, i) => {
    return {
        username: `${dummyUsers[0].username}_${i}`,
        role: i % 2 === 0 ? 'seller' : (i % 3 === 0 ? 'admin' : 'parent'),
        isLocked: i % 2 === 0,
        latestBookings: []
    }
})
