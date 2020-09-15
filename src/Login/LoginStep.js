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
import { setUsername, setPassword } from '../StateManagement/actions/loginData'
import { setSnack } from '../StateManagement/actions/snackPopup'
import { setUserData } from '../StateManagement/actions/userData'

/* Services */
import { getUserByUsername } from '../Services/GetUserByUsername'

/* Validation */
import { isUsernameValid, isPasswordValid } from '../Validation/userValidation';

export const LoginStep = ({ stepChange }) => {
    let loginData = useSelector(({ loginData }) => loginData)
    let history = useHistory()

    // True means error
    const [inputValidator, setInputValidator] = useState({
        username: Boolean(loginData.username) ? false : null, 
        password: null,
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

    const handleInputChange = (e) => {
        let { name, value } = e.target

        switch (name) {
            case `username`:
                if (isUsernameValid(value))
                    setInputValidator({...inputValidator, [name]: false})
                else 
                    setInputValidator({...inputValidator, [name]: true})
                setUsername(value)
                break;
            case `password`:
                if (isPasswordValid(value))
                    setInputValidator({...inputValidator, [name]: false})
                else 
                    setInputValidator({...inputValidator, [name]: true}) 
                setPassword(value)
                break;
            default: break;
        }
    }

    const handleSubmit = async () => {  
        if (isFormValid()) {
            try {
                const userResponse = await getUserByUsername(loginData.username, loginData.password)
                setUserData({
                    username: userResponse.username,
                    personName: userResponse.personName,
                    phone: userResponse.phone,
                })
                setSnack({
                    isSnackOpen: true,
                    msg: userResponse.message,
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
                            error={inputValidator.username || false}
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
                            error={inputValidator.password || false}
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
