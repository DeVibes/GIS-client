export const initialMeetupState = {
    id: ``,
    name: ``,
    category: ``,
    date: ``,
    address: ``,
    coords: {
        lat: 0,
        lng: 0
    },
    admin: ``,
    participants: [],
    maxParticipants: 0,
    description: ``,
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
        case `SET_MEETUP_PARTICIPANTS`:
            if (Boolean(action.payload)) {
                return {
                    ...state,
                    participants: [...state.participants, action.payload]
                }
            }
            else {
                let newParticipants = state.participants.filter(participant => participant !== action.payload)
                return { 
                    ...state,
                    participants: newParticipants
                }
            }
        case `SET_MEETUP`:
            return action.payload;
        case `RESET_MEETUP`:
            return initialMeetupState;
        default:
            return state;
    }
}