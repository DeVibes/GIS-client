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
import { setMeetupName, 
    setMeetupCat,
    setMeetupDate,
    setMeetupAddress,
    setMeetup
} from '../StateManagement/actions/selectedMeetup'
import { setIsDialogOpen } from "../StateManagement/actions/isDialogOpen";

/* Services */
import { postNewMeetup } from '../Services/PostNewMeetup'

/* Validation */
import { isNameValid } from "../Validation/newMeetupValidation"


export const MeetupDialog = () => {
    let selectedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)
    let isDialogOpen = useSelector(({ isDialogOpen }) => isDialogOpen)

    /// True means error
    const [inputValidator, setInputValidator] = useState({
        meetupName: null,
    })
    
    const isFormValid = () => {
        return Object.keys(inputValidator).every((key) => {
            if (inputValidator[key] !== false) {
                setInputValidator({
                    ...inputValidator,
                    [key]: true
                })
            }
            return inputValidator[key] === false
        })
    }

    /* Handlers */
    const handleInputChange = (e) => {
        let { name, value } = e.target

        switch (name) {
            case `meetupName`: 
                if (!isNameValid(value)) 
                    setInputValidator({...inputValidator, [name]: true})
                else 
                    setInputValidator({...inputValidator, [name]: false})
                setMeetupName(value); 
                break; 
            case `meetupCategory`: setMeetupCat(value); break;
            case `meetupDate`: setMeetupDate(value); break;
            case `meetupAddress`: setMeetupAddress(value); break;
            default: break;
            }
    }

    const handleClose = () => {
        setMeetup(initialMeetupState)
        setIsDialogOpen(false)
    }

    const handleSubmit = async() => {
        if (isFormValid()) {
            if (await postNewMeetup(selectedMeetup))
                handleClose()
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
                    required
                    margin="dense"
                    label="Meetup name"
                    error={inputValidator.meetupName || false}
                    type="text"
                    name="meetupName"
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    margin="dense"
                    label="Meetup category"
                    error={inputValidator.meetupCategory || false}
                    select
                    name="meetupCategory"
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
                    label="Meetup date"
                    error={inputValidator.meetupDate || false}
                    type="datetime-local"
                    name="meetupDate"
                    fullWidth
                    onChange={handleInputChange}
                    value={selectedMeetup?.date}
                />
                <TextField 
                    required
                    margin="dense"
                    label="Meetup address"
                    type="text"
                    name="meetupAddress"
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
