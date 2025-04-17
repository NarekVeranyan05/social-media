import { InitialType } from "./AuthDataReducer"
import { RootState } from "./Store"

export const getInitializedStatus = (state: RootState): boolean => {
    return state.authData.isInitialized
}
 
export const getLoggedInStatus = (state: RootState): boolean => {
    return state.authData.isLoggedIn
}

export const getLoggedInUserName = (state: RootState): string | null => {
    return state.authData.loggedInUserName
}

export const getLoggedInUserID = (state: RootState): number | null => {
    const authData: InitialType = state.authData!
    return authData.loggedInUserID
}