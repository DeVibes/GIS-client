/* Libraries */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Marker } from '@react-google-maps/api'

/* Redux */
import { setSelectedMeetup } from '../../StateManagement/actions/selectedMeetup'
import { setIsPopupOpen } from '../../StateManagement/actions/isPopupOpen'

/* Services */
import { getAllMeetups } from '../../Services/Meetups'

export const MapMeetups = () => {
    /* Redux states */
    let meetups = useSelector(({ meetups }) => meetups)
    let meetupsFilters = useSelector(({ meetupsFilters }) => meetupsFilters)

    useEffect(() => {
        getAllMeetups(meetupsFilters)
    }, [])

    const onMeetupClick = (id) => {
        let selectedMeetup = meetups.find(m => m._id === id)
        console.log(`Clicked on meetup!`)
        console.log(selectedMeetup)
        setSelectedMeetup(selectedMeetup)
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