/* Libraries */
import React from 'react'

/* Components */
import { MapMeetups } from './MapMeetups'
import { MeetupDialog } from '../Global/MeetupDialog'
import { MeetupPopup } from '../Global/MeetupPopup'
import { MeetupSearchPins } from './MeetupSearchPins'

export const MapLayer = () => (
    <>
        <MapMeetups/>
        <MeetupDialog/>
        <MeetupPopup/>
        <MeetupSearchPins/>
    </>
)
