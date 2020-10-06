export const meetupsReducer = (state = [], action) => {
    switch (action.type) {
        case `SET_MEETUPS`:
            return action.payload;
        case `ADD_MEETUP`:
            return [...state, action.payload]
        case `DELETE_MEETUP`:
            let modifiedMeetups = state.filter((meetup) => meetup._id !== action.payload)
            return modifiedMeetups
        case `UPDATE_MEETUP`:
            let meetups = state
            let oldIndex = meetups.findIndex((meetup) => meetup._id === action.payload._id)
            meetups[oldIndex] = action.payload
            return meetups
        case `RESET_MEETUPS`:
            return [];
        default:
            return state;
    }
}