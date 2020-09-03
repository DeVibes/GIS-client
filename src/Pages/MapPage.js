import React, { useState } from 'react'
import { GoogleMap, withGoogleMap, withScriptjs, Marker } from "react-google-maps"

import { NewMeetupPopup } from '../Global/NewMeetupPopup'

export const MapPage = () => {
    return (
        <WrappedMap
            googleMapURL={urlProp}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            isMarkerShown
        />
    )
}

const MapComponent = () => {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({
        lat: 0,
        lng: 0
    })
    const [meetups, setMeetups] = useState([
        {
            meetupId: 1,
            meetupName: `Mark`,
            meetupCategory: `cars`,
            meetupDate: `1/1/1`,
            meetupAdress: `??`,
            meetupCords: {
                lat: 31.96750948533345,
                lng: 34.80894748150635
            }
        },
    ])

    const handleClick = (e) => {
        setCoords({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        })
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };
    
    const onSubmit = (newMeetup) => {
        handleClose()
        setMeetups(meetups => [...meetups, newMeetup])
    }

    return (
        <GoogleMap
            defaultZoom = {15}
            defaultCenter = {rishonLatLong}
            onClick={(event) => {handleClick(event)}}
        >
            {meetups.map((meetup) => (
                <Marker
                    position={meetup.meetupCords}
                    icon={{
                        url: `/${meetup.meetupCategory}.png`,
                        scaledSize: new window.google.maps.Size(50, 50)
                    }}
                />
            ))}
            <NewMeetupPopup open={open} onClose={handleClose} onSubmit={onSubmit} newCoords={coords}/>
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent))


const urlProp = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`
const rishonLatLong = {
    lat: 31.962649,
    lng: 34.805643
}