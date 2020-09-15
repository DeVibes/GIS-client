import store from '../store'

export const setUsername = username => {
    console.log(`LOGIN USERNAME STATE CHANGED`)
    console.log(username)
    store.dispatch({
        type: `SET_USERNAME`,
        payload: username
    })
}

export const setPassword = password => {
    console.log(`PASSWORD STATE CHANGED`)
    console.log(password)
    store.dispatch({
        type: `SET_PASSWORD`,
        payload: password
    })
}

export const setName = name => {
    console.log(`NAME STATE CHANGED`)
    console.log(name)
    store.dispatch({
        type: `SET_PERSON_NAME`,
        payload: name
    })
}

export const setPhone = phone => {
    console.log(`PHONE STATE CHANGED`)
    console.log(phone)
    store.dispatch({
        type: `SET_PHONE`,
        payload: phone
    })
}

export const setLoginData = loginData => {
    console.log(`LOGIN DATA STATE CHANGED`)
    console.log(loginData)
    store.dispatch({
        type: `SET_LOGIN_DATA`,
        payload: loginData
    })
}