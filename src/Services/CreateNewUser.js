
export const createNewUser = async (user) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/users`, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })

    if (response.status === 500)
        throw new Error(`user creation error`)
    else {
        const userSaved = await response.json()
        console.log(userSaved)
        return userSaved
    }
}
