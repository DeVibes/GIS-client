export const GetLocationByCoords = async (lat, lng) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`, {mode: 'cors'})
    .then(response => response.json())
    .then(responseJson => {
        return responseJson.results[0].formatted_address
    })
}