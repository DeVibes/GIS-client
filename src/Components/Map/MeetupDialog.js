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
import { MeetupCategories } from '../../Data/MeetupCategories'
import { initialMeetupState } from '../../StateManagement/reducers/selectedMeetupReducer'

/* Redux */
import { setSelectedMeetup } from '../../StateManagement/actions/selectedMeetup'
import { setIsDialogOpen } from "../../StateManagement/actions/isDialogOpen";
import { resetSearchQuery } from "../../StateManagement/actions/searchQuery";

/* Services */
import { postNewMeetup } from '../../Services/Meetups'

/* Validation */
import { isNameValid } from "../../Validation/newMeetupValidation"

const initialInputValidationState = {
    name: {
        isValid: null,
        errorMessage: null
    },
    maxAttendants: {
        isValid: null,
        errorMessage: null
    },
}


export const MeetupDialog = () => {
    /* Redux states */
    let selectedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)
    let isDialogOpen = useSelector(({ isDialogOpen }) => isDialogOpen)

    /* Local states */
    const [inputValidator, setInputValidator] = useState(initialInputValidationState)

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
    const handleInputChange = (e) => {
        let { name, value } = e.target
        let isValid = true
        let errorMessage = null

        switch (name) {
            case `name`: 
                isValid = isNameValid(value)
                break; 
            case `maxAttendants`:
                isValid = Boolean(value)
                break; 
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

    const handleClose = () => {
        setSelectedMeetup(initialMeetupState)
        setInputValidator(initialInputValidationState)
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
                        inputValidator.name.isValid == null ? false :!inputValidator.name.isValid
                    }
                    helperText={inputValidator.name.errorMessage}
                    type="text"
                    name="name"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    label="Max attendants"
                    error={
                        inputValidator.maxAttendants.isValid == null ? false :!inputValidator.maxAttendants.isValid
                    }
                    helperText={inputValidator.maxAttendants.errorMessage}
                    type="number"
                    name="maxAttendants"
                    fullWidth
                    onChange={handleInputChange}
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
                    readOnly
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
