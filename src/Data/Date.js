export const getCurrentDate = () => {
    let currentDate = new Date()
    currentDate = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)).toISOString()
    return discardMilliseconds(currentDate)
}

export const discardMilliseconds = date => (
    date.substring(0, date.indexOf(':', date.indexOf(':')+1))
)