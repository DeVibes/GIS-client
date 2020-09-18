import { addMeetup, setMeetups, updateMeetup } from '../StateManagement/actions/meetups'

export const postNewMeetup = async (meetup) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/meetups`, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetup)
    })

    if (response.status === 500)
        return false
    else {
        const meetupSaved = await response.json()
        console.log(meetupSaved)
        addMeetup(meetupSaved)
        return true
    }
}

export const getAllMeetups = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/meetups`, {mode: 'cors'})
    const responseData = await response.json()
    if (response.status === 500)
        throw new Error(responseData)
    if (responseData.length !== 0)
        setMeetups(responseData)        
}

export const editMeetup = async (meetupId, updatedMeetup) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/meetups/${meetupId}`, {
        mode: 'cors',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMeetup)
    })

    if (response.status !== 200)
        console.log(`Error in updating meetup`)
    else {
        const updatedMeetup = await response.json()
        // setMeetups(...)
        return updatedMeetup
        // updateMeetup(updatedMeetup)
    }
}

    // setMeetupsAction([
    //     {
    //         meetupId: 1,
    //         meetupName: `Mark`,
    //         meetupCategory: `cars`,
    //         meetupDate: `1/1/1`,
    //         meetupAddress: `Tsadi Gimel Banot St 42, Rishon LeTsiyon, Israel`,
    //         meetupCoords: {
    //             lat: 31.96750948533345,
    //             lng: 34.80894748150635
    //         }
    //     },
    //     {
    //         meetupId: 2,
    //         meetupName: `Leon`,
    //         meetupCategory: `games`,
    //         meetupDate: `1/1/1`,
    //         meetupAddress: `Simtat Betsal'el 9, Rishon LeTsiyon, Israel`,
    //         meetupCoords: {
    //             lat: 31.962649,
    //             lng: 34.805643
    //         }
    //     }
    // ])
