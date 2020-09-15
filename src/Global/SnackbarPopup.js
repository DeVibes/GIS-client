/* Libraries */
import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';

export const SnackbarPopup = ({open, onClose, severity, text}) => (
    <Snackbar open={open} onClose={onClose} autoHideDuration={6000}>
        <MuiAlert 
            onClose={onClose} 
            severity={severity === true ? "error" : "success"}
            elevation={6} 
            variant="filled"
        >
            {text}
        </MuiAlert>
    </Snackbar>
)
