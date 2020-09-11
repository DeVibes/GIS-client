export const dialogReducer = (state = false, action) => {
    switch (action.type) {
        case `SET_IS_OPEN`:
            return action.payload;
        default:
            return state;
    }
}