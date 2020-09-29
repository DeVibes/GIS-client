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
import { discardMilliseconds } from '../../Data/Date'

/* Redux */
import { setSelectedMeetup, resetSelecedMeetup } from '../../StateManagement/actions/selectedMeetup'
import { setIsDialogOpen } from "../../StateManagement/actions/isDialogOpen";
import { resetSearchQuery } from "../../StateManagement/actions/searchQuery";
import { addMeetup } from '../../StateManagement/actions/meetups'
import { setSnack } from '../../StateManagement/actions/snackPopup'

/* Services */
import { postNewMeetup } from '../../Services/Meetups'

/* Validation */
import { isNameValid } from "../../Validation/newMeetupValidation"

const initialInputValidationState = {
    name: {
        isValid: null,
        errorMessage: null
    },
    maxParticipants: {
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
            case `maxParticipants`:
                isValid = Boolean(value)
                break; 
            case `date`:
                value = discardMilliseconds(value)
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
        resetSelecedMeetup(initialMeetupState)
        setInputValidator(initialInputValidationState)
        setIsDialogOpen(false)
    }

    const handleSubmit = async () => {
        if (isFormValid()) {
            try {
                const createdMeetup = await postNewMeetup(selectedMeetup)
                addMeetup(createdMeetup)
                resetSearchQuery()
                handleClose()
                setSnack({
                    isError: false,
                    msg: `${createdMeetup.name} created successfully`,
                    isSnackOpen: true
                })
            } catch ({ message }) {
                setSnack({
                    isError: true,
                    msg: message,
                    isSnackOpen: true
                })
                
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
                    value={selectedMeetup?.name || ''}
                />
                <TextField
                    margin="dense"
                    label="Max participants"
                    error={
                        inputValidator.maxParticipants.isValid == null ? false :!inputValidator.maxParticipants.isValid
                    }
                    helperText={inputValidator.maxParticipants.errorMessage}
                    type="number"
                    name="maxParticipants"
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
