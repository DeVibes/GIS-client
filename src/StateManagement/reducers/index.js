import { combineReducers } from "redux"

import { dialogReducer } from "./dialogReducer"
import { loginDataReducer } from "./loginDataReducer"
import { meetupsReducer } from "./meetupsReducer"
import { meetupsFiltersReducer } from "./meetupsFiltersReducer"
import { popupReducer } from "./popupReducer"
import { profileReducer } from "./profileOpenReducer"
import { searchQueryReducer } from "./searchQueryReducer"
import { selectedMeetupReducer } from "./selectedMeetupReducer"
import { snackReducer } from "./snackReducer"
import { userDataReducer } from "./userDataReducer"

export default combineReducers({
    meetups: meetupsReducer,
    selectedMeetup: selectedMeetupReducer,
    userData: userDataReducer,
    loginData: loginDataReducer,
    isDialogOpen: dialogReducer,
    isProfileOpen: profileReducer,
    isPopupOpen: popupReducer,
    snackPopup: snackReducer,
    searchQuery: searchQueryReducer,
    meetupsFilters: meetupsFiltersReducer
})

