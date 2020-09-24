/* Libraries */
import React, { useState } from 'react'
import { Button, Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';

const styles = makeStyles((theme) => ({

}))

export const MapDrawer = () => {
    const [edit, setEdit] = useState(false)

    return (
        <>
            <Typography variant="h5" align="center">
                App name
            </Typography>
            <Divider/>
            <List>
                <ListItem button on>
                    <ListItemIcon>
                        <VisibilityIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Filter by
                    </ListItemText>
                </ListItem>
            </List>
            <Button onClick={() => setEdit(!edit)}>click</Button>
            <Divider/>
            {edit && (
                <Collapse in={edit}>
                    <Typography variant="h6">
                        test
                    </Typography>
                </Collapse>
            )}
        </>
    )
}
