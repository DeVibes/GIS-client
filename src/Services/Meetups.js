export const postNewMeetup = async (meetup) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/meetups`, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetup)
    })
    if (response.status === 500)
        throw new Error(response.message)
    else 
        return await response.json()
}

export const getAllMeetups = async (filterOptions) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/meetups`, {
        mode: 'cors',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filterOptions)
    })
    const responseData = await response.json()
    if (response.status === 500)
        throw new Error(responseData)
    return responseData
}

export const editMeetup = async (meetupId, updatedMeetup) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/meetups/${meetupId}`, {
        mode: 'cors',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMeetup)
    })

    if (response.status !== 200)
        throw new Error(`Error in updating meetup`)
    else {
        const updatedMeetup = await response.json()
        return updatedMeetup
    }
}

export const deleteMeetupById = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/meetups/${id}`, {
        mode: 'cors',
        method: 'DELETE',
    })

    const responseJson = await response.json()
    return true
}