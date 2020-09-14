export const isUsernameValid = (username) => usernameRegex.test(username) 

export const isPasswordValid = (password) => passwordRegex.test(password)

export const isNameValid = (name) => nameRegex.test(name)

export const isPhoneValid = (phone) => phoneRegex.test(phone)

const usernameRegex = new RegExp(`^[a-zA-Z0-9]{8,20}$`) 
const passwordRegex = new RegExp(`^[a-zA-Z0-9]{8,20}$`) 
const nameRegex = new RegExp(`^[a-zA-Z0-9_-]{1,20}$`) 
const phoneRegex = new RegExp(`^[0-9]{10}$`) 