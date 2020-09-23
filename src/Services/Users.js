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
            id: responseData._id,
            username: responseData.username,
            personName: responseData.personName,
            phone: responseData.phone,
            coords: {
                lat: 31.963358630236876,
                lng: 34.80391502380371
            },
            savedAddresses: responseData.savedAddress || []
        })
    } 
}

export const updateUser = async (userData) => {
    console.log(`Service ~ update user - ${userData.id}:`)
    console.log(userData)

    const response = await fetch(`${process.env.REACT_APP_SERVER}/users/${userData.id}`, {
        mode: 'cors',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })

    if (response.status !== 200) {
        console.log(`Error in updating meetup`)
        return false
    }

    else {
        const updatedUser = await response.json()

        console.log(`Service ~ update user, done`)
        console.log(updatedUser)

        setUserData(updatedUser)

        return true
    }
}