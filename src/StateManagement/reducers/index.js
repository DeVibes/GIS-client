import { combineReducers } from "redux"

import { addressesReducer } from "./addressesReducer"
import { addAddressDataReducer } from "./addAddressDataReducer"
import { dialogReducer } from "./dialogReducer"
import { loginDataReducer } from "./loginDataReducer"
import { manageMeetupReducer } from "./manageMeetupReducer"
import { meetupsReducer } from "./meetupsReducer"
import { meetupsFiltersReducer } from "./meetupsFiltersReducer"
import { popupReducer } from "./popupReducer"
import { profileReducer } from "./profileOpenReducer"
import { searchQueryReducer } from "./searchQueryReducer"
import { selectedMeetupReducer } from "./selectedMeetupReducer"
import { snackReducer } from "./snackReducer"
import { userDataReducer } from "./userDataReducer"

export default combineReducers({
    addAddressData: addAddressDataReducer,
    isDialogOpen: dialogReducer,
    isManageOpen: manageMeetupReducer,
    isAddressesOpen: addressesReducer,
    isPopupOpen: popupReducer,
    isProfileOpen: profileReducer,
    loginData: loginDataReducer,
    meetups: meetupsReducer,
    meetupsFilters: meetupsFiltersReducer,
    searchQuery: searchQueryReducer,
    selectedMeetup: selectedMeetupReducer,
    snackPopup: snackReducer,
    userData: userDataReducer,
})

