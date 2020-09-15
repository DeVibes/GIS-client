export const getUserByUsername = async (username, password) => {
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
        return {
            message: `Hello ${responseData.personName}`,
            data: responseData
        }
    } 
}