import store from '../store'

export const setAttendanceFilter = username => {
    console.log(`Redux ~ setting attendance filter ${username}`)
    store.dispatch({
        type: `SET_ATTENDANCE`,
        payload: username
    })
}

export const setMineFilter = isMine => {
    console.log(`Redux ~ setting admin filter ${isMine}`)
    store.dispatch({
        type: `SET_ADMIN`,
        payload: isMine
    })
}

export const setCategoriesFilter = categories => {
    console.log(`Redux ~ setting categories filter`)
    console.log(categories)
    store.dispatch({
        type: `SET_CATEGORIES`,
        payload: categories
    })
}

export const setFilterOptions = filters => {
    console.log(`Redux ~ setting filter options`)
    console.log(filters)
    store.dispatch({
        type: `SET_FILTER_OPTIONS`,
        payload: filters
    })
}

export const resetFilterOptions = () => {
    console.log(`Redux ~ resetting filter options`)
    store.dispatch({
        type: `RESET_FILTER_OPTIONS`,
        payload: null
    })
}