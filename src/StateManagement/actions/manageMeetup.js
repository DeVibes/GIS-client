import store from '../store'

export const setIsManage = isOpen => {
    console.log(`Redux ~ setting manage meetup ${isOpen}`)
    store.dispatch({
        type: `SET_MANAGE_MEETUP`,
        payload: isOpen
    })
}