import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../types/CartItem";
import Product from "../../types/Product";

export type CartState = {
  productInCart: Product;
  number: number;
};

const initialState : CartItem[] = [];

const cartSlice = createSlice(
    {
    name: 'cart',
        initialState,
        reducers: {
            /** */
            addItemToCart: (state, action: PayloadAction<Product>) => {
                const cartItem: CartItem = {
                    ...action.payload, quantity: 1 };
                const foundIndex = state.findIndex(item => item._id === action.payload._id);
                if(foundIndex !== -1) {
                    state[foundIndex].quantity++
                }else{
                    state.push(cartItem);  
                }
            },
            removeItemFromCart: (state, action:PayloadAction<Product>) => {
                const foundIndex = state.findIndex(item => item._id === action.payload._id);
                if(foundIndex >-1)
                    state.splice(foundIndex, 1);

            },
            increaseQuantity: (state, action: PayloadAction<Product>) => {
                const foundIndex = state.findIndex(item => item._id === action.payload._id);
                if (foundIndex > -1) {
                    state[foundIndex].quantity++
                }
            },
            decreaseQuantity: (state, action: PayloadAction<Product>) => {
                const foundIndex = state.findIndex(item => item._id === action.payload._id);
                if (foundIndex > -1) {
                    if (state[foundIndex].quantity === 1) 
                        state.splice(foundIndex, 1);
                    else state[foundIndex].quantity--;
                }
            },

            emptyCart: (state) => {
                return initialState
            }
        }
    }
)
const cartReducer = cartSlice.reducer;
export const { addItemToCart, removeItemFromCart,increaseQuantity, decreaseQuantity, emptyCart  } = cartSlice.actions
export default cartReducer;