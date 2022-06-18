import React, { useCallback } from "react";
import { GoogleUtils } from "../utils/GoogleUtils";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

export function FrozenMap({
    style,
    position
}) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GoogleUtils.PROJECT_API_KEY
    })

    const [map, setMap] = React.useState(null)

    /* const onLoad = useCallback(map => {
        const bounds = new window.google.maps.LatLngBounds(position);
        //map.fitBounds(bounds);
        setMap(map)
    }, []) */

    const onUnmount = useCallback(map => {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={style}
            center={position}
            zoom={16}
            //onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={position} visible={true}/>
        </GoogleMap>
    ) : <></>
}
