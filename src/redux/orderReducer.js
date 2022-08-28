const initialState = {
    orders: []
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDERS': {
            localStorage.setItem('orders', JSON.stringify(action.payload));
            return {
                ...state,
                orders: action.payload
            }
        }
        default: return {...state}
    }
}

