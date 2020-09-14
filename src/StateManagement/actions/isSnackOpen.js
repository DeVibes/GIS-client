import store from '../store'

export const setSnackState = isOpen => {
    console.log(`UPDATED IS SNACK OPEN STATE!`)
    console.log(isOpen)
    store.dispatch({
        type: `SET_IS_SNACK_OPEN`,
        payload: isOpen
    })
}