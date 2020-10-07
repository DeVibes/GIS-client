export const postNewMeetup = async (meetup) => {
    try {
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
    } catch (error) {
        throw new Error(error)
    }
}

export const getAllMeetups = async (filterOptions) => {
    try {
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
    } catch (error) {
        throw new Error(error)
    }
}

export const editMeetup = async (meetupId, updatedMeetup) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/meetups/${meetupId}`, {
            mode: 'cors',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMeetup)
        })
    
        if (response.status !== 200)
            throw new Error(`Error in updating meetup`)
        else 
            return await response.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteMeetupById = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/meetups/${id}`, {
            mode: 'cors',
            method: 'DELETE',
        })
    
        if (response.status !== 200)
            throw new Error(`Error in updating user`)
        else 
            return await response.json()
    } catch (error) {
        throw new Error(error)
    }
}