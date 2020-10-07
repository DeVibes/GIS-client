import { MeetupCategories } from '../../Data/MeetupCategories'

const initialSearchState = {
    attendance: "",
    admin: "",
    categories: MeetupCategories.map(category => category.value)
}

export const meetupsFiltersReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case `SET_ATTENDANCE`:
            return {
                ...state,
                attendance: action.payload
            }
        case `SET_ADMIN`:
            return {
                ...state,
                admin: action.payload
            }
        case `SET_CATEGORIES`:
            return {
                ...state,
                categories: action.payload
            }
        case `SET_FILTER_OPTIONS`:
            return action.payload
        case `RESET_FILTER_OPTIONS`:
            return initialSearchState
        default:
            return state;
    }
}