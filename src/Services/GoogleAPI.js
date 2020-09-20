export const getAddressByCoords = async (lat, lng) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/address?lat=${lat}&lng=${lng}`, {mode: 'cors'})
        const address = await response.text()
        return address
    } catch (error) {
        console.log(error)
    }
}

export const getAddressByString = async(searchString) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/search?searchQuery=${searchString}`)
    if (response.status === 404) 
        throw new Error(response.message)
    const responseJson = await response.json()
    if (responseJson.candidates.length === 0) 
        throw new Error(`No matches for this address`)
    return responseJson.candidates
}