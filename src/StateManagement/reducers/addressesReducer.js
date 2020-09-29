export const addressesReducer = (state = false, action) => {
    switch (action.type) {
        case `SET_IS_ADDRESSES_OPEN`:
            return action.payload;
        default:
            return state;
    }
}