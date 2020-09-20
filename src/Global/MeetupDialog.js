/* Libraries */
import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { Dialog, 
    DialogTitle,
    DialogContent, 
    DialogActions, 
    Button, 
    TextField, 
    MenuItem 
} from '@material-ui/core';

/* Components */
import { MeetupCategories } from '../Data/MeetupCategories'
import { initialMeetupState } from '../StateManagement/reducers/selectedMeetupReducer'

/* Redux */
import { setSelectedMeetup } from '../StateManagement/actions/selectedMeetup'
import { setIsDialogOpen } from "../StateManagement/actions/isDialogOpen";
import { resetSearchQuery } from "../StateManagement/actions/searchQuery";

/* Services */
import { postNewMeetup } from '../Services/Meetups'

/* Validation */
import { isNameValid } from "../Validation/newMeetupValidation"


export const MeetupDialog = () => {
    let selectedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)
    let isDialogOpen = useSelector(({ isDialogOpen }) => isDialogOpen)

    const [inputValidator, setInputValidator] = useState({
        name: null,
        maxAttendants: null,
    })
    
    const isFormValid = () => {
        return Object.keys(inputValidator).every((key) => {
            if (inputValidator[key] !== true) {
                setInputValidator({
                    ...inputValidator,
                    [key]: false
                })
            }
            return inputValidator[key] === true
        })
    }

    /* Handlers */
    const handleInputChange = (e) => {
        let { name, value } = e.target
        let isValid = true

        switch (name) {
            case `name`: 
                isValid = isNameValid(value)
                break; 
            case `maxAttendats`:
                isValid = Boolean(value)
                break; 
            default: break;
        }
        setInputValidator({...inputValidator, [name]: isValid})
        setSelectedMeetup({
            ...selectedMeetup,
            [name]: value
        })
    }

    const handleClose = () => {
        setSelectedMeetup(initialMeetupState)
        setIsDialogOpen(false)
    }

    const handleSubmit = async () => {
        if (isFormValid()) {
            if (await postNewMeetup(selectedMeetup)) {
                resetSearchQuery()
                handleClose()
            }
        }
    }

    return (
        <Dialog
            open = {isDialogOpen}
            onClose = {handleClose}
        >
            <DialogTitle id="eventTitle">Create a new meetup</DialogTitle>
            <DialogContent>
                <TextField 
                    margin="dense"
                    label="Name"
                    error={
                        inputValidator.name == null ? false :!inputValidator.name
                    }
                    type="text"
                    name="name"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    label="Max attendants"
                    error={
                        inputValidator.maxAttendats == null ? false :!inputValidator.maxAttendats
                    }
                    type="number"
                    name="maxAttendants"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    label="Category"
                    error={
                        inputValidator.meetupCategory == null ? false :!inputValidator.meetupCategory
                    }
                    select
                    name="category"
                    fullWidth
                    onChange={handleInputChange}
                    value={selectedMeetup?.category}
                >
                    {MeetupCategories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    margin="dense"
                    label="Date"
                    error={inputValidator.meetupDate || false}
                    type="datetime-local"
                    name="date"
                    fullWidth
                    onChange={handleInputChange}
                    value={selectedMeetup?.date}
                />
                <TextField 
                    margin="dense"
                    label="Address"
                    type="text"
                    name="address"
                    fullWidth
                    InputProps={{
                        readOnly: true
                    }}
                    value={selectedMeetup?.address}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
                <Button onClick={handleSubmit} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
}
