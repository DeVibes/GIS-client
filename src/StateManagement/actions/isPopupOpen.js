import store from '../store'

export const setIsPopupOpen = isOpen => {
    console.log(`Redux ~ setting is popup open - ${isOpen}`)
    store.dispatch({
        type: `SET_IS_POPUP_OPEN`,
        payload: isOpen
    })
}