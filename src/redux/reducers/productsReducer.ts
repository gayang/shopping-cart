import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Product from '../../types/Product';
import FilterQuery from "../../types/Filters";
import { ProductsReducerState } from "../../types/ProductsReducerState";
import CreateProductInput from "../../types/CreateProductInput";
import UpdateProductInput from "../../types/UpdateProductInput";
import Category from "../../types/Category";


const baseURL = "http://localhost:8080/api/v1/";

export const initialState: ProductsReducerState = {
    products: [],
    loading: false,
    product: null,
    error:null
    //selectedProduct: null,
}

//ALL
export const fetchAllProductAsync = createAsyncThunk(
    'fetchAllProductAsync',
    async (filters: FilterQuery) => {      
        try {
            const result = await axios.get<Product[]>( baseURL + `products?${filters}`);
            if (!result) {
                throw new Error("Selected cetegory not found..")
            }
                console.log("result.data", result.data)
                return result.data
        }
        catch (e) {
            const error = e as Error
            return error.message
        }
    }
)


//FETCH SINGLE ITEM
export const fetchSingleProductAsync = createAsyncThunk(
    'fetchSingleProductAsync',
    async (id: string) => {
        try {
            const result = await axios.get<Product>( baseURL + `products/${id}`);
            if (!result) {
                throw new Error("Selected product not found..")
            }
            return result.data
        }
        catch (e) {
            const error = e as Error
            return error.message
        }
    }
)
//DELETE ITEM
export const deleteProductAsync = createAsyncThunk(
    'deleteProductAsync',
    async (id: string) => {
        try {
            const result = await axios.delete<boolean>( baseURL + `products/${id}`)
            if (!result.data) {
                throw new Error("Somthing failed with deleting a item!")
            }
            return id
        }
        catch (e) {
            const error = e as Error
            return error.message
        }
    }
)
//CREATE
export const createProductAsync = createAsyncThunk(
    'createProductAsync',
    async (newProduct: CreateProductInput, { rejectWithValue }) => {
        try {
            const result = await axios.post<Product>( baseURL + 'products/', newProduct);
            return result.data
        }
        catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)
//UPDATE
export const updateProductAsync = createAsyncThunk(
    'updateProductAsync',
    async ( update : UpdateProductInput, { rejectWithValue }) => {
        try {
            const result = await axios.put<Product>( baseURL + `products/${update._id}`, update);
            rejectWithValue(selectProduct(update))
            return result.data
            
            const  access_token  = localStorage.getItem('access_token');
            // const authenticatedResult = await dispatch(authenticateUserAsync(access_token));

            // if (typeof authenticatedResult.payload === "string" || !authenticatedResult.payload) {
            //     throw Error(authenticatedResult.payload || "Cannot login")
            // } else {
            //     localStorage.setItem("access_token", access_token);
            //     return authenticatedResult.payload as User
            // }

        }
        catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

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
            const result = await axios.get<Product>( baseURL + `categories/${categoryId}/products`);
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

const productsSlice = createSlice(
    {
        name: 'products',
        initialState,
        reducers: {
            selectProduct: (state, action) => {
                state.selectedProduct = action.payload;
            },
            sortByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
                if (action.payload === 'asc') {
                    state.products.sort((a, b) => a.price - b.price)
                } else {
                    state.products.sort((a, b) => b.price - a.price)
                }
            },
        },

        extraReducers: (builder) => {
            //Fetch All
            builder.addCase(fetchAllProductAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    return {
                        ...state,
                        fetchAllProductAsync: action.payload,
                        loading: false
                    }
                }
            }),

            builder.addCase(fetchAllProductAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            
            builder.addCase(fetchAllProductAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.message
                    }
                }
            })
            
            //Fetch Single
            builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    return {
                        ...state,
                        fetchSingleProductAsync: action.payload,
                        loading: false
                    }
                }
            })
            builder.addCase(fetchSingleProductAsync.pending, (state) => {
                return {
                    ...state,
                    loading : true
                }
             })
            
            builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.message
                    }
                }
            })

            //delete
            builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
                if (typeof action.payload === "number") {
                    state.products = state.products.filter(p => p._id !== action.payload)
                }
            })

            //create
            builder.addCase(createProductAsync.fulfilled, (state, action) => {
                state.products.push(action.payload)
            })
            builder.addCase(createProductAsync.rejected, (state, action) => {
                state.error = action.payload as string
            })

            //update
            builder.addCase(updateProductAsync.fulfilled, (state, action) => {
                const foundIndex = state.products.findIndex(p => p._id === action.payload._id)
                if (foundIndex >= 0) {
                    state.products[foundIndex] = action.payload
                }
            })

            //byCategoryId
             builder.addCase(fetchByCategoryIdAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    return {
                        ...state,
                        productsByCatId: action.payload,
                        loading: false
                     }
                 }
            })
            builder.addCase(fetchByCategoryIdAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            
            builder.addCase(fetchByCategoryIdAsync.rejected, (state, action) => {
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

const productsReducer = productsSlice.reducer

export const { sortByPrice, selectProduct } = productsSlice.actions
export default productsReducer