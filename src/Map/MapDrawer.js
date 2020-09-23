/* Libraries */
import React from 'react'
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';

const styles = makeStyles((theme) => ({

}))

export const MapDrawer = () => {
    return (
        <>
            <Typography variant="h5" align="center">
                App name
            </Typography>
            <Divider/>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <VisibilityIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Filter by
                    </ListItemText>
                </ListItem>
            </List>
            <Divider/>
            App settings
        </>
    )
}
