/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { InfoWindow } from '@react-google-maps/api'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, CardActions, Button, Grow, TextField, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import PlaceIcon from '@material-ui/icons/Place';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HowToRegIcon from '@material-ui/icons/HowToReg';

/* Components */
import { initialMeetupState } from '../../StateManagement/reducers/selectedMeetupReducer'

/* Redux */
import { setSelectedMeetup } from "../../StateManagement/actions/selectedMeetup";
import { updateMeetup } from "../../StateManagement/actions/meetups"
import { setIsPopupOpen } from '../../StateManagement/actions/isPopupOpen'
import { setSnack } from '../../StateManagement/actions/snackPopup'
import { setIsManage } from '../../StateManagement/actions/manageMeetup'
import { setUserData } from '../../StateManagement/actions/userData'
import { setIsAddressesOpen } from '../../StateManagement/actions/isAddressesOpen'
import { setIsAddAddressOpen } from '../../StateManagement/actions/AddAddressData';

/* Services */
import { editMeetup } from '../../Services/Meetups'
import { updateUser } from '../../Services/Users'

/* Validation */
import { isNameValid } from "../../Validation/newMeetupValidation"

const useStyles = makeStyles((theme) =>({
    container: {
        maxWidth: 300,
        padding: 0
    },
    header: {
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
    title: {
        color: red[500]
    },
    attendance: {
        color: green[500]
    },
    avatar: {
        backgroundColor: red[500]
    },
    media: {
        height: 100
    },
    content: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    actions: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom:0,
        display: `flex`,
        justifyContent: `flex-end`
    },
    desc: {
        marginTop: 10
    }
}))

export const MeetupPopup = () => {
    /* Redux states */
    let clickedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)
    let placesLeft = useSelector(({ selectedMeetup }) => selectedMeetup.maxParticipants - selectedMeetup.participants.length)
    let userData = useSelector(({ userData }) => userData)
    let isOpen = useSelector(({ isPopupOpen }) => isPopupOpen)
    let isManageOpen = useSelector(({ manageMeetup }) => manageMeetup)

    const handleShowSaveAddress = () => {
        setIsAddAddressOpen(true);
    }

    const classes = useStyles()

    /* Handlers */
    const handleClosePopup = () => {
        setIsPopupOpen(false)
        setSelectedMeetup(initialMeetupState)
    }

    const handleAttendance = async (isAttending) => {
        let meetupParticipants = clickedMeetup.participants
        let msg
        if (isAttending) {
            meetupParticipants.push(userData.username)
            msg = `Registered for this meetup`
        }
        else {
            meetupParticipants = meetupParticipants.filter(participant => participant !== userData.username)
            msg = `Unregistered for this meetup`
        }
        try {
            const updatedMeetup = await editMeetup(clickedMeetup._id, { 
                participants: meetupParticipants 
            })
            updateMeetup(updatedMeetup)
            setSelectedMeetup(updatedMeetup)
            setSnack({
                isSnackOpen: true,
                msg: msg,
                isError: false
            })
        } catch ({ message }) {
            setSnack({
                isSnackOpen: true,
                msg: message,
                isError: true
            })
        }

    }

    const handleManageClick = () => {
        setIsAddressesOpen(false)
        setIsPopupOpen(false)
        setIsManage(!isManageOpen)
    }

    const isAddressAlreadySaved = () => !userData.savedAddresses.some(addressObject => addressObject.address === clickedMeetup.address)

    const isUserAlreadySignedToMeetup = () => clickedMeetup.participants.includes(userData.username)

    const isAdminOfMeetup = () => userData.username === clickedMeetup.admin

    return (
        <>
            {isOpen && (
                <InfoWindow
                    position={clickedMeetup?.coords}
                    onCloseClick={handleClosePopup}
                    className={{padding: 0}}
                >
                    <Card className={classes.container}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {clickedMeetup.name?.charAt(0).toUpperCase()}
                                </Avatar>
                            }
                            title={
                                <Typography variant="h6" className={classes.title}>
                                    {clickedMeetup.name}
                                </Typography>
                            }
                            subheader={isUserAlreadySignedToMeetup() && (
                                <Typography variant="h6" className={classes.attendance}>
                                    Attending
                                </Typography>
                            )}
                            className={classes.header}
                        />
                        <CardMedia
                            component="img"
                            className={classes.media}
                            src={`/${clickedMeetup.category}Back.jpg`}
                        />
                        <CardContent className={classes.content}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <PlaceIcon/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2">
                                        {clickedMeetup.address}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <ScheduleIcon/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2">
                                        {new Date(clickedMeetup.date).toLocaleTimeString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <EventAvailableIcon/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2">
                                        {new Date(clickedMeetup.date).toDateString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <HowToRegIcon/>
                                </Grid>
                                <Grid item xs={10}>
                                    {placesLeft === 0 ?
                                        <Typography variant="subtitle2">
                                            Full
                                        </Typography>
                                        :
                                        <Typography variant="subtitle2">
                                            {placesLeft } places left
                                        </Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Typography paragraph variant="body1" className={classes.desc}>
                                {clickedMeetup.description}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.actions} >
                            {isAdminOfMeetup() &&
                                <Button onClick={() => handleManageClick()}>Manage</Button>
                            }
                            {isUserAlreadySignedToMeetup() ?
                                <Button onClick={() => handleAttendance(false)}>
                                    Cancel attendance
                                </Button>
                                :
                                <Button onClick={() => handleAttendance(true)}>
                                    Sign me up
                                </Button>
                            }
                            <Button 
                                onClick={() => handleShowSaveAddress()}
                                disabled={!isAddressAlreadySaved()}
                            >
                                Save this address
                            </Button>
                        </CardActions>         
                    </Card>
                </InfoWindow>
            )}
        </>
    )
}

