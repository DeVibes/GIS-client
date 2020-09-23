export const profileReducer = (state = false, action) => {
    switch (action.type) {
        case `SET_IS_PROFILE_OPEN`:
            return action.payload;
        default:
            return state;
    }
}