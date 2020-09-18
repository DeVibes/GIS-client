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

export const setMeetupCoords = coords => {
    console.log(`UPDATED STATE! - ${coords}`)
    store.dispatch({
        type: `SET_MEETUP_COORDS`,
        payload: coords,
    })
}

export const setMeetupAdmin = admin => {
    console.log(`UPDATED STATE! - ${admin}`)
    store.dispatch({
        type: `SET_MEETUP_ADMIN`,
        payload: admin,
    })
}

export const setMeetupMaxAttendants = number => {
    console.log(`UPDATED STATE! - ${number}`)
    store.dispatch({
        type: `SET_MEETUP_MAX_ATTENDANTS`,
        payload: number,
    })
}

export const setMeetupAttendants = attendant => {
    console.log(`UPDATED STATE NEW ATTENDANT! - ${attendant}`)
    store.dispatch({
        type: `SET_MEETUP_ATTENDANTS`,
        payload: attendant
    })
}

export const setSelectedMeetup = meetup => {
    console.log(`UPDATED SELECTED MEETUP STATE!`)
    console.log(meetup)
    store.dispatch({
        type: `SET_MEETUP`,
        payload: meetup,
    })
}