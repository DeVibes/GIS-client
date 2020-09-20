import store from '../store'

export const updateSearchString = string => {
    console.log(`Redux ~ updating search string: ${string}`)
    store.dispatch({
        type: `SET_SEARCH_STRING`,
        payload: string
    })
}

export const updateSearchResults = searchResults => {
    console.log(`Redux ~ updating search results:`)
    console.log([...searchResults])
    store.dispatch({
        type: `SET_SEARCH_RESULT`,
        payload: searchResults
    })
}

export const updateSearchQuery = searchObject => {
    console.log(`Redux ~ updating search query:`)
    console.log(searchObject)
    store.dispatch({
        type: `SET_SEARCH_OBJECT`,
        payload: searchObject
    })
}

export const resetSearchQuery = () => {
    console.log(`Redux ~ reseting search query:`)
    store.dispatch({
        type: `RESET_SEARCH_OBJECT`,
        payload: null
    })
}