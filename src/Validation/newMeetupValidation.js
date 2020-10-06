export const isNameValid = (name) => {
    if (name === `` || name == null) return false
    return true
} 

export const isCategoryValid = (category) => {
    if (category === `` || category == null) return false
    return true
}

export const isMaxParticipantsValid = (newValue, currentParticipantsNumber) => {
    if (!Boolean(newValue)) return false
    return newValue >= currentParticipantsNumber
}