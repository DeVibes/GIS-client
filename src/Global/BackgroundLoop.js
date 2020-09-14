/* Libraires */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import backgroundLoop from '../Assets/loop.mp4'

const styles = makeStyles({
    loginWrapper: {
        minHeight: `100vh`,
        overflow: `hidden`,
        background: `black`,
    },
    video: {
        height: `100vh`,
        width: `100vw`,
        objectFit: `cover`,
        opacity: 0.8,
    }
})

export const BackgroundLoop = () => {
    const classes = styles()

    return (
        <div className={classes.loginWrapper}>
            <video className={classes.video} autoPlay="autolay" loop="loop" muted>
                <source src={backgroundLoop} type="video/mp4"/>
            </video>
        </div>
    )
}
