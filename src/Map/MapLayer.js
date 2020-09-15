/* Libraries */
import React from 'react'

/* Components */
import { MapMeetups } from './MapMeetups'
import { MeetupDialog } from '../Global/MeetupDialog'
import { MeetupPopup } from '../Global/MeetupPopup'

export const MapLayer = () => (
    <>
        <MapMeetups/>
        <MeetupDialog/>
        <MeetupPopup/>
    </>
)
