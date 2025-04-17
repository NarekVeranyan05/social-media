import { ThunkAction } from "redux-thunk"
import { ResultCodeType, profileAPI } from "../api/api"
import { RootState } from "./Store"
import { FollowButtonAbilityChangeType } from "./UsersDataReducer"
import { ActionTypes, NullableType } from "../types"

const CREATE_USER_DATA = "social-media/userData/CREATE_USER_DATA"
const CHANGE_CONNECTIVITY = "social-media/userData/CHANGE_CONNECTIVITY"
const CHANGE_STATUS = "social-media/userData/CHANGE_STATUS"
const CHANGE_IS_LOADING = "social-media/userData/CHANGE_IS_LOADING"
const CHANGE_FOLLOW_BUTTON_ABILITY = "social-media/userData/CHANGE_FOLLOW_BUTTON_ABILITY"

export type PhotosType = {
    small: NullableType<string>
    large: NullableType<string>
}
export type ContactsType = {
    [key: symbol | string]: NullableType<string>
    facebook: NullableType<string>
    website: NullableType<string>
    vk: NullableType<string>
    twitter: NullableType<string>
    instagram: NullableType<string>
    youtube: NullableType<string>
    github: NullableType<string>
    mainLink: NullableType<string>
}
let initial = {
    isLoading: false,

    isLoggedInUser: false, //true => viewing our own profile, false => viewing others'
    isFollowed: false, //followed status of the other user whose profile is viewed
    followButtonAbility: true,
    aboutMe: null as NullableType<string>,
    contacts: {
        facebook: null,
        website: null,
        vk: null,
        twitter: null,
        instagram: null,
        youtube: null,
        github: null,
        mainLink: null
    } as any,
    lookingForAJob: null as NullableType<boolean>,
    lookingForAJobDescription: null as NullableType<string>,
    status: null as NullableType<string>,
    fullName: null as NullableType<string>,
    userID: null as NullableType<number>,
    photos: {
      small: null,
      large: null 
    } as PhotosType
}
export type InitialType = typeof initial

//Action Creators
export type DataType = {
    aboutMe: NullableType<string>
    contacts: ContactsType 
    lookingForAJob: NullableType<boolean>,
    lookingForAJobDescription: NullableType<string>
    fullName: string
    userId: NullableType<number>
    photos: PhotosType
    messages?: Array<string> //In case of an error
}
export const userDataActionCreators = {
    createUserDataActionCreator: (data: DataType, isOtherUser: boolean, isFollowed: boolean, status: string | null) => {
        return {
            type: CREATE_USER_DATA,
            data: data,
            isOtherUser: isOtherUser,
            isFollowed: isFollowed,
            status: status
        } as const
    },
    changeConnectivityForProfileActionCreator: (typeOfChange: string) => {
        return {
            type: CHANGE_CONNECTIVITY,
            typeOfChange: typeOfChange
        } as const
    },
    changeStatusActionCreator: (newStatus: string | null) => {
        return {
            type: CHANGE_STATUS,
            newStatus: newStatus
        } as const
    },
    changeIsLoadingActionCreator: (isLoading: boolean) => {
        return {
            type: CHANGE_IS_LOADING,
            isLoading: isLoading
        } as const
    },
    changeProfileFollowButtonAbilityActionCreator: (change: FollowButtonAbilityChangeType) => {
        return {
            type: CHANGE_FOLLOW_BUTTON_ABILITY,
            change: change
        } as const
    }
}

//Thunk Creators
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action>
export const createUserDataThunkCreator = (userID: number | null, isLoggedIn: boolean, isOtherUser: boolean = false): ThunkType => async(dispatch) => {
    if(userID === null){
        dispatch(userDataActionCreators.createUserDataActionCreator({aboutMe: null, contacts: {facebook: null, website: null, vk: null, twitter: null, instagram: null, youtube: null, github: null, mainLink: null}, lookingForAJob: null, lookingForAJobDescription: null, fullName: "", userId: null, photos: {small: null, large: null}}, isOtherUser, false, null))
    }
    else{
        dispatch(userDataActionCreators.changeIsLoadingActionCreator(true))
        let response = await profileAPI.getUser(userID)
        let isFollowed:boolean = false
        if(isOtherUser && isLoggedIn){
            isFollowed = await profileAPI.getFollow(userID)
        }
        let statusObject = await profileAPI.getStatus(userID)
        let status: string | null = statusObject.status
        let messages = statusObject.messages
        if(messages.length === 0){
            dispatch(userDataActionCreators.createUserDataActionCreator(response, isOtherUser, isFollowed, status))
            dispatch(userDataActionCreators.changeIsLoadingActionCreator(false))
        }
        else 
            alert("An error occurred")
    }
}
export const changeStatusThunkCreator = (newStatus: string | null): ThunkType => async(dispatch) => {
    let response = await profileAPI.putStatus(newStatus)
    if(response.resultCode === ResultCodeType.success){
        dispatch(userDataActionCreators.changeStatusActionCreator(newStatus))
    }
    else    
        alert("An error occurred")
}
export const changeUserImagesThunkCreator = (newPhoto: File, loggedInUserID: number | null): ThunkType => async(dispatch) => {
    let data = new FormData()
    data.append("image", newPhoto)
    let response = await profileAPI.putPhoto(data);
    if(response.resultCode === ResultCodeType.success){
        dispatch(createUserDataThunkCreator(loggedInUserID, true))
    }
    else if("messages" in response && response.messages?.length !== 0){
        alert(`${response.messages[0]}`)
    }
}

//Reducer
type Action = ActionTypes<typeof userDataActionCreators> //gives the object of actiom creators to type out actions

const userDataReducer = (state:InitialType = initial, action: Action): InitialType => {
    switch(action.type){
        case CREATE_USER_DATA:
            var stateCopy = {...state}
            stateCopy.isLoggedInUser = (action.isOtherUser === false) ? true : false  //if true, then visiting othe user |=> it's not our user
            stateCopy.isFollowed = (action.isOtherUser) && action.isFollowed
            stateCopy.aboutMe = action.data.aboutMe
            stateCopy.contacts = (JSON.stringify(action.data.contacts) !== "{}" && action.data.contacts)
            stateCopy.lookingForAJob = action.data.lookingForAJob
            stateCopy.lookingForAJobDescription = action.data.lookingForAJobDescription
            stateCopy.status = action.status
            stateCopy.fullName = action.data.fullName
            stateCopy.userID = action.data.userId
            if(action.data.photos.small !== state.photos.small && action.data.photos.large !== state.photos.large){
                stateCopy.photos = {...stateCopy.photos}
                stateCopy.photos.small = action.data.photos.small;
                stateCopy.photos.large = action.data.photos.large;
            }
            return stateCopy
        case CHANGE_CONNECTIVITY:
            var stateCopy = {...state}
            if(action.typeOfChange === "follow")
                stateCopy.isFollowed = true
            else if(action.typeOfChange === "unfollow")
                stateCopy.isFollowed = false
            return stateCopy
        case CHANGE_STATUS: 
            var stateCopy = {...state}
            stateCopy.status = action.newStatus
            return stateCopy
        case CHANGE_IS_LOADING:
            var stateCopy = {...state}
            stateCopy.isLoading = action.isLoading
            return stateCopy
        case CHANGE_FOLLOW_BUTTON_ABILITY:
            var stateCopy = {...state}
            stateCopy.followButtonAbility = (action.change === "disable" ? false : true)
            return stateCopy
        default:
            return state
    }
}

export default userDataReducer
