export class GoogleUtils {
    static PROJECT_API_KEY = process.env.REACT_APP_GOOGLE_PROJECT_API_KEY

    static getAddressFromAddressComponents(addressComponents) {
        const streetNum = addressComponents.find(c => c.types.includes('street_number')).short_name
        const street = addressComponents.find(c => c.types.includes('route')).long_name
        const city = addressComponents.filter(c => c.types.includes('locality')).map(c => c.long_name).join(', ')

        return `${street} ${streetNum}, ${city}`
    }

    static coordinatesToAddress(lat, lng, callback) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?location_type=ROOFTOP&language=el&latlng=${lat},${lng}&key=${GoogleUtils.PROJECT_API_KEY}`)
        .then((response) => {
            if (response.ok) {
                response.json().then( apiResponse => {
                    if (apiResponse.status !== "OK") {
                        callback('Άγνωστη Τοποθεσία')
                    }
                    else {
                        callback(GoogleUtils.getAddressFromAddressComponents(apiResponse.results[0].address_components))
                    }
                })
            }
        })
    }

    static async coordinatesToAddressAsync(lat, lng) {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?location_type=ROOFTOP&language=el&latlng=${lat},${lng}&key=${GoogleUtils.PROJECT_API_KEY}`)
        if (response.ok) {
            const apiResponse = await response.json()
            if (apiResponse.status === "OK") {
                return GoogleUtils.getAddressFromAddressComponents(apiResponse.results[0].address_components)
            }
        }
        return 'Άγνωστη Τοποθεσία'
    }
}
