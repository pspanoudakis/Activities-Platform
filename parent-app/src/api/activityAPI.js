import { GoogleUtils } from "../utils/GoogleUtils"
import { runWithDelay } from "./delay"
import { APIResponse, RESPONSE_STATUS } from "./fetchAPI"

export function fetchActivity(activityId, callback) {
    const activity = {
        name: 'Ποδόσφαιρο 5x5',
        providerName: 'Νίκος Παπαδόπουλος',
        images: [
            "http://fairplay5x5.gr/wp-content/uploads/2015/09/slide1.jpg",
            "https://elclasico.gr/wp-content/uploads/2017/12/5x5-podosfairo.jpg",
            "https://i.redd.it/cjkz6lpzmprx.jpg",
            "https://www.pixelstalk.net/wp-content/uploads/2016/06/High-Res-Backgrounds-Free-Download.jpg"
        ],
        rating: 3.8,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.\nUllam, sapiente nobis ipsa est eius unde, aliquid iusto saepe nostrum architecto rem quis consequuntur eaque reiciendis ipsam.\nIpsa odio commodi ullam?',
        location: {
            latitude: 38.11987459663194,
            longitude: 23.866071050478975
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
    console.log(activity)

    runWithDelay(() => {
        GoogleUtils.coordinatesToAddress(activity.location.latitude, activity.location.longitude, (address) => {
            activity.location.address = address
            callback(new APIResponse(activity, true, RESPONSE_STATUS.OK))
        })
    })
}

export function submitActivityReview(activityId, userId, rate, text, callback) {
    runWithDelay(() => callback(new APIResponse(null, true, RESPONSE_STATUS.OK)))
}

export function fetchBookReservations(reservations, username, callback) {
    runWithDelay(() => callback(new APIResponse(null, true, RESPONSE_STATUS.OK)))
}
