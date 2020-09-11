import { combineReducers } from "redux"

import { dialogReducer } from "./dialogReducer"
import { meetupsReducer } from "./meetupsReducer"
import { selectedMeetupReducer } from "./selectedMeetupReducer"

export default combineReducers({
    userMeetups: meetupsReducer,
    selectedMeetup: selectedMeetupReducer,
    isDialogOpen: dialogReducer
})

