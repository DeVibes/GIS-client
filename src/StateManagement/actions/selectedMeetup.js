import store from '../store'

export const setMeetupPoint = meetupPoint => {
    console.log(`Redux ~ setting meetup coord`)
    console.log(meetupPoint)
    store.dispatch({
        type: `SET_CLICKED_POINT`,
        payload: meetupPoint
    })
}

export const setMeetupName = meetupName => {
    console.log(`Redux ~ setting meetup name - ${meetupName}`)
    store.dispatch({
        type: `SET_MEETUP_NAME`,
        payload: meetupName,
    })
}

export const setMeetupCat = meetupCat => {
    console.log(`Redux ~ setting meetup category ${meetupCat}`)
    store.dispatch({
        type: `SET_MEETUP_CATEGORY`,
        payload: meetupCat,
    })
}

export const setMeetupDate = meetupDate => {
    console.log(`Redux ~ setting meetup date ${meetupDate}`)
    store.dispatch({
        type: `SET_MEETUP_DATE`,
        payload: meetupDate,
    })
}

export const setMeetupAddress = meetupAddress => {
    console.log(`Redux ~ setting meetup address ${meetupAddress}`)
    store.dispatch({
        type: `SET_MEETUP_ADDRESS`,
        payload: meetupAddress,
    })
}

export const setMeetupCoords = coords => {
    console.log(`Redux ~ setting meetup coords ${coords}`)
    store.dispatch({
        type: `SET_MEETUP_COORDS`,
        payload: coords,
    })
}

export const setMeetupAdmin = admin => {
    console.log(`Redux ~ setting meetup admin ${admin}`)
    store.dispatch({
        type: `SET_MEETUP_ADMIN`,
        payload: admin,
    })
}

export const setMeetupMaxParticipants = number => {
    console.log(`Redux ~ setting meetup max participants${number}`)
    store.dispatch({
        type: `SET_MEETUP_MAX_PARTICIPANTS`,
        payload: number,
    })
}

export const setMeetupPartipant = participant => {
    console.log(`Redux ~ setting meetup participant ${participant}`)
    store.dispatch({
        type: `SET_MEETUP_PARTICIPANTS`,
        payload: participant
    })
}

export const setSelectedMeetup = meetup => {
    console.log(`Redux ~ setting selected meetup`)
    console.log(meetup)
    store.dispatch({
        type: `SET_MEETUP`,
        payload: meetup,
    })
}

export const resetSelecedMeetup = () => {
    console.log(`Redux ~ reseting selected meetup details`)
    store.dispatch({
        type: `RESET_MEETUP`,
        payload: null,
    })
}