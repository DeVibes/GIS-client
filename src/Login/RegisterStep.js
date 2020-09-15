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
import { setUsername,
    setPassword,
    setName,
    setPhone,
    setLoginData,
} from '../StateManagement/actions/loginData'
import { setSnack } from '../StateManagement/actions/snackPopup'

/* Services */
import { createNewUser } from '../Services/CreateNewUser'

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

export const RegisterStep = ({ stepChange }) => {
    let loginData = useSelector(({ loginData }) => loginData)

    /// True means error
    const [inputValidator, setInputValidator] = useState({
        username: null,
        password: null,
        personName: null,
        phone: null
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
            case fields.username:
                if (isUsernameValid(value))
                    setInputValidator({...inputValidator, [name]: false})
                else 
                    setInputValidator({...inputValidator, [name]: true})
                setUsername(value)
                break;
            case fields.password:
                if (isPasswordValid(value))
                    setInputValidator({...inputValidator, [name]: false})
                else 
                    setInputValidator({...inputValidator, [name]: true})
                setPassword(value)
                break;
            case fields.personName:
                if (isNameValid(value))
                    setInputValidator({...inputValidator, [name]: false})
                else 
                    setInputValidator({...inputValidator, [name]: true})
                setName(value)
                break;
            case fields.phone:
                if (isPhoneValid(value))
                    setInputValidator({...inputValidator, [name]: false})
                else 
                    setInputValidator({...inputValidator, [name]: true})
                setPhone(value)
                break;
            default: break; 
        }
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
                            error={inputValidator.username || false}
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
                            error={inputValidator.password || false}
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
                            error={inputValidator.personName || false}
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
                            error={inputValidator.phone || false}
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
