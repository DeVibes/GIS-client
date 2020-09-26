/* Libraries */
import React from 'react'
import { InfoWindow } from 'react-google-maps'

export const EditMeetupPopup = ({ selectedMeetup }) => (
    <InfoWindow
        position={selectedMeetup.meetupCords}
    >
        {selectedMeetup.meetupName}
    </InfoWindow>
)


