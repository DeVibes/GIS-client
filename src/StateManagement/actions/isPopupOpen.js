import store from '../store'

export const setIsPopupOpen = isOpen => {
    console.log(`UPDATED IS POPUP OPEN STATE!`)
    console.log(isOpen)
    store.dispatch({
        type: `SET_IS_POPUP_OPEN`,
        payload: isOpen
    })
}