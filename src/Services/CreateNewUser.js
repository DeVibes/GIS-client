
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
