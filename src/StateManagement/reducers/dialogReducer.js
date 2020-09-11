export const dialogReducer = (state = false, action) => {
    switch (action.type) {
        case `SET_IS_DIALOG_OPEN`:
            return action.payload;
        default:
            return state;
    }
}