/* Libraries */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Marker } from '@react-google-maps/api'

/* Components */

/* Functions */
import { getUserMeetups } from '../Services/GetUserMeetups'


export const MapMeetups = () => {
    let userMeetups = useSelector(({ userMeetups }) => userMeetups)

    useEffect(() => {
        getUserMeetups()
    }, [])

    return (
        <>
            {userMeetups.map((meetup) => (
                <Marker
                    position={meetup.meetupCoords}
                    icon={{
                        url: `/${meetup.meetupCategory}.png`,
                        scaledSize: {
                            width: 50,
                            height: 50
                        }
                    }}
                    // onClick={() => {setSelectedMeetup(meetup)}}
                />
            ))}
        </>
    )
}