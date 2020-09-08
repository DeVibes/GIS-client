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

/* Functions */
import { setMeetupName, 
    setMeetupCat,
    setMeetupDate,
    setMeetupAddress,
    setMeetup
} from '../StateManagement/actions/selectedMeetup'
import { addMeetup } from '../StateManagement/actions/userMeetups'
import { isNameValid,
    isCategoryValid
} from "../Validation/newMeetupValidation"


export const MeetupDialog = () => {
    let selectedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)

    /// True means error
    const [inputValidator, setInputValidator] = useState({
        meetupName: null,
        meetupCategory: null,
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
            case `meetupCategory`: 
                if (!isCategoryValid(value)) 
                    setInputValidator({...inputValidator, [name]: true})
                else
                    setInputValidator({...inputValidator, [name]: false})
                setMeetupCat(value); 
                break;
            case `meetupDate`: setMeetupDate(value); break;
            case `meetupAddress`: setMeetupAddress(value); break;
            default: break;
            }
    }

    const handleClose = () => setMeetup(null)

    const handleSubmit = () => {
        if (isFormValid()) {
            addMeetup(selectedMeetup)
            handleClose()
        }
    }

    return (
        <Dialog
            open = {Boolean(selectedMeetup)}
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
                    defaultValue="2020-09-01T10:30"
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
