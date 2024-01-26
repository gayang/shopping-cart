import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import PaginationQuery from "../../types/Pagination";
import FilterQuery from "../../types/Filters";
import { ProductsReducerState } from "../../types/ProductsReducerState";

import Category from "../../types/Category";
import CategoryReducerState from "../../types/CategoryReducerState";

const baseURL = "http://localhost:8080/api/v1/";

export const initialState: CategoryReducerState = {
    categories: [],
    loading: false,
    category: null,
   
}

// export const fetchAllProductAsync = createAsyncThunk(
//     'fetchAllProductAsync',
//     async (filters: FilterQuery) => {
//         try {
//             const jsonData = await fetch( baseURL + `products?${filters}`)
//             const data: Product[] = await jsonData.json()
//             return data
//         } catch (e) {
//             const error = e as Error
//             return error
//         }
//     }
// )
//FETCH CATEGORY
export const fetchByCategoryAsync = createAsyncThunk(
    'fetchByCategoryAsync',
    async () => {
        try {
            const result = await axios.get<Category>( baseURL + `categories`);
            if (!result) {
                throw new Error("Selected cetegory not found..")
            }
            return result.data
        }
        catch (e) {
            const error = e as Error
            return error.message
        }
    }
)
//FETCH BYCATEGORYID
export const fetchByCategoryIdAsync = createAsyncThunk(
    'fetchByCategoryIdAsync',
    async (categoryId: string) => {
        try {
            const result = await axios.get<Category[]>( baseURL + `categories/${categoryId}/products`);
            if (!result) {
                throw new Error("Selected cetegory not found..")
            }
            return result.data
        }
        catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

const categorySlice = createSlice(
    {
        name: 'category',
        initialState,

        reducers: {
            selectCategory: (state, action) => {
                state.selectedCategory = action.payload;
            },
           
        },

        //extraReducer: place to listen from the other async dispatch
        extraReducers: (builder) => { 
            
            //byCategoryId
             builder.addCase(fetchByCategoryAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    return {
                        ...state,
                        fetchByCategoryAsync: action.payload,
                        loading: false
                     }
                 }
            })
            builder.addCase(fetchByCategoryAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            
            builder.addCase(fetchByCategoryAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.message
                    }
                }
            })
        }
    }
) 

const categoryReducer = categorySlice.reducer 

export const { selectCategory } = categorySlice.actions
export default categoryReducer