import { RootState } from "./Store"
import { ContactsType, InitialType } from "./UserDataReducer"
import { FollowButtonAbilityChangeType } from "./UsersDataReducer"

export const getIsLoggedInUser = (state: RootState): boolean => {
    let userData: InitialType = state.userData!
    return userData.isLoggedInUser
}

export const getIsFollowed = (state: RootState): boolean => {
    let userData: InitialType = state.userData!
    return userData.isFollowed
}

export const getFollowButtonAbility = (state: RootState): boolean => {
    let userData: InitialType = state.userData!
    return userData.followButtonAbility
}

export const getUserName = (state: RootState): string | null => {
    let userData: InitialType = state.userData!
    return userData.fullName
}

export const getUserImage = (state: RootState): string | null => {
    let userData: InitialType = state.userData!
    let photos = userData.photos
    return photos.small
}

export const getBackgroundImage = (state: RootState) => {
    let userData: InitialType = state.userData!
    let photos = userData.photos
    return photos.large
}

export const getLookingForAJob = (state: RootState) => {
    let userData: InitialType = state.userData!
    return userData.lookingForAJob
}

export const getLookingForAJobDescription = (state: RootState) => {
    let userData: InitialType = state.userData!
    return userData.lookingForAJobDescription
}

export const getUserContactInfo = (state: RootState): ContactsType => {
    let userData: InitialType = state.userData!
    return userData.contacts
}

export const getUserAboutMe = (state: RootState) => {
    let userData: InitialType = state.userData!
    return userData.aboutMe
}

export const getUserStatus = (state: RootState) => {
    let userData: InitialType = state.userData!
    return userData.status
}

export const getUserID = (state: RootState): number | null => {
    let userData: InitialType = state.userData!
    return userData.userID
}

export const getUserLoadingStatus = (state: RootState) => {
    let userData: InitialType = state.userData!
    return userData.isLoading
}