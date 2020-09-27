/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Dialog, 
    DialogContent, 
    DialogTitle, 
    Divider, 
    TextField, 
    Typography, 
    List, 
    ListItem, 
    ListSubheader, 
    Grid, 
    DialogActions,
    Button } 
from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

/* Redux */
import { setIsProfileOpen } from '../../StateManagement/actions/isProfileOpen'
import { setUserData } from '../../StateManagement/actions/userData'
import { setSnack } from '../../StateManagement/actions/snackPopup'

/* Services */
import { updateUser } from '../../Services/Users'

/* Validation */
import { isNameValid } from "../../Validation/userValidation"
import { isPhoneValid } from "../../Validation/userValidation"

const styles = makeStyles((theme) => ({
    addressesContainer: {
        maxHeight: `20vh`,
        overflow: `auto`
    },
    textField: {
        
    }
}))

const initialInputValidationState = {
    personName: {
        isValid: null,
        errorMessage: null
    },
    phone: {
        isValid: null,
        errorMessage: null
    },
}

export const ProfileDialog = () => {
    /* Redux states */
    let isProfileOpen = useSelector(({isProfileOpen}) => isProfileOpen)
    let userData = useSelector(({ userData }) => userData )

    /* Local states */
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

    const handleClose = () => {
        setIsProfileOpen(false)
        setInputValidator(initialInputValidationState)
    }

    // const handleAddMeetup = () => {
    //     //TODO add meetup on saved location
    //     console.log(`object`)
    // }

    const handleSave = async () => {
        if (isFormValid()) {
            try {
                const updatedUser = await updateUser(userData);
                setUserData(updatedUser)
                setSnack({
                    isSnackOpen: true,
                    msg: `Done`,
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
    }

    const handleInputChange = (e) => {
        let { name, value } = e.target
        let isValid = true
        let errorMessage = null

        switch (name) {
            case `personName`: 
                isValid = isNameValid(value)
                break; 
            case `phone`:
                isValid = isPhoneValid(value)
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
        setUserData({
            ...userData,
            [name]: value
        })
    }

    return (
        <Dialog
            open={isProfileOpen}
            onClose={handleClose}
        >
            <DialogTitle>Edit profile</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Personal information</Typography>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    label="Username"
                    type="text"
                    name="username"
                    fullWidth
                    InputProps={{
                        readOnly: true
                    }}
                    value={userData?.username}
                    disabled
                />
                <TextField 
                    variant="outlined"
                    margin="normal"
                    label="Name"
                    type="text"
                    name="personName"
                    fullWidth
                    value={userData?.personName}
                    onChange={handleInputChange}
                    error={
                        inputValidator.personName.isValid == null ? false :!inputValidator.personName.isValid
                    }
                    helperText={inputValidator.personName.errorMessage}
                />
                <TextField 
                    variant="outlined"
                    margin="normal"
                    label="Phone"
                    type="number"
                    name="phone"
                    fullWidth
                    value={userData?.phone}
                    onChange={handleInputChange}
                    error={
                        inputValidator.phone.isValid == null ? false :!inputValidator.phone.isValid
                    }
                    helperText={inputValidator.phone.errorMessage}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Back</Button>
                <Button onClick={() => handleSave()}>Save changes</Button>
            </DialogActions>
        </Dialog>
    )
}

// const Address = ({ address, classes, handleAddMeetup }) => (
//         <div className={classes.addressesContainer}>
//             {address.map((address, index) => (
//                 <Grid container justify="flex-start" key={index}>
//                     <Grid item>
//                         <TextField 
//                             variant="outlined"
//                             margin="normal"
//                             label="Name"
//                             type="text"
//                             name="name"
//                             value={address.name}
//                         />
//                     </Grid>
//                     <Grid item>
//                         <TextField 
//                             variant="outlined"
//                             margin="normal"
//                             label="Address"
//                             type="text"
//                             name="address"
//                             value={address.fullAddress}
//                         />
//                     </Grid>
//                     <Grid item>
//                         <Button onClick={() => handleAddMeetup()}>
//                             Add event
//                         </Button>
//                     </Grid>
//                 </Grid>
//             ))}
//         </div>
// )
