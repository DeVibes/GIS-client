export const createNewUser = async (user) => {
    try {
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
    } catch (error) {
        throw new Error(error)
    }

}

export const authUser = async (username, password) => {
    try {
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
            return responseData
        } 
    } catch (error) {
        throw new Error(error)
    }
}

export const getUserDataByUsername = async (username) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/users/${username}`, {
            mode: 'cors',
        })
        const responseData = await response.json()
        if (response.status === 401 || response.status === 404)
            throw new Error(responseData)
        else {
            return responseData
    
        } 
    } catch (error) {
        throw new Error(error)        
    }
}

export const updateUser = async (userData) => {
    console.log(`Service ~ update user - ${userData._id}:`)
    console.log(userData)

    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/users/${userData._id}`, {
            mode: 'cors',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
    
        if (response.status !== 200) {
            throw new Error(`Error in updating meetup`)
        }
    
        else {
            const updatedUser = await response.json()
            console.log(`Service ~ update user, done`)
            return updatedUser
        }
    } catch (error) {
        throw new Error(error)        
    }
}