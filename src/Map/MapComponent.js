/* Libraires */
import React from 'react'
import { LoadScript }from '@react-google-maps/api'
import { GoogleMap } from '@react-google-maps/api'

/* Components */
import { MapLayer } from './MapLayer'

/* Functions */
import { setMeetup } from '../StateManagement/actions/selectedMeetup'


const googleMapLibraries = [`places`]
const mapContainerStyle = {
    width: `100vw`,
    height: `100vh`
}
const rishonLatLng = {
    lat: 31.962649,
    lng: 34.805643
}

export const MapComponent = () => {
    /* Handlers */
    const handleMapClick = (event) => {
        let lat = event.latLng.lat(),
            lng = event.latLng.lng()
        fetch(`${process.env.REACT_APP_FETCH_ADDRESS_REQUEST}/address?lat=${lat}&lng=${lng}`, {mode: 'cors'})
        .then(response => response.text())
        .then(address => {
            let pointCoords = {
                lat: lat,
                lng: lng
            }
            let currentDate = new Date().toISOString()
            currentDate = currentDate.substring(0, currentDate.indexOf(':', currentDate.indexOf(':')+1))
            setMeetup({
                address: address,
                coords: pointCoords,
                date: currentDate
            })
        })
    }

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={googleMapLibraries}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={rishonLatLng}
                zoom={15}
                onClick={(event) =>{handleMapClick(event)}}
            >
                <MapLayer/>
            </GoogleMap>
        </LoadScript>
    )
}
