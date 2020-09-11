import store from '../store'

export const setIsDialogOpen = isOpen => {
    console.log(`UPDATED IS DIALOG OPEN STATE!`)
    console.log(isOpen)
    store.dispatch({
        type: `SET_IS_OPEN`,
        payload: isOpen
    })
}