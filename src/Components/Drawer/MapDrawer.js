/* Libraries */
import React from 'react'
import { useSelector } from 'react-redux'
import { Divider, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemSecondaryAction, 
    Typography, 
} from '@material-ui/core'

/* Components */
import { AddAddress } from './AddAddress'
import { ManageMeetup } from './ManageMeetup'
import { MeetupFilter } from './MeetupFilters'
import { SavedAddress } from './SavedAddress'

export const MapDrawer = () => {
    /* Redux states */
    let isManageOpen = useSelector(({ isManageOpen }) => isManageOpen)
    let isAddressesOpen = useSelector(({ isAddressesOpen }) => isAddressesOpen)
    let isAddAddressOpen = useSelector(({ addAddressData }) => addAddressData.isOpen)

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
            {isAddAddressOpen && (
                <AddAddress/>
            )}
        </>
    )
}