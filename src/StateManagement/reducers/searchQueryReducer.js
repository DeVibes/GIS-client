const initialSearchState = {
    searchString: ``,
    searchResults: [],
}

export const searchQueryReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case `SET_SEARCH_STRING`:
            return {
                ...state,
                searchString: action.payload
            }
        case `SET_SEARCH_RESULT`:
            return {
                ...state,
                searchResults: action.payload
            }
        case `SET_SEARCH_OBJECT`:
            return action.payload
        case `RESET_SEARCH_OBJECT`:
            return initialSearchState
        default:
            return state;
    }
}