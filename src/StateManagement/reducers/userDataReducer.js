export const initialDataState = {
    name: ``,
    address: ``,
    meetups: [],
    coords: {
        lat: ``,
        lng: ``
    }
}

export const userDataReducer = (state = initialDataState, action) => {
    switch (action.type) {
        case `SET_MEETUPS`:
            return {
                ...state,
                meetups: action.payload
            }
        case `ADD_MEETUP`:
            return {
                ...state,
                meetups: [...state.meetups, action.payload]
            }
        case `SET_USER_COORDS`:
            return {
                ...state,
                coords: action.payload
            }
        default:
            return state;
    }
}