export const initialDataState = {
    _id: ``,
    username: ``,
    personName: ``,
    phone: ``,
    address: ``,
    coords: {
        lat: 0,
        lng: 0
    },
    savedAddresses: []
}

export const userDataReducer = (state = initialDataState, action) => {
    switch (action.type) {
        case `SET_USER_ID`:
            return { ...state, _id: action.payload}
        case `SET_USERNAME`:
            return {...state, coords: action.payload }
        case `SET_SAVED_ADDRESSES`:
            return {...state, savedAddresses: action.payload }
        case `SET_PERSON_NAME`:
            return { ...state, personName: action.payload }
        case `SET_USER_PHONE`:
            return { ...state, phone: action.payload }
        case `SET_USER_ADDRESS`:
            return { ...state, address: action.payload }
        case `SET_USER_COORDS`:
            return { ...state, coords: action.payload }
        case `SET_USER_DATA`:
            return action.payload;
        default:
            return state;
    }
}