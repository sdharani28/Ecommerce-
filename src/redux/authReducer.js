const initialState = {
    user: JSON.parse(localStorage.getItem("user")) ?? {}
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'USER_AUTHENTICATE': {
            return {
                ...state,
                user: action.payload
            }
        }
        case 'LOGOUT': {
            localStorage.removeItem('user');
            return {
                ...state,
                user: {}
            }
        }

        default: return {...state}
    }
}

