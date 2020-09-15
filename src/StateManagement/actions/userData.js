import store from '../store'

export const setUserName = coords => {
    console.log(`USER COORDS STATE CHANGED`)
    console.log(coords)
    store.dispatch({
        type: `SET_USER_COORDS`,
        payload: coords
    })
}

export const setUserMeetups = meetups => {
    console.log(`USER MEETUPS STATE CHANGED (SET)`)
    console.log(meetups)
    store.dispatch({
        type: `SET_MEETUPS`,
        payload: [...meetups]
    })
}

export const addUserMeetup = meetup => {
    console.log(`USER MEETUPS STATE CHANGED (ADD)`)
    console.log(meetup)
    store.dispatch({
        type: `ADD_MEETUP`,
        payload: meetup
    })
}

export const setPersonName = name => {
    console.log(`PERSON NAME STATE CHANGED`)
    console.log(name)
    store.dispatch({
        type: `SET_PERSON_NAME`,
        payload: name
    })
}

export const setUserPhone = phone => {
    console.log(`USER PHONE STATE CHANGED`)
    console.log(phone)
    store.dispatch({
        type: `SET_USER_PHONE`,
        payload: phone
    })
}

export const setUserAddress = address => {
    console.log(`USER ADDRESS STATE CHANGED`)
    console.log(address)
    store.dispatch({
        type: `SET_USER_COORDS`,
        payload: address
    })
}

export const setUserCoords = coords => {
    console.log(`USER COORDS STATE CHANGED`)
    console.log(coords)
    store.dispatch({
        type: `SET_USER_COORDS`,
        payload: coords
    })
}

export const setUserData = data => {
    console.log(`USER DATA STATE CHANGED`)
    console.log(data)
    store.dispatch({
        type: `SET_USER_DATA`,
        payload: data
    })
}

