import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk'
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { orderReducer } from "./orderReducer";

const composedEnhancers = compose(applyMiddleware(thunkMiddleware));

const store = configureStore({
    reducer: {
        cartReducer,
        authReducer,
        orderReducer
    },
    composedEnhancers
})

export default store;

