export const popupReducer = (state = false, action) => {
    switch (action.type) {
        case `SET_IS_POPUP_OPEN`:
            return action.payload;
        default:
            return state;
    }
}