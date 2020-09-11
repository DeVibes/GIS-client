import store from '../store'

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

export const setUserCoords = coords => {
    console.log(`USER COORDS STATE CHANGED`)
    console.log(coords)
    store.dispatch({
        type: `SET_USER_COORDS`,
        payload: coords
    })
}