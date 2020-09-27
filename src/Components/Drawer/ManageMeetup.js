/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, 
    ListSubheader, 
    Grow,
    TextField,
    MenuItem, 
    List,
    ListItem, ListItemText, Collapse, ListItemSecondaryAction, Checkbox 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import { MeetupCategories } from '../../Data/MeetupCategories'
import { ExpandLess, ExpandMore } from '@material-ui/icons';

/* Redux */
import { setIsManage } from '../../StateManagement/actions/manageMeetup'
import { setSelectedMeetup } from '../../StateManagement/actions/selectedMeetup'

/* Services */
import { deleteMeetupById } from '../../Services/Meetups'

const styles = makeStyles((theme) => ({
    manageMeetup: {
        display: 'flex',
        flexDirection: 'column'
    }
}))

export const ManageMeetup = () => {
    /* Redux states */
    let selectedMeetup = useSelector(({ selectedMeetup }) => selectedMeetup)
    let isManageOpen = useSelector(({ manageMeetup }) => manageMeetup)

    /* Local states */
    const [isParticipantVisible, setIsParticipantVisible] = useState(false)
    const [editedMeetup, setEditedMeetup] = useState({
        name: ``,
        maxParticipants: null,
        date: null,
        participants: []
    })


    const classes = styles()

    /* Handlers */
    const handleInputChange = (event) => {
        let { name, value } = event.target
        setEditedMeetup({
            ...selectedMeetup,
            [name]: value
        })
    }

    const handleSave = () => {
        setIsManage(!isManageOpen)
    }

    const handleDelete = async () => {
        const isDeleted = await deleteMeetupById(selectedMeetup._id)
    }
    
    return (
        <Grow in={isManageOpen} timeout={1000}>
            <List subheader={<ListSubheader>Edit meetup</ListSubheader>}>
                <ListItem className={classes.manageMeetup}>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        name="name"
                        fullWidth
                        value={selectedMeetup?.name}
                        onChange={handleInputChange}
                        // error={
                        //     inputValidator.addressNickName.isValid == null ? false : !inputValidator.addressNickName.isValid
                        // }
                        // helperText={inputValidator.addressNickName.errorMessage}

                    />
                    <TextField
                        margin="dense"
                        label="Max participants"
                        type="number"
                        name="maxParticipants"
                        fullWidth
                        value={selectedMeetup?.maxParticipants || null}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        // error={inputValidator.meetupDate || false}
                    />
                </ListItem>
                <ListItem button onClick={() => setIsParticipantVisible(!isParticipantVisible)}>
                    <ListItemText primary="Participants list"/>
                    {isParticipantVisible ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={isParticipantVisible} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {selectedMeetup.participants.map((participant, index) => (
                            <ListItem button key={index}>
                                <ListItemText primary={participant}/>
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        // onChange={handleCategoriesFilter}
                                        // checked={isParticipant(participant)}
                                        name={participant}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                    <Button onClick={handleSave}>Apply changes</Button>
                    <Button onClick={handleDelete}>Delete meetup</Button>
            </List>
        </Grow>
    )
}