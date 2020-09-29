/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, 
    ListSubheader, 
    Grow,
    TextField,
    MenuItem, 
    List,
    Divider,
    ListItem, ListItemText, Collapse, ListItemSecondaryAction, ListItemIcon 
} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import { MeetupCategories } from '../../Data/MeetupCategories'
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { discardMilliseconds } from '../../Data/Date'

/* Redux */
import { setIsManage } from '../../StateManagement/actions/manageMeetup'
import { setSelectedMeetup, setMeetupParticipants } from '../../StateManagement/actions/selectedMeetup'
import { setSnack } from '../../StateManagement/actions/snackPopup'
import { setMeetups } from '../../StateManagement/actions/meetups'
import { setIsPopupOpen } from '../../StateManagement/actions/isPopupOpen'

/* Services */
import { deleteMeetupById, getAllMeetups, editMeetup } from '../../Services/Meetups'

/* Validation */
import { isNameValid } from "../../Validation/newMeetupValidation"

const styles = makeStyles((theme) => ({
    manageMeetup: {
        display: 'flex',
        flexDirection: 'column'
    }
}))

const initialInputValidationState = {
    name: {
        isValid: true,
        errorMessage: null
    },
    maxParticipants: {
        isValid: true,
        errorMessage: null
    },
}

export const ManageMeetup = () => {
    /* Redux states */
    let selectedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)
    let isManageOpen = useSelector(({ isManageOpen }) => isManageOpen)
    let meetupsFilters = useSelector(({ meetupsFilters }) => meetupsFilters)

    /* Local states */
    const [isParticipantVisible, setIsParticipantVisible] = useState(false)
    const [inputValidator, setInputValidator] = useState(initialInputValidationState)

    const classes = styles()

    const isFormValid = () => {
        return Object.keys(inputValidator).every((key) => {
            if (!Boolean(inputValidator[key].isValid)) {
                setInputValidator({
                    ...inputValidator,
                    [key]: {
                        isValid: false,
                        errorMessage: `Empty field`
                    }
                })
            }
            return inputValidator[key].isValid === true
        })
    }

    /* Handlers */
    const handleInputChange = (event) => {
        let { name, value } = event.target
        let isValid = true
        let errorMessage = null

        switch (name) {
            case `name`: 
                isValid = isNameValid(value)
                break; 
            case `maxParticipants`:
                isValid = Boolean(value)
                break; 
            case `date`:
                value = discardMilliseconds(value)
                break
            default: break;
        }
        if (!isValid) errorMessage = `Incorrect value`
        setInputValidator({
            ...inputValidator, 
            [name]: {
                isValid: isValid,
                errorMessage: errorMessage
            }})
        setSelectedMeetup({
            ...selectedMeetup,
            [name]: value
        })
    }

    const handleSave = async () => {
        if (isFormValid()) {
            try {
                const savedMeetup = await editMeetup(selectedMeetup._id, selectedMeetup)
                const updatedMeetups = await getAllMeetups(meetupsFilters)
                    setSnack({
                        isSnackOpen: true,
                        msg: `${savedMeetup.name} was updated successfully`,
                        isError: false
                    })
                setMeetups(updatedMeetups)
                setIsManage(!isManageOpen)
            } catch ({ message }) {
                setSnack({
                    isSnackOpen: true,
                    msg: message,
                    isError: true
                })
            }
        }
    }

    const handleDelete = async () => {
        try {
            const isDeleted = await deleteMeetupById(selectedMeetup._id)
            const updatedMeetups = await getAllMeetups(meetupsFilters)
            setMeetups(updatedMeetups)
            setIsPopupOpen(false)
            setIsManage(false)
            setSnack({
                isSnackOpen: true,
                msg: `Deleted successfully`,
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

    const handleClose = () => {
        setInputValidator(initialInputValidationState)
        setIsManage(false)
    }

    const handleRemoveParticipant = participant => {
        selectedMeetup.participants.splice(selectedMeetup.participants.indexOf(participant), 1)
        setSelectedMeetup(selectedMeetup)
    }
    
    return (
        <Grow in={isManageOpen} timeout={1000}>
            <List subheader={<ListSubheader>Edit meetup</ListSubheader>}>
                <ListItem className={classes.manageMeetup}>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        name="name"
                        fullWidth
                        value={selectedMeetup.name}
                        onChange={handleInputChange}
                        error={
                            inputValidator.name.isValid == null ? false : !inputValidator.name.isValid
                        }
                        helperText={inputValidator.name.errorMessage}

                    />
                    <TextField
                        margin="dense"
                        label="Max participants"
                        type="number"
                        name="maxParticipants"
                        fullWidth
                        value={selectedMeetup?.maxParticipants}
                        onChange={handleInputChange}
                        error={
                            inputValidator.maxParticipants.isValid == null ? false : !inputValidator.maxParticipants.isValid
                        }
                        helperText={inputValidator.maxParticipants.errorMessage}

                    />
                    <TextField
                        margin="dense"
                        label="Category"
                        select
                        name="category"
                        fullWidth
                        onChange={handleInputChange}
                        value={selectedMeetup?.category}
                    >
                        {MeetupCategories.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>   
                    <TextField
                        margin="dense"
                        label="Date"
                        type="datetime-local"
                        name="date"
                        fullWidth
                        value={selectedMeetup?.date}
                        onChange={handleInputChange}
                        readOnly
                        // error={inputValidator.meetupDate || false}
                    />
                </ListItem>
                <ListItem button onClick={() => setIsParticipantVisible(!isParticipantVisible)}>
                    <ListItemText primary="Participants list"/>
                    {isParticipantVisible ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={isParticipantVisible} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {selectedMeetup.participants.map((participant, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <FaceIcon/>
                                </ListItemIcon>
                                <ListItemText primary={participant}/>
                                {/* <ListItemSecondaryAction>
                                    <Button
                                        edge="end"
                                        onClick={() => handleRemoveParticipant(participant)}
                                    >
                                        remove participant
                                    </Button> 
                                </ListItemSecondaryAction> */}
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                    <Button onClick={handleSave}>Apply changes</Button>
                    <Button onClick={handleDelete}>Delete meetup</Button>
                    <Button onClick={handleClose}>Close</Button>
                <Divider/>
            </List>
        </Grow>
    )
}