export const meetupsReducer = (state = [], action) => {
    switch (action.type) {
        case `SET_MEETUPS`:
            return action.payload;
        case `ADD_MEETUP`:
            return [...state, action.payload]
        default:
            return state;
    }
}