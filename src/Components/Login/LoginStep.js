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
    Grid, Paper, makeStyles } 
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

const styles = makeStyles((theme) => {
    return {
        header: {
            color: `white`,
            marginBottom: theme.spacing(2)
        },
        subHeader: {
            color: theme.palette.secondary.main
        },
        buttons: {
            display: `flex`,
            marginTop: theme.spacing(2),
            justifyContent: `space-around`
        },
        paper: {
            background: `rgba(244, 244, 245, 0.18)`,
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `space-between`,
            padding: theme.spacing(5),
            boxShadow: `0 0 20px rgba(0,0,0,0.75)`
        },
        input: {
            alignItems: `flex-end`,
            backgroundColor: `white`,
            margin: `${theme.spacing(1)}px 0`,
            padding: `${theme.spacing(0)}px ${theme.spacing(2)}px`,
            borderRadius: 5
        }
    }
})

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

    const classes = styles()

    return (
        <Paper
            className={classes.paper}
            elevation={0}
        >
            <Typography variant="h4" align="center" className={classes.header}>
                Please log in
            </Typography>
            <Grid container spacing={1} className={classes.input}>
                <TextField
                    margin="dense"
                    label="Username"
                    error={
                        inputValidator.username.isValid == null ? false : !inputValidator.username.isValid
                    }
                    helperText={inputValidator.username.errorMessage}
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                    value={loginData?.username || ''}
                    color="primary"
                    fullWidth
                />
            </Grid>
            <Grid container spacing={1} className={classes.input}>
                <TextField
                    margin="dense"
                    label="Password"
                    error={
                        inputValidator.password.isValid == null ? false : !inputValidator.password.isValid
                    }
                    helperText={inputValidator.password.errorMessage}
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    color="primary"
                    fullWidth

                />
            </Grid>
            <Grid container spacing={1} className={classes.buttons}>
                <Grid item xs={6}>
                    <Button 
                        onClick={() => stepChange(0)}
                        variant="contained"
                        fullWidth
                        color="primary"
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                        color="primary"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}
