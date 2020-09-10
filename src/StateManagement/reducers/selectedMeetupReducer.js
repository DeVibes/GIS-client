export const initialMeetupState = {
    name: ``,
    category: ``,
    date: ``,
    address: ``,
    coords: {
        lat: null,
        lng: null
    }
}

export const selectedMeetupReducer = (state = initialMeetupState, action) => {
    switch (action.type) {
        case `SET_MEETUP_NAME`:
            return {
                ...state,
                name: action.payload
            }
        case `SET_MEETUP_CATEGORY`:
            return {
                ...state,
                category: action.payload
            }
        case `SET_MEETUP_DATE`:
            return {
                ...state,
                date: action.payload
            }
        case `SET_MEETUP_ADDRESS`:
            return {
                ...state,
                address: action.payload
            }
        case `SET_MEETUP_COORDS`:
            return {
                ...state,
                latLng: action.payload
            }
        case `SET_MEETUP`:
            return action.payload;
        default:
            return state;
    }
}