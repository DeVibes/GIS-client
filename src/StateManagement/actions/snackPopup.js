import store from '../store'

export const setSnackState = isOpen => {
    console.log(`Redux ~ setting snack is open - ${isOpen}`)
    store.dispatch({
        type: `SET_IS_SNACK_OPEN`,
        payload: isOpen
    })
}

export const setSnackMsg = msg => {
    console.log(`UPDATED SNACK MSG STATE!`)
    console.log(msg)
    store.dispatch({
        type: `SET_SNACK_MSG`,
        payload: msg
    })
}

export const setSnackIsError = isError => {
    console.log(`UPDATED SNACK MSG STATE!`)
    console.log(isError)
    store.dispatch({
        type: `SET_SNACK_IS_ERROR`,
        payload: isError
    })
}

export const setSnack = data => {
    console.log(`Redux ~ setting snack`)
    console.log(data)
    store.dispatch({
        type: `SET_SNACK`,
        payload: data
    })
}