/* Libraries */
import React from 'react'
import { Card, CardContent, Typography, CardActions, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const styles = makeStyles((theme) => {
    return {
        header: {
            color: `white`,
            font: `Roboto`
        },
        subHeader: {
            color: `white`,
            margin: `${theme.spacing(3)}px ${theme.spacing(2)}px`
        },
        buttons: {
            display: `flex`,
            marginTop: `auto`,
            justifyContent: `space-around`
        },
        paper: {
            height: `50vh`,
            backgroundColor: `transparent`,
            display: `flex`,
            flexDirection: `column`
        }
    }
})

export const WelcomeStep = ({ stepChange }) => {
    const classes = styles()

    return (
        <Paper 
            className={classes.paper}
            elevation={0}
        >
            <Typography variant="h3" align="center" className={classes.header}>
                Meetme
            </Typography>
            <Typography variant="h6" align="center" className={classes.subHeader}>
                A new way to meet and communicate
            </Typography>
            <Typography component="div" className={classes.buttons}>
                <Button 
                    onClick={() => stepChange(2)}
                    color="primary"
                    startIcon={<PersonAddIcon/>}
                    variant="contained"
                    size="small"
                >
                    New user
                </Button>
                <Button 
                    onClick={() => stepChange(1)}
                    color="primary"
                    startIcon={<LockOpenIcon/>}
                    variant="contained"
                    size="small"
                >
                    Login in
                </Button>
            </Typography>
        </Paper>
    )
}
