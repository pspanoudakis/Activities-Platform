const ADD_DELAY = true
const DELAY_MILISECS = 1000

export function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function runWithDelay(callback) {
    if (ADD_DELAY) {
        delay(DELAY_MILISECS).then(() => callback())
    }
    else {
        callback()
    }
}

export function fetchRecommendedActivities(n, callback) {
    const results = [...Array(n).keys()].map((_, i) => {

        (new Image()).src = `img${i}`

        return {
            imgSrc: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1000&h=-1&s=1`,
            name: `Activity${i}`,
            rating: 3.9,
            locationName: `Κυκλαμίνων 48, Άνοιξη Αττικής`,
            price: 100
        }
    })
    runWithDelay(() => callback({ok: true, results: results}))
}

export function fetchUpcomingActivities(n, callback) {
    const results = [...Array(n).keys()].map((_, i) => {

        (new Image()).src = `img${i}`

        return {
            imgSrc: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1000&h=-1&s=1`,
            name: `Activity${i}`,
            locationName: `Κυκλαμίνων 48, Άνοιξη Αττικής`,
            nextDate: `11/4/22 14:00`
        }
    })
    runWithDelay(() => callback({ok: true, results: results}))
}

export function fetchRebookActivities(n, callback) {
    fetchRecommendedActivities(n, callback)
}

export function fetchActivity(activityId, callback) {
    const activity = {
        name: 'Ποδόσφαιρο 5x5',
        providerName: 'Νίκος Παπαδόπουλος',
        images: [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1000&h=-1&s=1",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1000&h=-1&s=1"
        ],
        rating: 3.8,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\nUllam, sapiente nobis ipsa est eius unde, aliquid iusto saepe nostrum architecto rem quis consequuntur eaque reiciendis ipsam.\nIpsa odio commodi ullam?',
        location: {
            longitude: 0,
            latitude: 0,
            text: 'Αθηνάς 6, Αττική'
        },
        ageCategory: 'Προσχολική (0-5)',
        price: 26,
        repeated: true,
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
                            id: `slot${i}`,
                            date: new Date(2022, 5, i + 1, 14, 30, 0)
                        },
                        {
                            id: `slot${i}`,
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

    runWithDelay(() => callback({
        activity,
        ok: true
    }))
}
