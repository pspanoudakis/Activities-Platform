import React, { useCallback, useEffect } from "react";
import { GoogleUtils } from "../utils/GoogleUtils";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

export function SingleMarkerMap({
    style,
    position,
    onClick,
    hideMarker,
    initialZoom
}) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GoogleUtils.PROJECT_API_KEY
    })

    return isLoaded ? (
        <GoogleMap
            options={{
                maxZoom: 18,
                draggableCursor: onClick ? "pointer" : null
            }}
            mapContainerStyle={style}
            center={position}
            zoom={initialZoom ?? 16}
            onClick={(e) => {
                if (onClick) {
                    onClick({
                        "lat": e.latLng.lat(),
                        "lng": e.latLng.lng()
                    })
                }
            }}
        >
            <Marker position={position} visible={!hideMarker}/>
        </GoogleMap>
    ) : <></>
}

export function MultiMarkerMap({
    style,
    mainMarkerPosition,
    restMarkersPositions,
    onClick,
    notifyOnClick
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
            options={{
                maxZoom: 18,
                draggableCursor: notifyOnClick ? "pointer" : null
            }}
            mapContainerStyle={style}
            center={notifyOnClick ? null : mainMarkerPosition}
            zoom={14}
            onLoad={onLoad}
            onClick={(e) => {
                if (notifyOnClick) {
                    onClick({
                        "lat": e.latLng.lat(),
                        "lng": e.latLng.lng()
                    })
                }
            }}
            onUnmount={onUnmount}
        >

            <Marker position={mainMarkerPosition} visible={true} icon="https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png"/>
            {
                restMarkersPositions.map((p, i) => <Marker key={i} position={p} visible={true}/>)
            }
        </GoogleMap>
    ) : <></>
}
