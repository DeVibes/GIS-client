/* Libraries */
import React from 'react'
import { useSelector } from 'react-redux'
import { Divider, 
    Typography, 
} from '@material-ui/core'

import { MeetupFilter } from './MeetupFilters'
import { ManageMeetup } from './ManageMeetup'
import { SavedAddress } from './SavedAddress'

export const MapDrawer = () => {
    /* Redux states */
    let isManageOpen = useSelector(({ isManageOpen }) => isManageOpen)
    let isAddressesOpen = useSelector(({ isAddressesOpen }) => isAddressesOpen)

    return (
        <>
            <Typography variant="h5" align="center">
                App name
            </Typography>
            <Divider/>
            <MeetupFilter/>
            {isManageOpen && (
                <ManageMeetup/>
            )}
            {isAddressesOpen && (
                <SavedAddress/>
            )}
        </>
    )
}