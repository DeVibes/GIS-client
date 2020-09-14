/* Libraires */
import React from 'react'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import { LoginForm } from '../Login/LoginForm'
import { BackgroundLoop } from '../Global/BackgroundLoop'
import { SnackbarPopup } from '../Global/SnackbarPopup';

/* Functions */
import { setSnackState } from '../StateManagement/actions/isSnackOpen'

const pageStyle = makeStyles({
    loginWrapper: {
        display: `flex`,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export const LoginPage = () => {
    const isSnackOpen = useSelector(({ isSnackOpen }) => isSnackOpen)
    const { loginWrapper } = pageStyle()

    const handleSnackClose = () => setSnackState(false)

    return (
        <div className={loginWrapper}>
            <LoginForm/>
            <BackgroundLoop/>
            <SnackbarPopup 
                open={isSnackOpen} 
                onClose={handleSnackClose} 
                severity="success"
            >
                User saved  
            </SnackbarPopup>
        </div>
    )
}

