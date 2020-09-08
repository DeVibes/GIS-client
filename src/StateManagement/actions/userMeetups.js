import store from '../store'

export const setMeetupsAction = meetups => {
    console.log(`UPDATED STATE! - ${meetups}`)
    store.dispatch({
        type: `SET_MEETUPS`,
        payload: [...meetups]
    })
}

export const addMeetup = meetup => {
    console.log(`UPDATED STATE! - ${meetup}`)
    store.dispatch({
        type: `ADD_MEETUP`,
        payload: meetup
    })
}