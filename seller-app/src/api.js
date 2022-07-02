
export function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function fetchActionBarData(callback) {
    delay(100).then(() => 
        callback({
        ok:true,
        data:{
            imgUrl: ''
        }
        })
    )
}

export function fetchHomePageData(callback) {
    delay(100).then(() => 
        callback({
        ok:true,
        data:{
            totalActivities: 15,
            totalFacilities: 12,
            bookings: [...Array(6).keys()].map(i => {
                return {
                    activity: `Δραστηριότητα${i}`,
                    dateBook: '05/06/2022',
                    dateOn: '05/06/2022',
                    seats: `${i}`,
                    user: `χρήστης${i}`,
                    cost: '1000'
                }
            }),
            reviews: [...Array(5).keys()].map(i => {
                return {
                    activity: 'Δραστηριότητα',
                    user: 'Χρήστης',
                    rating: '3',
                    comment: 'Αυτή είναι μια κριτική.'
                }
            })
        }
        })
    )
}

export function fetchProfilePageData(callback) {
    delay(100).then(() => 
        callback({
        ok:true,
        data:{
            username: 'user1204153',
            email: 'user1204@mail.com',
            totalPoints: '15890',
            bankAccounts: [...Array(6).keys()].map(i => {
                return {
                    iban: `iban${i}`,
                    number: `αριθμός${i}`,
                    cardNumber: `αριθμός κάρτας${i}`,
                    isSelected: false
                }
            })
        }
        })
    )
}

export function fetchActivitiesPageData(callback) {
    delay(100).then(() => 
        callback({
        ok:true,
        data:{
            activities: [...Array(6).keys()].map(i => {
                return {
                    imgUrl: '',
                    title: `Δραστηριότητα ${i}`,
                    date: '10/05/2022',
                    state: 'διαθέσιμη',
                    facility: 'ΟΑΚΑ',
                    bookCount: '100'
                }
            })
        }
        })
    )
}

export function fetchActivityPageData(activityId, callback) {
    delay(100).then(() => 
        callback({
        ok:true,
        data:{
            imgUrl: '',
            title: 'Δραστηριότητα',
            category: 'Άθληση',
            price: '1000',
            facility: 'ΟΑΚΑ',
            age: '10+',
            cancelRate: '5%',
            cancelCount: '1',
            bookCount: '12',
            seats: '20',
            avgScore: '4.5',
            description: 'Αυτή είναι μία περιγραφή.',
            reviews: [...Array(10).keys()].map(i => {
                return {
                    activity: '05/02/2022',
                    user: `Χρήστης ${i}`,
                    rating: '3/5',
                    comment: 'Αυτή είναι μία κριτική.'
                }
            }),
            earnings: '12000',
            occurence: 'Περιοδικά',
            dates: [...Array(16).keys()].map(i => {
                return {
                    date: '05/02/2022',
                    time: '12:30'
                }
            })
        }
        })
    )
}

export function fetchFacilitiesPageData(callback) {
    delay(100).then(() => 
        callback({
        ok:true,
        data:{
            facilities: [...Array(6).keys()].map(i => {
                return {
                    title: `Υποδομή ${i}`,
                    street: '10/05/2022',
                    postalCode: 'Διαθέσιμη',
                    location: 'Μαρούσι',
                    activityCount: '2'
                }
            })
        }
        })
    )
}

export function fetchStatisticsPageData(callback) {
    delay(100).then(() => 
        callback({
        ok:true,
        data:{
            popular: [...Array(6).keys()].map(i => {
                return {
                    title: `Δραστηριότητα ${i}`,
                    bookCount: '10',
                    earnings: '1000',
                }
            })
        }
        })
    )
}

export function sendProfileData(data) {
    console.log('Sent data: '+ data.username);
    console.log('Sent data: '+ data.email);
}

export function sendWatermarkData(data) {
    console.log('Sent data: '+ data.watermark);
}

export function onRedeem(data) {
    console.log('Sent data: '+ data.redeemPoints)
}

export function sendActivityData(data) {
    console.log('Sent data: '+ data.name);
    console.log('Sent data: '+ data.category);
    console.log('Sent data: '+ data.price);
    console.log('Sent data: '+ data.age);
    console.log('Sent data: '+ data.seats);
    console.log('Sent data: '+ data.facility);
    console.log('Sent data: '+ data.description);
}

export function sendFacilityData(data) {
    console.log('Sent data: '+ data.name);
    console.log('Sent data: '+ data.street);
    console.log('Sent data: '+ data.number);
    console.log('Sent data: '+ data.postalCode);
    console.log('Sent data: '+ data.location);
}

export function sendRemovedAccountIdx(idx) {
    console.log('Removed bank account with id = '+ idx)
}
