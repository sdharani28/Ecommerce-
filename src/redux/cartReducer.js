const initialState = {
    // cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? []
    cartItems: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CART_ITEMS': {
            localStorage.setItem('cartItems', JSON.stringify(action.payload));
            return {
                ...state,
                cartItems: action.payload
            }
        }
        case 'ADD_TO_CART': {
            return{
                ...state,
                cartItems : [...state.cartItems, action.payload]
            }
        }
        case 'DELETE_FROM_CART': {
            return{
                ...state,
                cartItems : state.cartItems.filter(obj=>obj.id!==action.payload.id)
            }
        }

        default: return state
    }
}

