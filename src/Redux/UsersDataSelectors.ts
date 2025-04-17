import { createSelector } from "reselect"
import { RootState } from "./Store"
import { InitialType, UserType } from "./UsersDataReducer"
import { NullableType } from "../types"

export const getUsersLoadingStatus = (state: RootState): boolean => {
    const usersData: InitialType = state.usersData!
    return usersData.isLoading
}

export const getCount = (state: RootState) => {
    const usersData: InitialType = state.usersData!
    return usersData.count
}

export const getMaxPage = (state: RootState) => {
    const usersData: InitialType = state.usersData!
    return usersData.maxPage
}

export const getUsers = (state: RootState): Array<UserType> => {
    const usersData: InitialType = state.usersData!
    return usersData.users
}

export const getDisabledFollowButtons = (state: RootState): Array<number> => {
    const usersData: InitialType = state.usersData!
    return usersData.disabledFollowButtons
}

export const getTermQuery = (state:RootState): string => {
    const usersData: InitialType = state.usersData!
    return usersData.termQuery
}

export const getFriendQuery = (state: RootState): NullableType<boolean> => {
    const usersData: InitialType = state.usersData!
    return usersData.friendQuery
}