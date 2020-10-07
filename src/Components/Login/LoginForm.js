/* Libraries */
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

/* Components */
import { WelcomeStep } from './WelcomeStep'
import { LoginStep } from './LoginStep'
import { RegisterStep } from './RegisterStep'

const styles = makeStyles((theme) => {
    const mobileWidth = theme.breakpoints.down('xs')
    const desktopWidth = theme.breakpoints.up('sm')
    
    return {
        formWrapper: {
            position: 'absolute',
            zIndex: 100,
            width: `30vw`,
            [mobileWidth]: {
                width: `70vw`
            },
            backgroundColor: `transparent`,
            padding: theme.spacing(2),

        }
    }
})

/*  
    Steps 
    0 - welcome
    1 - login
    2 - register
*/

export const LoginForm = () => {
    const [activeStep, setActiveStep] = useState(0)
    const classes = styles()
    const handleStepChange = (newStep) => setActiveStep(newStep)

    return (
        <section className={classes.formWrapper}>
            <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
            >
                <WelcomeStep stepChange={handleStepChange}/>
                <LoginStep stepChange={handleStepChange}/>
                <RegisterStep stepChange={handleStepChange}/>
            </SwipeableViews>
        </section>
    )
}