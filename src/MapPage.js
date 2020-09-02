import React from 'react'

import { GoogleMap, withGoogleMap, withScriptjs, Marker } from "react-google-maps"


const MapComponent = (() => (
    <GoogleMap
        defaultZoom = {15}
        defaultCenter = {rishonLatLong}
    /> 
))

const WMap = withScriptjs(withGoogleMap(MapComponent))


export const MapPage = (() => (
    // <div style={{width: `100vw`, height: `100vh`}}>
        <WMap
            googleMapURL={urlProp}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    // </div>
));

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const urlProp = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`
const rishonLatLong = {
    lat: 31.962649,
    lng: 34.805643
}