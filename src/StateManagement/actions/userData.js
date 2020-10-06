import store from '../store'

export const setUserId = id => {
    console.log(`Redux ~ setting user id ${id}`)
    store.dispatch({
        type: `SET_USER_ID`,
        payload: id
    })
}

export const setUserName = username => {
    console.log(`Redux ~ setting user name ${username}`)
    store.dispatch({
        type: `SET_USERNAME`,
        payload: username
    })
}

export const setUserSavedAddress = addresses => {
    console.log(`Redux ~ setting user saved addresses`)
    console.log([...addresses])
    store.dispatch({
        type: `SET_SAVED_ADDRESSES`,
        payload: [...addresses]
    })
}

export const setPersonName = name => {
    console.log(`Redux ~ setting user person name ${name}`)
    store.dispatch({
        type: `SET_PERSON_NAME`,
        payload: name
    })
}

export const setUserPhone = phone => {
    console.log(`Redux ~ setting user phone ${phone}`)
    store.dispatch({
        type: `SET_USER_PHONE`,
        payload: phone
    })
}

export const setUserAddress = address => {
    console.log(`Redux ~ setting user address ${address}`)
    store.dispatch({
        type: `SET_USER_COORDS`,
        payload: address
    })
}

export const setUserCoords = coords => {
    console.log(`Redux ~ setting user coords`)
    console.log(coords)
    store.dispatch({
        type: `SET_USER_COORDS`,
        payload: coords
    })
}

export const setUserData = data => {
    console.log(`Redux ~ setting user data`)
    console.log(data)
    store.dispatch({
        type: `SET_USER_DATA`,
        payload: data
    })
}

export const resetUserDate = () => {
    console.log(`Redux ~ reseting user data`)
    store.dispatch({
        type: `RESET_USER_DATA`,
        payload: null
    })
}

