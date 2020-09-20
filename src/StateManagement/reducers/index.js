import { combineReducers } from "redux"

import { dialogReducer } from "./dialogReducer"
import { loginDataReducer } from "./loginDataReducer"
import { popupReducer } from "./popupReducer"
import { meetupsReducer } from "./meetupsReducer"
import { selectedMeetupReducer } from "./selectedMeetupReducer"
import { snackReducer } from "./snackReducer"
import { userDataReducer } from "./userDataReducer"
import { searchQueryReducer } from "./searchQueryReducer"

export default combineReducers({
    meetups: meetupsReducer,
    selectedMeetup: selectedMeetupReducer,
    userData: userDataReducer,
    loginData: loginDataReducer,
    isDialogOpen: dialogReducer,
    isPopupOpen: popupReducer,
    snackPopup: snackReducer,
    searchQuery: searchQueryReducer
})

