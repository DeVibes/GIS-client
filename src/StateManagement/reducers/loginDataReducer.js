export const initialLoginDataState = {
    username: ``,
    password: ``,
    personName: ``,
    phone: ``,
}

export const loginDataReducer = (state = initialLoginDataState, action) => {
    switch (action.type) {
        case `SET_USERNAME`:
            return {...state, username: action.payload }
        case `SET_PASSWORD`:
            return {...state, password: action.payload }
        case `SET_PERSON_NAME`:
            return { ...state, personName: action.payload }
        case `SET_PHONE`:
            return { ...state, phone: action.payload }
        case `SET_LOGIN_DATA`:
            return action.payload;
        default:
            return state;
    }
}