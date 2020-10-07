/* Libraries */
import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';

export const SnackbarPopup = ({open, onClose, severity, text, autoHideDuration = 6000}) => (
    <Snackbar open={open} onClose={onClose} autoHideDuration={autoHideDuration}>
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
