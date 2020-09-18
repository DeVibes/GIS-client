export const initialMeetupState = {
    name: ``,
    category: ``,
    date: ``,
    address: ``,
    coords: {
        lat: 0,
        lng: 0
    },
    admin: ``,
    attendants: [],
    maxAttendants: 0
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
        case `SET_MEETUP_ADMIN`:
            return {
                ...state,
                admin: action.payload
            }
        case `SET_MEETUP_MAX_ATTANDANTS`:
            return {
                ...state,
                latLng: action.payload
            }
        case `SET_MEETUP_ATTENDANTS`:
            if (Boolean(action.payload)) {
                return {
                    ...state,
                    attendants: [...state.attendants, action.payload]
                }
            }
            else {
                let newAttendants = state.attendants.filter(attendant => attendant !== action.payload)
                return { 
                    ...state,
                    attendants: newAttendants
                }
            }
        case `SET_MEETUP`:
            return action.payload;
        default:
            return state;
    }
}