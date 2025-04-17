import { applyMiddleware, combineReducers } from "redux";
import authDataReducer from "./AuthDataReducer";
import {thunk} from "redux-thunk"
import userDataReducer from "./UserDataReducer";
import usersDataReducer from "./UsersDataReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { chatDataReducer } from "./ChatDataReducer";

export const reducer = combineReducers({
    authData: authDataReducer,
    userData: userDataReducer,
    usersData: usersDataReducer,
    chatData: chatDataReducer
})

let store = configureStore({reducer})
export let state = store.getState()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store