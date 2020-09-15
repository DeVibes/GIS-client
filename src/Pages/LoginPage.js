/* Libraries */
import React from 'react'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import { LoginForm } from '../Login/LoginForm'
import { BackgroundLoop } from '../Global/BackgroundLoop'
import { SnackbarPopup } from '../Global/SnackbarPopup';

/* Functions */
import { setSnackState } from '../StateManagement/actions/snackPopup'

const pageStyle = makeStyles({
    loginWrapper: {
        display: `flex`,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export const LoginPage = () => {
    const snackPopup = useSelector(({ snackPopup }) => snackPopup)
    const { loginWrapper } = pageStyle()

    const handleSnackClose = () => setSnackState(false)

    return (
        <div className={loginWrapper}>
            <LoginForm/>
            <BackgroundLoop/>
            <SnackbarPopup 
                open={snackPopup.isSnackOpen} 
                onClose={handleSnackClose} 
                severity={snackPopup.isError}
                text={snackPopup.msg}
            />
        </div>
    )
}

