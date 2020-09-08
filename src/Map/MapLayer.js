/* Libraries */
import React from 'react'

/* Components */
import { MapMeetups } from './MapMeetups'
import { MeetupDialog } from '../Global/MeetupDialog'
import { MeetupPopup } from '../Global/MeetupPopup'

/* Functions */


export const MapLayer = () => {


    return (
        <>
            <MapMeetups/>
            <MeetupDialog/>
            <MeetupPopup
                // selectedMeetup={selectedMeetup}
                // setSelectedMeetup={setSelectedMeetup}
            />
        </>
    )
}
