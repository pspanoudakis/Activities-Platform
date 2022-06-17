import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";
import { GoogleUtils } from "../utils/GoogleUtils";

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
    if (
        isLatLngLiteral(a) ||
        a instanceof window.google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof window.google.maps.LatLng
    ) {
        return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
    }
    // TODO extend to other types
    // use fast-equals for other objects
    return deepEqual(a, b);
});
  
function useDeepCompareMemoize(value) {
    const ref = useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }
    return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

function Map({ onClick, onIdle, children, style, ...options }) {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    useEffect(() => {
        if (map) {
          ["click", "idle"].forEach((eventName) =>
            window.google.maps.event.clearListeners(map, eventName)
          );
          if (onClick) {
            map.addListener("click", onClick);
          }
      
          if (onIdle) {
            map.addListener("idle", () => onIdle(map));
          }
        }
      }, [map, onClick, onIdle]);

      return (
        <>
            <div ref={ref} style={style} />
            {
                React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        // set the map prop on the child component
                        return React.cloneElement(child, { map });
                    }
                })
            }
        </>
      );
}

const Marker = (options) => {
    const [marker, setMarker] = useState();
  
    useEffect(() => {
      if (!marker) {
        setMarker(new window.google.maps.Marker());
      }
  
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);
    useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
    return null;
};

const render = (status) => {
    return <h1>{status}</h1>;
  };

/* export function MapWrapper({
    center: {
        lat,
        lng
    },
    onClick,
    onIdle,
    zoom,
    style,
}) {

    return (
        <Wrapper apiKey={GoogleUtils.PROJECT_API_KEY} render={render}>
            <Map
                center={center}
                onClick={onClick}
                onIdle={onIdle}
                zoom={zoom}
                style={{ flexGrow: "1", height: "100%" }}
            >
                {
                    clicks.map((latLng, i) => (
                        <Marker key={i} position={latLng} />
                    ))
                }
            </Map>
        </Wrapper>
    )
} */

/* export function FrozenMap({
    markerPosition,
    style
}) {
    const [clicks, setClicks] = useState([]);
    const [center, setCenter] = useState(markerPosition);
    const [zoom, setZoom] = useState(3);
    const onIdle = (googleMap) => {
        console.log("onIdle");
        if (googleMap.getZoom()) {
            setZoom(googleMap.getZoom())
        }
        setCenter(googleMap.getCenter() ? googleMap.getCenter.toJSON() : center);
    };

    const onClick = (e) => {
        console.log("onClick");
        console.log(e.latLng.lat())
        // avoid directly mutating state
        if (e.latLng) {
            setClicks([...clicks, e.latLng]);
        }
    };
    return (
        <Wrapper apiKey={GoogleUtils.PROJECT_API_KEY} render={render}>
            <Map
                center={center}
                onClick={onClick}
                onIdle={onIdle}
                zoom={zoom}
                style={style}
            >
                <Marker position={markerPosition} />
            </Map>
        </Wrapper>
    )
} */
export function TestMap(params) {
    // [START maps_react_map_component_app_state]
  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0,
  });

  const onClick = (e) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    //setCenter(m.getCenter().toJSON());
  };

  // [END maps_react_map_component_app_state]
  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );
  // [START maps_react_map_component_app_return]
  return (
    <div style={{ width: "500px", height: "500px" }}>
      <Wrapper apiKey={GoogleUtils.PROJECT_API_KEY} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ width: "500px", height: "500px" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {form}
    </div>
  );
  // [END maps_react_map_component_app_return]
}
