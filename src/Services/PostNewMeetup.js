import { addMeetup } from '../StateManagement/actions/meetups'

export const postNewMeetup = async(meetup) => {
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
