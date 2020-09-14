/* Libraires */
import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    card: {
        background: `radial-gradient(circle, rgba(63,96,251,1) 0%, rgba(124,70,252,1) 100%)`
    },
    header: {
        color: `FFFFFF`
    },
})

export const WelcomeStep = ({ stepChange }) => {
    const classes = styles()


    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h4" align="center" className={classes.header}>
                    Welcome
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => stepChange(2)}>New user?</Button>
                <Button onClick={() => stepChange(1)}>Login in</Button>
            </CardActions>
        </Card>
    )
}
