/* Libraries */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Marker } from '@react-google-maps/api'

/* Components */

/* Functions */
import { getUserMeetups } from '../Services/GetUserMeetups'
import { setMeetup } from '../StateManagement/actions/selectedMeetup'
import { setIsPopupOpen } from '../StateManagement/actions/isPopupOpen'

export const MapMeetups = () => {
    let meetups = useSelector(({ meetups }) => meetups)

    useEffect(() => {
        getUserMeetups()
    }, [])

    const onMeetupClick = (id) => {
        let selectedMeetup = meetups.find(m => m._id === id)
        console.log(`Clicked on meetup!`)
        console.log(selectedMeetup)
        setMeetup(selectedMeetup)
        setIsPopupOpen(true)
    }

    return (
        <>
            {meetups.map((meetup) => (
                <Marker
                    key={meetup._id}
                    position={meetup.coords}
                    icon={{
                        url: `/${meetup.category}.png`,
                        scaledSize: {
                            width: 50,
                            height: 50
                        }
                    }}
                    onClick={() => {onMeetupClick(meetup._id)}}
                />
            ))}
        </>
    )
}