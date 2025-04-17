import { ThunkAction } from "redux-thunk"
import { authAPI, profileAPI, ResultCodeType } from "../api/api"
import { AppDispatch, RootState } from "./Store"
import { UnknownAction } from "redux"
import { NullableType } from "../types"
const SET_AUTH_DATA = "social-media/AuthData/SET_AUTH_DATA"

let initial = {
    isInitialized: false, //If the website has finished auth-ing user
    isLoggedIn: false,
    loggedInUserName: null as NullableType<string>,
    loggedInUserID: null as NullableType<number>,
}
export type InitialType = typeof initial

export const setAuthDataActionCreator = (isLoggedIn: boolean, loggedInUserName: null | string = null, loggedInUserID: null | number = null) => {
    return {
        type: SET_AUTH_DATA,
        isLoggedIn: isLoggedIn,
        loggedInUserName: loggedInUserName,
        loggedInUserID: loggedInUserID
    } 
}

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ReturnType<typeof setAuthDataActionCreator>>
export const authUserThunkCreator = (): ThunkType => async(dispatch) => {
    let response1 = await authAPI.authUser()
    if(response1.resultCode === ResultCodeType.success){
        let response2 = await profileAPI.getUser(response1.data.id)
        dispatch(setAuthDataActionCreator(true, response2.fullName, response2.userId))
    }
    else{
        dispatch(setAuthDataActionCreator(false))
    }
}
export const loginUserThunkCreator = (userData: {email: string, password: string, rememberMe: boolean}): ThunkType => async(dispatch) => {
    let response1 = await authAPI.loginUser(userData)
    if(response1.resultCode === ResultCodeType.success){
        let response2 = await profileAPI.getUser(response1.data.userId)
        dispatch(setAuthDataActionCreator(true, response2.fullName, response2.userId))
    }
    else{
        dispatch(setAuthDataActionCreator(false))
    }
}
export const logoutUserThunkCreator = (): ThunkType => async(dispatch) => {
    let response = await authAPI.logoutUser()
    if(response.resultCode == 0)
        dispatch(setAuthDataActionCreator(false))
}

const authDataReducer = (state: InitialType = initial, action: ReturnType<typeof setAuthDataActionCreator>): InitialType => {
    switch(action.type){
        case SET_AUTH_DATA:
            var stateCopy: InitialType = {...state}
            stateCopy.isLoggedIn = action.isLoggedIn
            stateCopy.loggedInUserName = action.loggedInUserName
            stateCopy.loggedInUserID = action.loggedInUserID
            stateCopy.isInitialized = true
            return stateCopy
        default:
            return state
    }
}

export default authDataReducer