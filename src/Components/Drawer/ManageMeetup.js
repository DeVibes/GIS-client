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
    ListItem, ListItemText, Collapse, ListItemIcon, Tooltip, IconButton 
} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

/* Components */
import { MeetupCategories } from '../../Data/MeetupCategories'
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { discardMilliseconds } from '../../Data/Date'

/* Redux */
import { setIsManage } from '../../StateManagement/actions/manageMeetup'
import { setSelectedMeetup } from '../../StateManagement/actions/selectedMeetup'
import { setSnack } from '../../StateManagement/actions/snackPopup'
import { setMeetups } from '../../StateManagement/actions/meetups'
import { setIsPopupOpen } from '../../StateManagement/actions/isPopupOpen'
import { setIsDrawerOpen } from '../../StateManagement/actions/isDrawerOpen';

/* Services */
import { deleteMeetupById, getAllMeetups, editMeetup } from '../../Services/Meetups'

/* Validation */
import { isNameValid, isMaxParticipantsValid } from "../../Validation/newMeetupValidation"

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
    date: {
        isValid: null,
        errorMessage: null
    }
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
                isValid = isMaxParticipantsValid(value, selectedMeetup.participants.length)
                if (!isValid)
                    errorMessage = `Cannot set max participants value below current participants count`
                break; 
            case `date`:
                isValid = Boolean(value)
                break;
            default: break;
        }
        if (!isValid && !Boolean(errorMessage)) errorMessage = `Incorrect value`
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
                setIsDrawerOpen(false)
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
            await deleteMeetupById(selectedMeetup._id)
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
    
    return (
        <Grow in={isManageOpen} timeout={1000}>
            <List subheader={<ListSubheader>Manage meetup</ListSubheader>}>
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
                        error={inputValidator.date.isValid == null ? false :!inputValidator.date.isValid}
                        helperText={inputValidator.date.errorMessage}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        name="description"
                        fullWidth
                        multiline
                        rowsMax={4}
                        value={selectedMeetup?.description || ``}
                        onChange={handleInputChange}
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
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                <ListItem style={{display: 'flex', justifyContent: 'space-between'}}>
                    <section>
                        <Tooltip title="Close" >
                            <IconButton onClick={() => handleClose()} color="primary">
                                <CloseIcon/>
                            </IconButton>
                        </Tooltip>
                    </section>
                    <section>
                        <Tooltip title="Delete" >
                            <IconButton onClick={() => handleDelete()} color="secondary">
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Save">
                            <IconButton onClick={() => handleSave()} color="primary">
                                <DoneIcon/>
                            </IconButton>
                        </Tooltip>
                    </section>
                </ListItem>
                <Divider/>
            </List>
        </Grow>
    )
}