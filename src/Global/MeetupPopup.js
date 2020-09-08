import React, { useEffect } from 'react'
import { InfoWindow } from '@react-google-maps/api'

export const MeetupPopup = ({ selectedMeetup, setSelectedMeetup }) => {
    return (
        <>
            {selectedMeetup && (
                <InfoWindow
                        position={selectedMeetup?.meetupCoords}
                        onCloseClick={() => setSelectedMeetup(null)}
                >
                    <>{selectedMeetup.meetupName}</>
                </InfoWindow>
            )}
        </>
    )
}
