import { combineReducers } from "redux"

import { dialogReducer } from "./dialogReducer"
import { loginDataReducer } from "./loginDataReducer"
import { popupReducer } from "./popupReducer"
import { selectedMeetupReducer } from "./selectedMeetupReducer"
import { snackReducer } from "./snackReducer"
import { userDataReducer } from "./userDataReducer"

export default combineReducers({
    selectedMeetup: selectedMeetupReducer,
    userData: userDataReducer,
    loginData: loginDataReducer,
    isDialogOpen: dialogReducer,
    isPopupOpen: popupReducer,
    snackPopup: snackReducer,
})

