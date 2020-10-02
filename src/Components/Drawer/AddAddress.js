/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Divider, Grow, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, TextField } from '@material-ui/core'

/* Redux */
import { setSnack } from '../../StateManagement/actions/snackPopup'
import { setUserData } from '../../StateManagement/actions/userData'
import { resetAddAddressData, setAddressNickName } from '../../StateManagement/actions/AddAddressData'

/* Services */
import { updateUser } from '../../Services/Users'

/* Validation */
import { isNameValid } from '../../Validation/newMeetupValidation'

export const AddAddress = () => {

    const initialInputValidationState = {
        addressNickName: {
            isValid: null,
            errorMessage: null
        },
    }

    /* Redux states */
    let { isOpen, addressNickname } = useSelector(({ addAddressData }) => addAddressData)
    let { coords, address } = useSelector(({ selectedMeetup }) => selectedMeetup)
    let { id, savedAddresses } = useSelector(({ userData }) => userData)

    /* Local states */
    const [inputValidator, setInputValidator] = useState(initialInputValidationState)

    const handleNickNameChange = (e) => {
        let { value } = e.target
        let isValid = isNameValid(value)
        let errorMessage = null
        if (!isValid) 
            errorMessage = `Incorrect value`
        setInputValidator({
            ...inputValidator, 
            addressNickName: {
                isValid: isValid,
                errorMessage: errorMessage
            }})
        setAddressNickName(value)
    }

    const isInputValid = () => {
        if (!Boolean(inputValidator.addressNickName.isValid)) {
            setInputValidator({
                ...inputValidator,
                addressNickName: {
                    isValid: false,
                    errorMessage: `Empty field`
                }
            })
            return false
        }
        return true
    }

    const handleSaveAddress = async () => {
        if (isInputValid()) {
            const response = await updateUser({
                id: id,
                savedAddresses: [...savedAddresses, {
                    nickName: addressNickname,
                    address: address,
                    coords: coords
                }]
            })
            setSnack({
                isSnackOpen: true,
                msg: `${addressNickname} is saved successfully`,
                isError: false
            })
            resetAddAddressData()
            setUserData(response)
        }
    }
    return (
        <>
            <Grow in={isOpen} timeout={1000}>
                <List subheader={<ListSubheader>Add address</ListSubheader>}>
                    <ListItem>
                        <ListItemText>
                            <TextField
                                margin="dense"
                                label="Address nickname"
                                error={
                                    inputValidator.addressNickName.isValid == null ? false : !inputValidator.addressNickName.isValid
                                }
                                helperText={inputValidator.addressNickName.errorMessage}
                                type="text"
                                name="addressNickName"
                                onChange={handleNickNameChange}
                            />
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <Button onClick={() => handleSaveAddress()}>Save it</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Grow>
            <Divider/>
        </>
    )
}