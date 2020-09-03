import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@material-ui/core';

import { MeetupCategories } from '../Data/MeetupCategories'

export const NewMeetupPopup = ({ open, onClose, onSubmit, newCoords }) => {
    const [meetupDetails, setMeetupDetails] = useState({
        meetupId: 2,
        meetupName: null,
        meetupCategory: null,
        meetupDate: null,
        meetupAdress: null,
        meetupCords: newCoords
    }) 

    // True means error
    const [inputValidator, setInputValidator] = useState({
        meetupName: null,
        meetupCategory: null,
        meetupDate: false
    })

    const handleSubmit = () => {
        if (isInputValid()) onSubmit(meetupDetails)
    }

    
    const isInputValid = () => {
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

    const handleInputChange = (e) => {
        let { name, value } = e.target

        setMeetupDetails({
            ...meetupDetails,
            [name]: value,
            meetupCords: newCoords
        })

        if (!value) {
            setInputValidator({
                ...inputValidator,
                [name]: true
            })
        }
        else {
            setInputValidator({
                ...inputValidator,
                [name]: false
            })
        }
    }

    return (
        <Dialog
            open = {open}
            onClose = {onClose}
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
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
                <Button onClick={handleSubmit} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
}
