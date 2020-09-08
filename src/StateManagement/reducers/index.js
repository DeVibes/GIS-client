import { combineReducers } from "redux"

// import { meetupDialogOpenReducer } from "./meetupDialogOpenReducer"
import { meetupsReducer } from "./meetupsReducer"
import { selectedMeetupReducer } from "./selectedMeetupReducer"

export default combineReducers({
    userMeetups: meetupsReducer,
    selectedMeetup: selectedMeetupReducer,
    // meetupDialogOpen: meetupDialogOpenReducer,
})

