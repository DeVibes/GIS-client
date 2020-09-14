import store from '../store'

export const setSnackState = isOpen => {
    console.log(`UPDATED IS SNACK OPEN STATE!`)
    console.log(isOpen)
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
    console.log(`UPDATED SNACK STATE!`)
    console.log(data)
    store.dispatch({
        type: `SET_SNACK`,
        payload: data
    })
}