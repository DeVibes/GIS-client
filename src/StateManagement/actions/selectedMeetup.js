import store from '../store'

export const setMeetupPoint = meetupPoint => {
    console.log(`UPDATED STATE! - ${meetupPoint}`)
    store.dispatch({
        type: `SET_CLICKED_POINT`,
        payload: meetupPoint
    })
}

export const setMeetupName = meetupName => {
    console.log(`UPDATED STATE! - ${meetupName}`)
    store.dispatch({
        type: `SET_MEETUP_NAME`,
        payload: meetupName,
    })
}

export const setMeetupCat = meetupCat => {
    console.log(`UPDATED STATE! - ${meetupCat}`)
    store.dispatch({
        type: `SET_MEETUP_CATEGORY`,
        payload: meetupCat,
    })
}

export const setMeetupDate = meetupDate => {
    console.log(`UPDATED STATE! - ${meetupDate}`)
    store.dispatch({
        type: `SET_MEETUP_DATE`,
        payload: meetupDate,
    })
}

export const setMeetupAddress = meetupAddress => {
    console.log(`UPDATED STATE! - ${meetupAddress}`)
    store.dispatch({
        type: `SET_MEETUP_ADDRESS`,
        payload: meetupAddress,
    })
}

export const setMeetupCoords = meetup => {
    console.log(`UPDATED STATE! - ${meetup}`)
    store.dispatch({
        type: `SET_MEETUP_COORDS`,
        payload: meetup,
    })
}

export const setMeetup = meetup => {
    console.log(`UPDATED STATE! - ${meetup}`)
    store.dispatch({
        type: `SET_MEETUP`,
        payload: meetup,
    })
}