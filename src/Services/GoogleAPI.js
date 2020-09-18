export const getAddressByCoords = async (lat, lng) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/address?lat=${lat}&lng=${lng}`, {mode: 'cors'})
        const address = await response.text()
        return address
    } catch (error) {
        console.log(error)
    }
}