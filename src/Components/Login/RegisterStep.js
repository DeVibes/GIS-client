/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, 
    CardContent, 
    Typography, 
    CardActions, 
    Button, 
    TextField, 
    Grid, makeStyles, Paper } 
from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PhoneIcon from '@material-ui/icons/Phone';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

/* Redux */
import { setPassword, setLoginData } from '../../StateManagement/actions/loginData'
import { setSnack } from '../../StateManagement/actions/snackPopup'

/* Services */
import { createNewUser } from '../../Services/Users'

/* Validation */
import { isUsernameValid,
    isPasswordValid,
    isNameValid,
    isPhoneValid 
} from '../../Validation/userValidation';

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

const styles = makeStyles((theme) => {
    return {
        header: {
            color: `white`,
            marginBottom: theme.spacing(2)
        },
        input: {
            alignItems: `flex-end`,
            backgroundColor: `white`,
            margin: `${theme.spacing(1)}px 0`,
            padding: `${theme.spacing(0)}px ${theme.spacing(2)}px`,
            borderRadius: 5
        },
        paper: {
            background: `rgba(244, 244, 245, 0.18)`,
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `space-between`,
            padding: theme.spacing(5),
            boxShadow: `0 0 20px rgba(0,0,0,0.75)`
        },
        buttons: {
            display: `flex`,
            marginTop: theme.spacing(2),
            justifyContent: `space-around`
        },
    }
})

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

    const classes = styles()

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
        // <Card>
        //     <CardContent>
        //         <Typography variant="h5" align="center" className={classes.header}>
        //             New user registration
        //         </Typography>
        //         <Grid container spacing={1} className={classes.input}>
        //             <Grid item xs={2}>
        //                 <PersonIcon/>
        //             </Grid>
        //             <Grid item xs={10}>
        //                 <TextField
        //                     margin="dense"
        //                     label="Username"
        //                     error={
        //                         inputValidator.username.isValid == null ? false : !inputValidator.username.isValid
        //                     }
        //                     helperText={inputValidator.username.errorMessage}
        //                     type="text"
        //                     name={fields.username}
        //                     fullWidth
        //                     onChange={handleInputChange}
        //                 />
        //             </Grid>
        //         </Grid>
        //         <Grid container spacing={1} className={classes.input}>
        //             <Grid item xs={2}>
        //                 <VpnKeyIcon/>
        //             </Grid>
        //             <Grid item xs={10}>               
        //                 <TextField
        //                     margin="dense"
        //                     label="Password"
        //                     error={
        //                         inputValidator.password.isValid == null ? false : !inputValidator.password.isValid
        //                     }
        //                     helperText={inputValidator.password.errorMessage}
        //                     type="password"
        //                     name={fields.password}
        //                     fullWidth
        //                     onChange={handleInputChange}
        //                 />
        //             </Grid>
        //         </Grid>
        //         <Grid container spacing={1} className={classes.input}>
        //             <Grid item xs={2}>
        //                 <AssignmentIndIcon/>
        //             </Grid>
        //             <Grid item xs={10}>
        //                 <TextField
        //                     margin="dense"
        //                     label="Name"
        //                     error={
        //                         inputValidator.personName.isValid == null ? false : !inputValidator.personName.isValid
        //                     }
        //                     helperText={inputValidator.personName.errorMessage}
        //                     type="text"
        //                     name={fields.personName}
        //                     fullWidth
        //                     onChange={handleInputChange}
        //                 />
        //             </Grid>
        //         </Grid>
        //         <Grid container spacing={1} className={classes.input}>
        //             <Grid item xs={2}>
        //                 <PhoneIcon/>
        //             </Grid>
        //             <Grid item xs={10}>
        //                 <TextField
        //                     margin="dense"
        //                     label="Phone"
        //                     error={
        //                         inputValidator.phone.isValid == null ? false : !inputValidator.phone.isValid
        //                     }
        //                     helperText={inputValidator.phone.errorMessage}
        //                     type="text"
        //                     name={fields.phone}
        //                     fullWidth
        //                     onChange={handleInputChange}                    
        //                 />
        //             </Grid>
        //         </Grid>
        //     </CardContent>
        //     <CardActions style={{justifyContent: `flex-end`}}>
        //         <Button color="primary" onClick={() => stepChange(0)}>Back</Button>
        //         <Button color="primary" onClick={handleSubmit}>Submit</Button>
        //     </CardActions>
        // </Card>
        <Paper
            className={classes.paper}
            elevation={0}
        >
            <Typography variant="h5" align="center" className={classes.header}>
                New user registration
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
                    name={fields.username}
                    fullWidth
                    onChange={handleInputChange}
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
                    name={fields.password}
                    fullWidth
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid container spacing={1} className={classes.input}>
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
            <Grid container spacing={1} className={classes.input}>
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
