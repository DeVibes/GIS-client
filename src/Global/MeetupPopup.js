/* Libraries */
import React from 'react'
import { useSelector } from 'react-redux'
import { InfoWindow } from '@react-google-maps/api'

/* Components */
import { initialMeetupState } from '../StateManagement/reducers/selectedMeetupReducer'

/* Functions */
import { setMeetup } from "../StateManagement/actions/selectedMeetup";

export const MeetupPopup = () => {
    let clickedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)

    const handleClosePopup = () => {
        setMeetup(initialMeetupState)
    }

    return (
        <>
            {clickedMeetup.name && (
                <InfoWindow
                        position={clickedMeetup?.coords}
                        onCloseClick={handleClosePopup}
                >
                    <>{clickedMeetup.name}</>
                </InfoWindow>
            )}
        </>
    )
}
