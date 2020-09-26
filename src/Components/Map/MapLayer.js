/* Libraries */
import React from 'react'

/* Components */
import { MapMeetups } from './MapMeetups'
import { MeetupDialog } from './MeetupDialog'
import { MeetupPopup } from './MeetupPopup'
import { MeetupSearchPins } from './MeetupSearchPins'
import { ProfileDialog } from './ProfileDialog'

export const MapLayer = () => (
    <>
        <MapMeetups/>
        <MeetupDialog/>
        <MeetupPopup/>
        <MeetupSearchPins/>
        <ProfileDialog/>
    </>
)
