export const initialDataState = {
    username: ``,
    meetups: [],
    personName: ``,
    phone: ``,
    address: ``,
    coords: {
        lat: ``,
        lng: ``
    }
}

export const userDataReducer = (state = initialDataState, action) => {
    switch (action.type) {
        case `SET_USERNAME`:
            return {...state, coords: action.payload }
        case `SET_MEETUPS`:
            return {...state, meetups: action.payload }
        case `ADD_MEETUP`:
            return {...state, meetups: [...state.meetups, action.payload] }
        case `SET_PERSON_NAME`:
            return { ...state, coords: action.payload }
        case `SET_USER_PHONE`:
            return { ...state, coords: action.payload }
        case `SET_USER_ADDRESS`:
            return { ...state, coords: action.payload }
        case `SET_USER_COORDS`:
            return { ...state, coords: action.payload }
        case `SET_USER_DATA`:
            return action.payload;
        default:
            return state;
    }
}