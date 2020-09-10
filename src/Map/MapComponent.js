/* Libraires */
import React from 'react'
import { LoadScript, GoogleMap }from '@react-google-maps/api'

/* Components */
import { MapLayer } from './MapLayer'
import { MeetupCategories } from '../Data/MeetupCategories'

/* Functions */
import { setMeetup } from '../StateManagement/actions/selectedMeetup'
import { getAddressByCoords } from '../Services/GetAddressByCoords'

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
    const handleMapClick = async(event) => {
        let lat = event.latLng.lat(),
            lng = event.latLng.lng();

        try {
            const address = await getAddressByCoords(lat, lng)
            console.log(`Got address! ${address}`)
            let currentDate = new Date().toISOString()
            currentDate = currentDate.substring(0, currentDate.indexOf(':', currentDate.indexOf(':')+1))
            setMeetup({
                category: MeetupCategories[0].value,
                address: address,
                coords: {
                    lat: lat,
                    lng: lng
                },
                date: currentDate
            })
            
        } catch (error) {
            
        }
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
