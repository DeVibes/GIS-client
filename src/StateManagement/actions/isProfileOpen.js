import store from '../store'

export const setIsProfileOpen = isOpen => {
    console.log(`Redux ~ set profile to ${isOpen}`)
    store.dispatch({
        type: `SET_IS_PROFILE_OPEN`,
        payload: isOpen
    })
}