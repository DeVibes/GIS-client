/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, 
    ListSubheader, 
    Grow,
    TextField,
    MenuItem 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import { MeetupCategories } from '../../Data/MeetupCategories'

const styles = makeStyles((theme) => ({
    manageMeetup: {
        padding: theme.spacing(0, 2, 0, 2)
    }
}))

export const ManageMeetup = () => {
    /* Redux states */
    let selectedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)

    let isOnEdit = true

    const classes = styles()
    
    return (
        <Grow in={isOnEdit} timeout={1000}>
            <>
                <ListSubheader>Edit meetup</ListSubheader>
                <div className={classes.manageMeetup}>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        name="name"
                        fullWidth
                        value={selectedMeetup?.name}
                        // onChange={handleInputChange}
                        // error={
                        //     inputValidator.addressNickName.isValid == null ? false : !inputValidator.addressNickName.isValid
                        // }
                        // helperText={inputValidator.addressNickName.errorMessage}

                    />
                    <TextField
                        margin="dense"
                        label="Max attendants"
                        type="number"
                        name="maxAttendants"
                        fullWidth
                        value={selectedMeetup?.maxAttendants}
                        // onChange={handleInputChange}
                        // error={
                        //     inputValidator.addressNickName.isValid == null ? false : !inputValidator.addressNickName.isValid
                        // }
                        // helperText={inputValidator.addressNickName.errorMessage}

                    />
                    <TextField
                        margin="dense"
                        label="Category"
                        select
                        name="category"
                        fullWidth
                        // onChange={handleInputChange}
                        value={selectedMeetup?.category}
                    >
                        {MeetupCategories.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>   
                    <TextField
                        margin="dense"
                        label="Date"
                        type="datetime-local"
                        name="date"
                        fullWidth
                        readOnly
                        value={selectedMeetup?.date}
                        // error={inputValidator.meetupDate || false}
                        // onChange={handleInputChange}
                    /> 
                    <Button>Apply changes</Button>
                    <Button>Delete button</Button>
                </div>
            </>
        </Grow>
    )
}