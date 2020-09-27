import store from '../store'

export const setIsDialogOpen = isOpen => {
    console.log(`Redux ~ setting is dialog open - ${isOpen}`)
    store.dispatch({
        type: `SET_IS_DIALOG_OPEN`,
        payload: isOpen
    })
}