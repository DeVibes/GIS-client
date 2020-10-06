export const drawerReducer = (state = false, action) => {
    switch (action.type) {
        case `SET_IS_DRAWER_OPEN`:
            return action.payload;
        default:
            return state;
    }
}