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
import { setLoginData } from '../StateManagement/actions/loginData'
import { setSnack } from '../StateManagement/actions/snackPopup'
import { setUserData } from '../StateManagement/actions/userData'

/* Services */
import { authUser } from '../Services/Users'

/* Validation */
import { isUsernameValid, isPasswordValid } from '../Validation/userValidation';

export const LoginStep = ({ stepChange }) => {
    let loginData = useSelector(({ loginData }) => loginData)
    let history = useHistory()

    const [inputValidator, setInputValidator] = useState({
        username: Boolean(loginData?.username) ? true : null, 
        password: null,
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

    const handleInputChange = (e) => {
        let { name, value } = e.target
        let isValid

        switch (name) {
            case `username`:
                isValid = isUsernameValid(value)
                break;
            case `password`:
                isValid = isPasswordValid(value)
                break;
            default: break;
        }
        setInputValidator({...inputValidator, [name]: isValid})
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
                                inputValidator.username == null ? false : !inputValidator.username
                            }
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
                                inputValidator.password == null ? false : !inputValidator.password
                            }
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
