export const initialDataState = {
    username: ``,
    // meetups: [],
    personName: ``,
    phone: ``,
    address: ``,
    coords: {
        lat: 0,
        lng: 0
    }
}

export const userDataReducer = (state = initialDataState, action) => {
    switch (action.type) {
        case `SET_USERNAME`:
            return {...state, coords: action.payload }
        case `SET_MEETUPS`:
            return {...state, meetups: action.payload }
        // case `ADD_MEETUP`:
        //     debugger
        //     let meetups = state.meetups
        //     meetups.push(action.payload)
        //     return {...state, meetups: meetups }
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