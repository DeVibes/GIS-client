import store from '../store'

export const setIsAddressesOpen = isOpen => {
    console.log(`Redux ~ setting is addresses open - ${isOpen}`)
    store.dispatch({
        type: `SET_IS_ADDRESSES_OPEN`,
        payload: isOpen
    })
}