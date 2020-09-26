/* Libraries */
import React from 'react'
import { Divider, 
    Typography, 
} from '@material-ui/core'

import { MeetupFilter } from './MeetupFilters'
import { ManageMeetup } from './ManageMeetup'

export const MapDrawer = () => {
    return (
        <>
            <Typography variant="h5" align="center">
                App name
            </Typography>
            <Divider/>
            <MeetupFilter/>
            <Divider/>
            <ManageMeetup/>
        </>
    )
}