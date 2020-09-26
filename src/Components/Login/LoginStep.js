/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { Card, 
    TextField, 
    CardContent, 
    Typography, 
    CardActions, 
    Button,
    Grid } 
from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

/* Redux */
import { setLoginData } from '../../StateManagement/actions/loginData'
import { setSnack } from '../../StateManagement/actions/snackPopup'

/* Services */
import { authUser } from '../../Services/Users'

/* Validation */
import { isUsernameValid, isPasswordValid } from '../../Validation/userValidation';

export const LoginStep = ({ stepChange }) => {
    /* Redux states */
    let loginData = useSelector(({ loginData }) => loginData)
    
    const initialInputValidationState = {
        username: {
            isValid: Boolean(loginData?.username) ? true : null,
            errorMessage: null
        }, 
        password: {
            isValid: null,
            errorMessage: null
        },
    }

    /* Local states */
    const [inputValidator, setInputValidator] = useState(initialInputValidationState)

    let history = useHistory()

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
            case `username`:
                isValid = isUsernameValid(value)
                break;
            case `password`:
                isValid = isPasswordValid(value)
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

    const handleSubmit = async () => {  
        if (isFormValid()) {
            try {
                const userResponse = await authUser(loginData.username, loginData.password)
                localStorage.setItem(`loginUser`, userResponse.username)
                setLoginData(null)
                setSnack({
                    isSnackOpen: true,
                    msg: `Hi ${userResponse.personName}`,
                    isError: false
                })
                setInputValidator(initialInputValidationState)

                history.push(`/map`)
                
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
                    Login
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
                            name="username"
                            fullWidth
                            onChange={handleInputChange}
                            value={loginData?.username}
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
                            name="password"
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
