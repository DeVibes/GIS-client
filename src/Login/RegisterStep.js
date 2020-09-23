/* Libraries */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, 
    CardContent, 
    Typography, 
    CardActions, 
    Button, 
    TextField, 
    Grid } 
from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PhoneIcon from '@material-ui/icons/Phone';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

/* Redux */
import { setPassword, setLoginData } from '../StateManagement/actions/loginData'
import { setSnack } from '../StateManagement/actions/snackPopup'

/* Services */
import { createNewUser } from '../Services/Users'

/* Validation */
import { isUsernameValid,
    isPasswordValid,
    isNameValid,
    isPhoneValid 
} from '../Validation/userValidation';

const fields = {
    username: `username`,
    password: `password`,
    personName: `personName`,
    phone: `phone`,
}

const initialInputValidationState = {
    username: {
        isValid: null,
        message: null
    },
    password: {
        isValid: null,
        message: null
    },
    personName: {
        isValid: null,
        message: null
    },
    phone: {
        isValid: null,
        message: null
    }
}

export const RegisterStep = ({ stepChange }) => {
    /* Redux states */
    let loginData = useSelector(({ loginData }) => loginData)

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

    const handleInputChange = (e) => {
        let { name, value } = e.target
        let isValid = true
        let errorMessage = null

        switch (name) {
            case fields.username:
                isValid = isUsernameValid(value)
                break;
            case fields.password:
                isValid = isPasswordValid(value)
                break;
            case fields.personName:
                isValid = isNameValid(value)
                break;
            case fields.phone:
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
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleSubmit = async() => {
        if (isFormValid()) {
            try {
                const createdUser = await createNewUser(loginData)
                setSnack({
                    isSnackOpen: true,
                    msg: createdUser.message,
                    isError: false
                })
                setPassword("")
                setInputValidator(initialInputValidationState)
                stepChange(1)
            } catch ({ message }) {
                console.log(message)
                setSnack({
                    isSnackOpen: true,
                    msg: message,
                    isError: true
                })
            }
        }
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">
                    Register
                </Typography>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <PersonIcon/>
                    </Grid>
                    <Grid item>
                        <TextField
                            margin="dense"
                            label="Username"
                            error={
                                inputValidator.username.isValid == null ? false : !inputValidator.username.isValid
                            }
                            helperText={inputValidator.username.errorMessage}
                            type="text"
                            name={fields.username}
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <VpnKeyIcon/>
                    </Grid>
                    <Grid item>               
                        <TextField
                            margin="dense"
                            label="Password"
                            error={
                                inputValidator.password.isValid == null ? false : !inputValidator.password.isValid
                            }
                            helperText={inputValidator.password.errorMessage}
                            type="password"
                            name={fields.password}
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AssignmentIndIcon/>
                    </Grid>
                    <Grid item>
                        <TextField
                            margin="dense"
                            label="Name"
                            error={
                                inputValidator.personName.isValid == null ? false : !inputValidator.personName.isValid
                            }
                            helperText={inputValidator.personName.errorMessage}
                            type="text"
                            name={fields.personName}
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <PhoneIcon/>
                    </Grid>
                    <Grid item>
                        <TextField
                            margin="dense"
                            label="Phone"
                            error={
                                inputValidator.phone.isValid == null ? false : !inputValidator.phone.isValid
                            }
                            helperText={inputValidator.phone.errorMessage}
                            type="text"
                            name={fields.phone}
                            fullWidth
                            onChange={handleInputChange}                    
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={() => stepChange(0)}>Back</Button>
            </CardActions>
        </Card>
    )
}
