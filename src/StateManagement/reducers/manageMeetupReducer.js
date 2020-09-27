export const manageMeetupReducer = (state = false, action) => {
    switch (action.type) {
        case `SET_MANAGE_MEETUP`:
            return action.payload;
        default:
            return state;
    }
}