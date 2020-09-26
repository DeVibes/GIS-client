/* Libraries */
import React from 'react'
import { useSelector } from 'react-redux'
import { Marker } from '@react-google-maps/api'

/* Components */
import { MeetupCategories } from '../../Data/MeetupCategories'

/* Redux */
import { setSelectedMeetup } from '../../StateManagement/actions/selectedMeetup'
import { setIsDialogOpen } from '../../StateManagement/actions/isDialogOpen'

export const MeetupSearchPins = () => {
    /* Redux states */
    const searchResults = useSelector(({ searchQuery }) => searchQuery.searchResults)
    const userData = useSelector(({ userData }) => userData)

    const onPinClick = (pinData) => {
        let currentDate = new Date().toISOString()
        currentDate = currentDate.substring(0, currentDate.indexOf(':', currentDate.indexOf(':')+1))

        setSelectedMeetup({
            category: MeetupCategories[0].value,
            address: pinData.formatted_address,
            coords: pinData.geometry.location,
            date: currentDate,
            admin: userData.username,
            attendants: [userData.username]
        })
        setIsDialogOpen(true)
    }

    if (searchResults.length === 0) return <></>
    else {
        return (
            <>
            {searchResults.map((pin, index) => (
                <Marker
                    key={index}
                    position={pin.geometry.location}
                    onClick={() => {onPinClick(pin)}}  
                />        
            ))}
            </>
        )
    }   
}
