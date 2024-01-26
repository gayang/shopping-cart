import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import User from "../../types/User";
import { UsersReducerState } from "../../types/UsersReducerState";
import UserCredentials  from "../../types/UserCredentials";
import UserCreation from "../../types/UserCreation";

const baseURL = "http://localhost:8080/api/v1"

const initialState: UsersReducerState = {
    users: [],
    loading: false,
    user: null,
    currentUser : null
}
//GET Users
export const fetchUsersAsync = createAsyncThunk<User[], void, { rejectValue: string }>(
    'fetchUsersAsync',
    async (  rejectWithValue, dispatch ) => {
        try {
            const result = await axios.get(baseURL + '/users')
            return result.data
        } catch (e) {
            const error = e as Error
            //return rejectWithValue(error.message)
        }
    }
)
//REGISTER User
export const registerUsersAsync = createAsyncThunk<User, UserCreation, { rejectValue: string }>(
    'registerUsersAsync',
    async ( data, { rejectWithValue, dispatch }) => {
        try {
            const result = await axios.post(baseURL + '/users', data)
            console.log("REDUCER-REGISTER User > ", result.data);
            return result.data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

//Check-Email
export const checkEmailUsersAsync = createAsyncThunk<User, { rejectValue: boolean }>(
    'checkEmailUsersAsync',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const result = await axios.post(baseURL+ '/users/is-availabl', data)
            return result.data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)
//LOGIN
export const loginUserAsync = createAsyncThunk<User, UserCredentials, { rejectValue: string }>(
    'loginUserAsync',
    async (cred, { rejectWithValue, dispatch }) => {
        try {
            const result = await axios.post( baseURL + '/auth/login', cred)
            const  access_token  = result.data.accessToken
            const authenticatedResult = await dispatch(authenticateUserAsync(access_token));

            if (typeof authenticatedResult.payload === "string" || !authenticatedResult.payload) {
                throw Error(authenticatedResult.payload || "Cannot login")
            } else {
                localStorage.setItem("access_token", access_token);
                return authenticatedResult.payload as User
            }
        }
        catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)
//AUTHENTICATE USER
export const authenticateUserAsync = createAsyncThunk<User, string, { rejectValue: string }>(
    "authenticateUserAsync",
    async (access_token, { rejectWithValue }) => {
        try {
            const getprofile = await axios.get( baseURL + '/auth/profile', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            return getprofile.data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)
//DELETE USER
export const deleteUserAsync = createAsyncThunk(
    'deleteUserAsync',
    async (id: number) => {
        try {
            const result = await axios.delete<boolean>( baseURL + `/users/${id}`)
            if (!result.data) {
                throw new Error("Somthing failed with deleting an user!")
            }
            return id
        }
        catch (e) {
            const error = e as Error
            return error.message
        }
    }
)
//PUT USER
export const updateUserAsync = createAsyncThunk(
    'updateUserAsync',
    async (userInfo: User) => {
        try {
            const result = await axios.put<User>( baseURL + `/users/${userInfo._id}`, userInfo)
            if (!result.data) {
                throw new Error("User is not found")
            }
            
        }
        catch (e) {
            const error = e as Error
            return error.message
        }
    }
)
//


const userSlice = createSlice(
    {
        name: 'users',
        initialState,
        reducers: {},

        extraReducers: (builder) => {
            builder
            //Get
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(fetchUsersAsync.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(fetchUsersAsync.pending, (state, action) => {
                //state.loading = action.payload
            })

            //Login
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.error = action.payload
            })
            
            //Register
            .addCase(authenticateUserAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(authenticateUserAsync.rejected, (state, action) => {
                state.error = action.payload
            })
                
            //Delete
            builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
                if (typeof action.payload === "number") {
                    state.users = state.users.filter(p => p._id !== action.payload)
                }
            })
        }
    }
)

const usersReducer = userSlice.reducer
export const {  } = userSlice.actions
export default usersReducer