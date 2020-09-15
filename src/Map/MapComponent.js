/* Libraires */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LoadScript, GoogleMap }from '@react-google-maps/api'

/* Components */
import { MapLayer } from './MapLayer'
import { MeetupCategories } from '../Data/MeetupCategories'
import { SnackbarPopup } from '../Global/SnackbarPopup';


/* Functions */
import { setMeetup } from '../StateManagement/actions/selectedMeetup'
import { setIsDialogOpen } from '../StateManagement/actions/isDialogOpen'
import { setIsPopupOpen } from '../StateManagement/actions/isPopupOpen'
import { setUserCoords } from '../StateManagement/actions/userData'
import { getAddressByCoords } from '../Services/GetAddressByCoords'
import { setSnackState } from '../StateManagement/actions/snackPopup'

const googleMapLibraries = [`places`]
const mapContainerStyle = {
    width: `100vw`,
    height: `100vh`
}

export const MapComponent = () => {
    const snackPopup = useSelector(({ snackPopup }) => snackPopup)

    useEffect(() => {
        //TODO Get current location from browser
        setUserCoords({
            lat: 31.963358630236876,
            lng: 34.80391502380371
        })
    }, [])
    
    let userLocation = useSelector(({ userData }) => userData.coords)


    /* Handlers */
    const handleSnackClose = () => setSnackState(false)

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
            setIsPopupOpen(false)
            setIsDialogOpen(true)
            
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
                center={userLocation}
                zoom={15}
                onClick={(event) =>{handleMapClick(event)}}
            >
                <MapLayer/>
                <SnackbarPopup 
                    open={snackPopup.isSnackOpen} 
                    onClose={handleSnackClose} 
                    severity={snackPopup.isError}
                    text={snackPopup.msg}
                />
            </GoogleMap>
        </LoadScript>
    )
}
