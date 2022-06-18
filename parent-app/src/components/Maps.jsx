import React, { useCallback, useEffect } from "react";
import { GoogleUtils } from "../utils/GoogleUtils";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

export function SingleMarkerMap({
    style,
    position
}) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GoogleUtils.PROJECT_API_KEY
    })

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={style}
            center={position}
            zoom={16}
        >
            <Marker position={position} visible={true}/>
        </GoogleMap>
    ) : <></>
}

export function MultiMarkerMap({
    style,
    mainMarkerPosition,
    restMarkersPositions
}) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GoogleUtils.PROJECT_API_KEY
    })

    const [map, setMap] = React.useState(null)

    const onLoad = useCallback(map => setMap(map), [])

    useEffect(() => {
        if (map && restMarkersPositions.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(mainMarkerPosition)

            for (const pos of restMarkersPositions) {
                bounds.extend(pos)
            }

            map.fitBounds(bounds);
        }
      }, [map, mainMarkerPosition, restMarkersPositions]);

    const onUnmount = useCallback(_ => {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={style}
            center={mainMarkerPosition}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={mainMarkerPosition} visible={true}/>
            {
                restMarkersPositions.map((p, i) => <Marker key={i} position={p} visible={true}/>)
            }
        </GoogleMap>
    ) : <></>
}
