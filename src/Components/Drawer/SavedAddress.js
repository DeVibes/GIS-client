/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Divider, Grow, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, TextField, Tooltip, Typography } from '@material-ui/core'

/* Components */
import { MeetupCategories } from '../../Data/MeetupCategories'
import { getCurrentDate } from '../../Data/Date'
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

/* Redux */
import { setIsAddressesOpen } from '../../StateManagement/actions/isAddressesOpen'
import { setUserSavedAddress } from '../../StateManagement/actions/userData'
import { setSnack } from '../../StateManagement/actions/snackPopup'
import { setSelectedMeetup } from '../../StateManagement/actions/selectedMeetup'
import { setIsDialogOpen } from '../../StateManagement/actions/isDialogOpen'

/* Services */
import { updateUser } from '../../Services/Users'

const styles = makeStyles((theme) => {

    return {
        overflow: {
            overflow: 'auto',
            maxHeight: `40vh`
        },
        buttons: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        empty: {

        }
    }
})

export const SavedAddress = () => {
    /* Redux states */
    let isAddressesOpen = useSelector(({ isAddressesOpen }) => isAddressesOpen)
    let { savedAddresses, _id, username } = useSelector(({ userData }) => userData)

    let classes = styles()

    /* local states */
    const [isOnEdit, setIsOnEdit] = useState({
        nickName: ``,
        address: ``
    })

    /* Handlers */
    const handleAddressesClick = addressObj => {
        setIsOnEdit(addressObj)
    }

    const handleInputChange = event => {
        setIsOnEdit({
            ...isOnEdit,
            nickName: event.target.value
        })
    }

    const handleSubmit = async () => {
        let editedAddressIndex = savedAddresses.findIndex(addressObj => addressObj._id === isOnEdit._id)
        savedAddresses[editedAddressIndex] = isOnEdit

        try {
            const updatedUser = await updateUser({
                _id: _id, 
                savedAddresses: savedAddresses
            })
            setUserSavedAddress(updatedUser.savedAddresses)
            setIsOnEdit({
                nickName: ``,
                address: ``
            })
            setSnack({
                isSnackOpen: true,
                msg: `Saved successfully`,
                isError: false
            })
        } catch ({ message }) {
            setSnack({
                isSnackOpen: true,
                msg: message,
                isError: true
            })
        }
    }

    const handleDelete = async () => {
        let newSavedAddress = savedAddresses.filter(addressObj => addressObj._id !== isOnEdit._id)
        try {
            const updatedUser = await updateUser({
                _id: _id, 
                savedAddresses: newSavedAddress
            })
            setUserSavedAddress(updatedUser.savedAddresses)
            setIsOnEdit({
                nickName: ``,
                address: ``
            })
            setSnack({
                isSnackOpen: true,
                msg: `Deleted successfully`,
                isError: false
            })
        } catch ({ message }) {
            setSnack({
                isSnackOpen: true,
                msg: message,
                isError: true
            })
        }
    }

    const handleCreate = () => {
        setSelectedMeetup({
            category: MeetupCategories[0].value,
            address: isOnEdit.address,
            coords: isOnEdit.coords,
            date: getCurrentDate(),
            admin: username,
            participants: [username]
        })
        setIsOnEdit({
            nickName: ``,
            address: ``
        })
        setIsAddressesOpen(false)
        setIsDialogOpen(true)

    }

    return (
        <>
            <Grow in={isAddressesOpen} timeout={1000}>
                <List 
                    subheader={<ListSubheader className={classes.header}>Saved addresses</ListSubheader>}>
                    <div className={classes.overflow}>
                        {savedAddresses.length > 0 ? 
                            savedAddresses.map((addressObj, index) => (
                                <ListItem key={index} button
                                    onClick={() => handleAddressesClick(addressObj)}
                                >
                                    <ListItemText 
                                        primary={addressObj.nickName}
                                        secondary={addressObj.address}
                                    />
                                </ListItem>
                            ))
                            :
                            <ListItem>
                                <ListItemIcon>
                                    <NotListedLocationIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="h5">No addresses yet</Typography>
                                </ListItemText>
                            </ListItem>
                        }
                    </div>
                </List>
            </Grow>
            <Divider/>
            {Boolean(isOnEdit.nickName) && (
                <>
                    <Grow in={Boolean(isOnEdit.nickName)} timeout={1000}>
                        <List subheader={<ListSubheader>Edit saved address</ListSubheader>}>
                            <ListItem>
                                <TextField
                                    margin="dense"
                                    label="Nickname"
                                    type="text"
                                    fullWidth
                                    name="nickname"
                                    value={isOnEdit?.nickName || ``}
                                    onChange={handleInputChange}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    margin="dense"
                                    label="Address"
                                    type="text"
                                    fullWidth
                                    name="address"
                                    value={isOnEdit?.address || ``}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </ListItem>
                            <ListItem className={classes.buttons}>
                                <section>
                                    <Button onClick={() => handleCreate()} color="primary">
                                        Create meetup
                                    </Button>
                                </section>
                                <section>
                                    <Tooltip title="Delete" >
                                        <IconButton onClick={() => handleDelete()} color="secondary">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Save">
                                        <IconButton onClick={() => handleSubmit()} color="primary">
                                            <DoneIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </section>
                            </ListItem>
                        </List>
                    </Grow>
                    <Divider/>
                </>
            )}
        </>
    )
}
