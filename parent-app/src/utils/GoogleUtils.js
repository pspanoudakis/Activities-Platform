class GoogleUtils {
    static PROJECT_API_KEY = 'AIzaSyApkbklYBjYv73xEWvH7Oupo_1qP4vSf0I'

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
                    if (apiResponse.status != "OK") {
                        callback('Άγνωστη Τοποθεσία')
                    }
                    else {
                        callback(GoogleUtils.getAddressFromAddressComponents(apiResponse.results[0].address_components))
                    }
                })
            }
        })
    }
}
