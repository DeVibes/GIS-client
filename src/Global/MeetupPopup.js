/* Libraries */
import React from 'react'
import { useSelector } from 'react-redux'
import { InfoWindow } from '@react-google-maps/api'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

/* Components */
import { initialMeetupState } from '../StateManagement/reducers/selectedMeetupReducer'

/* Redux */
import { setSelectedMeetup } from "../StateManagement/actions/selectedMeetup";
import { updateMeetup } from "../StateManagement/actions/meetups"
import { setIsPopupOpen } from '../StateManagement/actions/isPopupOpen'
import { setSnack } from '../StateManagement/actions/snackPopup'

/* Services */
import { editMeetup } from '../Services/Meetups'


const useStyles = makeStyles({
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
})

export const MeetupPopup = () => {
    let clickedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)
    let currentUser = useSelector(({ userData }) => userData.username)
    let isOpen = useSelector(({ isPopupOpen }) => isPopupOpen)

    const classes = useStyles()

    const handleClosePopup = () => {
        setIsPopupOpen(false)
        setSelectedMeetup(initialMeetupState)
    }

    const handleAttendance = async (isAttending) => {
        let meetupAttendants = clickedMeetup.attendants
        let msg
        if (isAttending) {
            meetupAttendants.push(currentUser)
            msg = `Registered for this meetup`
        }
        else {
            meetupAttendants = meetupAttendants.filter(attendant => attendant !== currentUser)
            msg = `Unregistered for this meetup`
        }
        const updatedMeetup = await editMeetup(clickedMeetup._id, { 
            attendants: meetupAttendants 
        })
        updateMeetup(updatedMeetup)
        setSelectedMeetup(updatedMeetup)
        setSnack({
            isSnackOpen: true,
            msg: msg,
            isError: false
        })
    }

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
                            subheader={clickedMeetup.date}
                            className={classes.header}
                        />
                        <CardMedia
                            component="img"
                            className={classes.media}
                            src={`/${clickedMeetup.category}Back.jpg`}
                        />
                        <CardContent>
                            <Typography variant="subtitle2">
                                About the meetup:
                            </Typography>
                            <Typography paragraph>
                                Some meetup data
                            </Typography>
                            {clickedMeetup.attendants.includes(currentUser) &&
                                <Typography variant="h4">
                                    Ur in!
                                </Typography>
                            }
                        </CardContent>
                        <CardActions className={classes.actions} >
                            {currentUser === clickedMeetup.admin &&
                                <Button>Manage</Button>
                            }
                            {!clickedMeetup.attendants.includes(currentUser) ?
                                <Button onClick={() => handleAttendance(true)}>
                                    Sign me up
                                </Button>
                                :
                                <Button onClick={() => handleAttendance(false)}>
                                    Cancel attendance
                                </Button>
                            }
                        </CardActions>              
                    </Card>
                </InfoWindow>
            )}
        </>
    )
}
