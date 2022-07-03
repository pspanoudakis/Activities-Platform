import { APIResponse, fetchWrapper, RESPONSE_STATUS } from "./fetchAPI"

// This is what `ActivityContent` expects
const activity = {
    name: 'Ποδόσφαιρο 5x5',
    providerName: 'Νίκος Παπαδόπουλος',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\nUllam, sapiente nobis ipsa est eius unde, aliquid iusto saepe nostrum architecto rem quis consequuntur eaque reiciendis ipsam.\nIpsa odio commodi ullam?',
    price: 26,
    images: [
        "http://fairplay5x5.gr/wp-content/uploads/2015/09/slide1.jpg",
        "https://elclasico.gr/wp-content/uploads/2017/12/5x5-podosfairo.jpg",
        "https://i.redd.it/cjkz6lpzmprx.jpg",
        "https://www.pixelstalk.net/wp-content/uploads/2016/06/High-Res-Backgrounds-Free-Download.jpg"
    ],
    rating: 3.8,
    repeated: true,
    location: {
        address: '28ης Οκτωβρίου 7, Δροσιά',
        latitude: 38.11987459663194,
        longitude: 23.866071050478975
    },
    ageCategory: 'Προσχολική (0-5)',
    startDate: new Date(2022, 5, 1),
    endDate: new Date(2022, 6, 1),
    //endDate: new Date(2023, 5, 31),
    slots: [...Array(7).keys()].reduce((acc, i) => {
        if (i % 2 === 0) {
            //console.log(i)
            let daySlots = []

            if (i % 3 !== 0) {
                daySlots = [
                    {
                        id: `slot${i}_0`,
                        date: new Date(2022, 5, i + 1, 14, 30, 0)
                    },
                    {
                        id: `slot${i}_1`,
                        date: new Date(2022, 5, i + 1, 18, 15, 0)
                    }
                ]
            }
            else {
                daySlots = [
                    {
                        id: `slot${i}`,
                        date: new Date(2022, 5, i + 1, 16, 30, 0)
                    }
                ]
            }
            return [...acc, ...daySlots]
        }
        return acc
    }, [])
}

function getDateFromResponseSlot(slot) {
    let year, month, day;
    
    if (slot.day instanceof Array) {
        [year, month, day] = slot.day
    }
    else if (typeof slot.day === 'string') {
        [year, month, day] = slot.day.split('-').map(s => parseInt(s))
    }
    else {
        throw new Error('Unexpected Slot Date instance type')
    }

    const [hours, minutes] = slot.time.split(':').map(s => parseInt(s))

    return new Date(year, month - 1, day, hours, minutes, 0)
}
function reshapeActivityContent(activityResponse) {
    console.log(activityResponse)
    const activity = {
        name: activityResponse.name,
        providerName: activityResponse.seller_name,
        description: activityResponse.description,
        price: activityResponse.cost,
        images: activityResponse.images,

        // Backend needs to send these too
        rating: Math.round(activityResponse.rating * 10) / 10,
        repeated: activityResponse.periodic,

        location: {
            address: activityResponse.address,
            latitude: activityResponse.latitude,
            longitude: activityResponse.longitude
        }
    }

    let startDate;
    let endDate;
    let slots = [];

    if (activityResponse.days.length > 0) {
        startDate = getDateFromResponseSlot(activityResponse.days[0])
        endDate = startDate
        slots.push({
            id: activityResponse.days[0].id,
            date: startDate
        })

        for (let i = 1; i < activityResponse.days.length; i++) {
            const slot = activityResponse.days[i];
            const slotDate = getDateFromResponseSlot(slot)

            if (startDate.getTime() > slotDate.getTime()) {
                startDate = slotDate
            }
            else if (slotDate.getTime() > endDate.getTime()) {
                endDate = slotDate
            }

            slots.push({
                id: slot.id,
                date: slotDate
            })
        }
        console.log(slots)
    }

    activity.startDate = startDate
    activity.endDate = endDate
    activity.slots = slots

    return activity
}

export function fetchActivity(activityId, callback) {
    
    fetchWrapper({
        endpoint: `search/activity/${activityId}`,
        method: 'GET',
        omitAuthHeader: true,
        needAuth: false,
        callback: (response) => {
            if (response.ok) {
                callback(new APIResponse(reshapeActivityContent(response.data), true, RESPONSE_STATUS.OK))
            }
            else {
                callback(new APIResponse(null, false, -1))
            }
        }
    })
}

export function submitActivityReview(activityId, rate, text, callback) {
    fetchWrapper({
        endpoint: `parent/evaluate/${activityId}`,
        method: 'POST',
        body: {
            "rating": rate,
            "comment": text
        },
        omitAuthHeader: false,
        needAuth: false,
        callback: (response) => {
            if (response.ok) {
                callback(new APIResponse(null, true, RESPONSE_STATUS.OK))
            }
            else {
                callback(new APIResponse(null, false, -1))
            }
        }
    })
}

export function fetchBookReservations(reservations, callback) {

    const days = []

    for (const reservation of reservations) {
        days.push({
            "aad_id": reservation.slot.id,
            "number": reservation.quantity
        })
    }
    fetchWrapper({
        endpoint: 'parent/reservation',
        method: 'POST',
        body: days,
        omitAuthHeader: false,
        needAuth: false,
        callback: (response) => {
            if (response.ok) {
                callback(new APIResponse(response.data, true, RESPONSE_STATUS.OK))
            }
            else {
                callback(new APIResponse(response.data, false, -1))
            }
        }
    })
}
