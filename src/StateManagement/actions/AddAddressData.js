import store from '../store'

export const setAddAddressData = data => {
    console.log(`Redux ~ setting add address data`)
    console.log(data)
    store.dispatch({
        type: `SET_ADD_ADDRESS`,
        payload: data
    })
}

export const resetAddAddressData = () => {
    console.log(`Redux ~ reseting add address data`)
    store.dispatch({
        type: `RESET_ADD_ADDRESS`,
        payload: null
    })
}

export const setIsAddAddressOpen = isOpen => {
    console.log(`Redux ~ setting add address flag - ${isOpen}`)
    store.dispatch({
        type: `SET_ADD_ADDRESS_FLAG`,
        payload: isOpen
    })
}

export const setAddressNickName = nickname => {
    console.log(`Redux ~ setting add address name - ${nickname}`)
    store.dispatch({
        type: `SET_ADD_ADDRESS_NAME`,
        payload: nickname
    })
}