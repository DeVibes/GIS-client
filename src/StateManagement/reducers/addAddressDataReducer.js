export const initAddAddressData = {
    isOpen: false,
    addressNickname: '',
}

export const addAddressDataReducer = (state = initAddAddressData, action) => {
    switch (action.type) {
        case `SET_ADD_ADDRESS`:
            return action.payload;
        case `RESET_ADD_ADDRESS`:
            return initAddAddressData;
        case `SET_ADD_ADDRESS_FLAG`:
            return {
                ...state,
                isOpen: action.payload
            }
        case `SET_ADD_ADDRESS_NAME`:
            return {
                ...state,
                addressNickname: action.payload
            }
        default: return state;
    }
}