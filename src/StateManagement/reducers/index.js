import { combineReducers } from "redux"

import { dialogReducer } from "./dialogReducer"
import { meetupsReducer } from "./meetupsReducer"
import { popupReducer } from "./popupReducer"
import { selectedMeetupReducer } from "./selectedMeetupReducer"
import { userDataReducer } from "./userDataReducer"

export default combineReducers({
    userMeetups: meetupsReducer,
    selectedMeetup: selectedMeetupReducer,
    isDialogOpen: dialogReducer,
    isPopupOpen: popupReducer,
    userData: userDataReducer
})

