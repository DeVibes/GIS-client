/* Libraries */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Marker } from '@react-google-maps/api'

/* Redux */
import { setSelectedMeetup } from '../../StateManagement/actions/selectedMeetup'
import { setIsPopupOpen } from '../../StateManagement/actions/isPopupOpen'
import { setMeetups } from '../../StateManagement/actions/meetups'
import { setIsManage } from '../../StateManagement/actions/manageMeetup'

/* Services */
import { getAllMeetups } from '../../Services/Meetups'

export const MapMeetups = () => {
    /* Redux states */
    let meetups = useSelector(({ meetups }) => meetups)
    let meetupsFilters = useSelector(({ meetupsFilters }) => meetupsFilters)

    useEffect(() => {
        async function fetchData() {
            try {
                const meetups = await getAllMeetups(meetupsFilters)
                setMeetups(meetups)
            } catch (error) {
                
            }
        }
        fetchData()
    }, [])

    const onMeetupClick = (id) => {
        let selectedMeetup = meetups.find(m => m._id === id)
        setSelectedMeetup(selectedMeetup)
        setIsManage(false)
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