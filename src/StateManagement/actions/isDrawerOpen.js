import store from '../store'

export const setIsDrawerOpen = isOpen => {
    console.log(`Redux ~ setting is drawer open - ${isOpen}`)
    store.dispatch({
        type: `SET_IS_DRAWER_OPEN`,
        payload: isOpen
    })
}