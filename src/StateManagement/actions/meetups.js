import store from '../store'

export const setMeetupsAction = meetups => {
    console.log(`USER MEETUPS STATE CHANGED (SET)`)
    console.log(meetups)
    store.dispatch({
        type: `SET_MEETUPS`,
        payload: [...meetups]
    })
}

export const addMeetup = meetup => {
    console.log(`USER MEETUPS STATE CHANGED (ADD)`)
    console.log(meetup)
    store.dispatch({
        type: `ADD_MEETUP`,
        payload: meetup
    })
}