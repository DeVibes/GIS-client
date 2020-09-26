/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { InfoWindow } from '@react-google-maps/api'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, CardActions, Button, Grow, TextField, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

/* Components */
import { initialMeetupState } from '../../StateManagement/reducers/selectedMeetupReducer'

/* Redux */
import { setSelectedMeetup } from "../../StateManagement/actions/selectedMeetup";
import { updateMeetup } from "../../StateManagement/actions/meetups"
import { setIsPopupOpen } from '../../StateManagement/actions/isPopupOpen'
import { setSnack } from '../../StateManagement/actions/snackPopup'

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
    addressWrapper: {
        display: `flex`,
    }
}))

export const MeetupPopup = () => {
    /* Redux states */
    let clickedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)
    let userData = useSelector(({ userData }) => userData)
    let isOpen = useSelector(({ isPopupOpen }) => isPopupOpen)

    /* Local states */
    const [addressNickName, setAddressNickName] = useState({
        isVisible: false,
        nicknameValue: null
    })

    const handleShowSaveAddress = () => setAddressNickName({
        ...addressNickName,
        isVisible: true
    })

    const classes = useStyles()

    /* Handlers */
    const handleClosePopup = () => {
        setIsPopupOpen(false)
        setSelectedMeetup(initialMeetupState)
    }

    const handleAttendance = async (isAttending) => {
        let meetupAttendants = clickedMeetup.attendants
        let msg
        if (isAttending) {
            meetupAttendants.push(userData.username)
            msg = `Registered for this meetup`
        }
        else {
            meetupAttendants = meetupAttendants.filter(attendant => attendant !== userData.username)
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

    const isAddressAlreadySaved = () => !userData.savedAddresses.some(addressObject => addressObject.address === clickedMeetup.address)

    const isUserAlreadySignedToMeetup = () => clickedMeetup.attendants.includes(userData.username)

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
                            {isUserAlreadySignedToMeetup() &&
                                <Typography variant="h4">
                                    Ur in!
                                </Typography>
                            }
                            <SaveAddressField 
                                userData={userData}
                                currentAddress={clickedMeetup.address}
                                addressNickName={addressNickName}
                                setAddressNickName={setAddressNickName}
                            /> 
                        </CardContent>
                        <CardActions className={classes.actions} >
                            {isAdminOfMeetup() &&
                                <Button>Manage</Button>
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
                                Save thiss address
                            </Button>
                        </CardActions>         
                    </Card>
                </InfoWindow>
            )}
        </>
    )
}

const SaveAddressField = ({ userData, currentAddress, addressNickName, setAddressNickName }) => {
    const classes = useStyles()

    const initialInputValidationState = {
        addressNickName: {
            isValid: null,
            errorMessage: null
        },
    }

    /* Local states */
    const [inputValidator, setInputValidator] = useState(initialInputValidationState)

    const handleNickNameChange = (e) => {
        let { value } = e.target
        let isValid = isNameValid(value)
        let errorMessage = null
        if (!isValid) 
            errorMessage = `Incorrect value`
        setInputValidator({
            ...inputValidator, 
            addressNickName: {
                isValid: isValid,
                errorMessage: errorMessage
            }})
        setAddressNickName({
            ...addressNickName,
            nicknameValue: value
        })
    }

    const isInputValid = () => {
        if (!Boolean(inputValidator.addressNickName.isValid)) {
            setInputValidator({
                ...inputValidator,
                addressNickName: {
                    isValid: false,
                    errorMessage: `Empty field`
                }
            })
            return false
        }
        return true
    }

    const handleSaveAddress = async () => {
        if (isInputValid()) {
            const response = await updateUser({
                id: userData.id,
                savedAddresses: [...userData.savedAddresses, {
                    nickName: addressNickName.nicknameValue,
                    address: currentAddress
                }]
            })
            setSnack({
                isSnackOpen: true,
                msg: `saved`,
                isError: false
            })
            setAddressNickName({
                isVisible: false,
                nicknameValue: null
            })
        }
    }
    return (
        <>
            {addressNickName.isVisible && (
                <Grow in={addressNickName.isVisible} timeout={700}>
                    <div className={classes.addressWrapper}>
                        <TextField
                            margin="dense"
                            label="Address nickname"
                            error={
                                inputValidator.addressNickName.isValid == null ? false : !inputValidator.addressNickName.isValid
                            }
                            helperText={inputValidator.addressNickName.errorMessage}
                            type="text"
                            name="addressNickName"
                            fullWidth
                            onChange={handleNickNameChange}
                        />
                        <Button onClick={() => handleSaveAddress()}>Save it</Button>
                    </div>
                </Grow>
            )}
        </>
    )
}