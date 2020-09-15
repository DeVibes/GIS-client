export const initialSnackState = {
    isSnackOpen: false,
    msg: null,
    isError: false
}

export const snackReducer = (state = initialSnackState, action) => {
    switch (action.type) {
        case `SET_IS_SNACK_OPEN`:
            return {
                ...state,
                isSnackOpen: action.payload
            }
        case `SET_SNACK_MSG`:
            return {
                ...state,
                msg: action.payload
            }
        case `SET_SNACK_IS_ERROR`:
            return {
                ...state,
                isError: action.payload
            }
        case `SET_SNACK`:
            return action.payload;
        default:
            return state;
    }
}