/* Libraries */
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { LoadScript, GoogleMap }from '@react-google-maps/api'

/* Components */
import { MapHeader } from '../Components/Map/MapHeader'
import { MapLayer } from '../Components/Map/MapLayer'
import { MeetupCategories } from '../Data/MeetupCategories'
import { SnackbarPopup } from '../Components/Global/SnackbarPopup';
import { getCurrentDate } from '../Data/Date'

/* Redux */
import { setSelectedMeetup } from '../StateManagement/actions/selectedMeetup'
import { setIsDialogOpen } from '../StateManagement/actions/isDialogOpen'
import { setIsPopupOpen } from '../StateManagement/actions/isPopupOpen'
import { setSnackState } from '../StateManagement/actions/snackPopup'
import { setPersonName, setUserCoords, setUserData, setUserId, setUserName, setUserPhone, setUserSavedAddress } from '../StateManagement/actions/userData'

/* Services */
import { getAddressByCoords } from '../Services/GoogleAPI'
import { getUserDataByUsername } from '../Services/Users'

const googleMapLibraries = [`places`]
const mapContainerStyle = {
    width: `100vw`,
    height: `100vh`
}

export const MapPage = () => {
    const userData = useSelector(({ userData }) => userData)
    let snackPopup = useSelector(({ snackPopup }) => snackPopup)

    useEffect(() => {

        async function fetchUser(loggedUser) {
            const user = await getUserDataByUsername(loggedUser)
            setUserId(user._id)
            setUserName(user.username)
            setPersonName(user.personName)
            setUserPhone(user.phone)
            setUserSavedAddress(user.savedAddresses || [])
        } 
        navigator.geolocation.getCurrentPosition(fetchUserGeoCoordsCallback)
        let loggedUser = localStorage.getItem("loginUser")
        fetchUser(loggedUser)
    }, [])

    const mapRef = useRef()
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
      }, []);
    
    const recenterMap = React.useCallback((firstAddress) => {
      mapRef.current.panTo(firstAddress);
      mapRef.current.setZoom(17);
    }, []);

    const fetchUserGeoCoordsCallback = ({ coords }) => {
        let { latitude, longitude } = coords
        setUserCoords({
            lat: latitude,
            lng: longitude
        })
    }
    
    /* Handlers */
    const handleSnackClose = () => setSnackState(false)

    const handleMapClick = async(event) => {
        let lat = event.latLng.lat(),
            lng = event.latLng.lng();

        try {
            const address = await getAddressByCoords(lat, lng)
            console.log(`Got address! ${address}`)
            setSelectedMeetup({
                category: MeetupCategories[0].value,
                address: address,
                coords: {
                    lat: lat,
                    lng: lng
                },
                date: getCurrentDate(),
                admin: userData.username,
                participants: [userData.username]
            })
            setIsPopupOpen(false)
            setIsDialogOpen(true)
            
        } catch (error) {
            
        }
    }

    return (
        <>
            <MapHeader recenterMap={recenterMap}/>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                libraries={googleMapLibraries}
                >
                <GoogleMap
                    id="map"
                    mapContainerStyle={mapContainerStyle}
                    onLoad={onMapLoad}
                    center={userData.coords}
                    zoom={15}
                    options={{
                        streetViewControl: false,
                        zoomControl: false,
                    }}
                    onClick={(event) =>{handleMapClick(event)}}
                    >
                    <MapLayer/>
                </GoogleMap>
            </LoadScript>
            <SnackbarPopup 
                open={snackPopup.isSnackOpen} 
                onClose={handleSnackClose} 
                severity={snackPopup.isError}
                text={snackPopup.msg}
            />
        </>
    )
}
