/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Divider, Grow, List, ListItem, ListItemText, ListSubheader, TextField, Typography } from '@material-ui/core'

/*Components */
import { MeetupCategories } from '../../Data/MeetupCategories'
import { getCurrentDate } from '../../Data/Date'


/* Redux */
import { setIsAddressesOpen } from '../../StateManagement/actions/isAddressesOpen'
import { setUserSavedAddress } from '../../StateManagement/actions/userData'
import { setSnack } from '../../StateManagement/actions/snackPopup'
import { setSelectedMeetup } from '../../StateManagement/actions/selectedMeetup'
import { setIsDialogOpen } from '../../StateManagement/actions/isDialogOpen'

/* Services */
import { updateUser } from '../../Services/Users'

export const SavedAddress = () => {
    /* Redux states */
    let isAddressesOpen = useSelector(({ isAddressesOpen }) => isAddressesOpen)
    let userSavedAddresses = useSelector(({ userData }) => userData.savedAddresses)
    let userId = useSelector(({ userData }) => userData.id)
    let username = useSelector(({ userData }) => userData.username)

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
        let editedAddressIndex = userSavedAddresses.findIndex(addressObj => addressObj._id === isOnEdit._id)
        userSavedAddresses[editedAddressIndex] = isOnEdit

        try {
            const updatedUser = await updateUser({
                id: userId, 
                savedAddresses: userSavedAddresses
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
        let newSavedAddress = userSavedAddresses.filter(addressObj => addressObj._id !== isOnEdit._id)
        try {
            const updatedUser = await updateUser({
                id: userId, 
                savedAddresses: newSavedAddress
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
                <List subheader={<ListSubheader>Saved addresses</ListSubheader>}>
                    {userSavedAddresses.length > 0 ? 
                        userSavedAddresses.map((addressObj, index) => (
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
                            <Typography variant="h5">No addresses yet</Typography>
                        </ListItem>
                    }
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
                            <ListItem>
                                <Button onClick={() => handleCreate()}>Create meetup</Button>
                                <Button onClick={() => handleDelete()}>Delete address</Button>
                                <Button onClick={() => handleSubmit()}>Save changes</Button>
                            </ListItem>
                        </List>
                    </Grow>
                    <Divider/>
                </>
            )}
        </>
    )
}
