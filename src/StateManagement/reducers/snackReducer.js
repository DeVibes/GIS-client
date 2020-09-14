export const snackReducer = (state = false, action) => {
    switch (action.type) {
        case `SET_IS_SNACK_OPEN`:
            return action.payload;
        default:
            return state;
    }
}