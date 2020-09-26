/* Libraries */
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

/* Components */
import { WelcomeStep } from './WelcomeStep'
import { LoginStep } from './LoginStep'
import { RegisterStep } from './RegisterStep'

const styles = makeStyles({
    formWrapper: {
        position: 'absolute',
        zIndex: 100,
        width: `30vw`
    },
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
        <div className={classes.formWrapper}>
            <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
            >
                <WelcomeStep stepChange={handleStepChange}/>
                <LoginStep stepChange={handleStepChange}/>
                <RegisterStep stepChange={handleStepChange}/>
            </SwipeableViews>
        </div>
    )
}