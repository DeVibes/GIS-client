import { setUserData } from '../StateManagement/actions/userData'

export const createNewUser = async (user) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/users`, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    const responseData = await response.json()
    if (response.status === 500)
        throw new Error(responseData)
    else {
        console.log(responseData)
        return {
            userCreated: responseData,
            message: "User created successfully"
        }
    }
}

export const authUser = async (username, password) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/users/${username}`, {
        mode: 'cors',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            password: password
        })
    })
    const responseData = await response.json()
    if (response.status === 401 || response.status === 404)
        throw new Error(responseData)
    else {
        console.log(responseData)
        return responseData
    } 
}

export const getUserDataByUsername = async (username) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/users/${username}`, {
        mode: 'cors',
    })
    const responseData = await response.json()
    if (response.status === 401 || response.status === 404)
        throw new Error(responseData)
    else {
        setUserData({
            username: responseData.username,
            personName: responseData.personName,
            phone: responseData.phone,
            coords: {
                lat: 31.963358630236876,
                lng: 34.80391502380371
            },
        })
    } 
}