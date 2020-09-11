/* Libraries */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { InfoWindow } from '@react-google-maps/api'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

/* Components */
import { initialMeetupState } from '../StateManagement/reducers/selectedMeetupReducer'

/* Functions */
import { setMeetup } from "../StateManagement/actions/selectedMeetup";
import { setIsPopupOpen } from '../StateManagement/actions/isPopupOpen'


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
    let isOpen = useSelector(({ isPopupOpen }) => isPopupOpen)

    const classes = useStyles()

    const handleClosePopup = () => {
        setIsPopupOpen(false)
        setMeetup(initialMeetupState)
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
                        </CardContent>
                        <CardActions className={classes.actions} >
                            <Button>Manage</Button>
                            <Button>Sign me up</Button>
                        </CardActions>
                    </Card>
                </InfoWindow>
            )}
        </>
    )
}
