import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './reducers/productsReducer';

import { CartItem } from "../types/CartItem";
import cartReducer from "./reducers/cartReducer";
import usersReducer from "./reducers/usersReducer";
import categoryReducer from "./reducers/categoryReducer";

const preCartReducer: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

const store = configureStore({
    reducer: {
        productsReducer,
        cartReducer,
        usersReducer,
        categoryReducer
    },
    preloadedState: {
        cartReducer: preCartReducer
    }
})

const updateLocalStorage = () => {
    const cart = store.getState().cartReducer;
    localStorage.setItem('cart', JSON.stringify(cart));
}
store.subscribe(updateLocalStorage);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;