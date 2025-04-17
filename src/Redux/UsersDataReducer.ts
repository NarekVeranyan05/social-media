import { ThunkAction } from "redux-thunk";
import { ResultCodeType, usersAPI } from "../api/api";
import { RootState } from "./Store";
import { UnknownAction } from "redux";
import { userDataActionCreators } from "./UserDataReducer";
import { ActionTypes, NullableType } from "../types";

const CREATE_USERS_DATA = "social-media/usersData/CREATE_USERS_DATA"
const CLEAR_USERS_DATA = "social-media/usersData/CLEAR_USERS_DATA"
const CHANGE_CONNECTIVITY = "social-media/usersData/CHANGE_CONNECTIVITY"
const CHANGE_IS_LOADING = "social-media/usersData/CHANGE_IS_LOADING"
const CHANGE_FOLLOW_BUTTON_ABILITY = "social-media/usersData/CHANGE_FOLLOW_BUTTON_ABILITY"
const SET_FRIEND_QUERY = "social-media/usersData/SET_FRIEND_QUERY"
const SET_TERM_QUERY = "social-media/usersData/SET_TERM_QUERY"


type PhotosType = {
    small: NullableType<string>
    large: NullableType<string>
}
export type UserType = {
    userName: NullableType<string>,
    userID: number,
    arrayID: number,
    photos: PhotosType,
    status: NullableType<string>,
    isFollowed: boolean
}

let initial = {
    isLoading: false,
    amountOfUsers: 1, //total amount of users
    count: 9, //amount of items per page
    maxPage: 6, //total amount of pages
    users:[
        {     
            userName: "VaL_ne_kuzuberdin2",
            userID: 28201,
            arrayID: 0,
            photos: {
              small: null,
              large: null
            },
            status: null,
            isFollowed: false,
             
        },
    ] as Array<UserType>,
    disabledFollowButtons: [Number("-1")] as Array<number>, //An array of userIDs whom the user have tried to follow
    termQuery: "", //user name input
    friendQuery: null as NullableType<boolean>
}
export type InitialType = typeof initial

//Action Creators
export type UserServerType = {
    id: number
    name: string
    status: NullableType<string>
    photos: PhotosType
    followed: boolean 
}
export type FollowButtonAbilityChangeType = "enable" | "disable"
export const usersDataActionCreators = {
    createUsersDataActionCreator: (users:Array<UserServerType>, amountOfUsers: number) => {
        return {
            type: CREATE_USERS_DATA,
            users: users,
            amountOfUsers: amountOfUsers,
            // friend: friend //will indicate if we requested for friends => need to generate messages
        } as const
    },
    clearUsersDataActionCreator: () => {
        return {
            type: CLEAR_USERS_DATA
        } as const
    },
    changeConnectivityActionCreator: (arrayID: number, typeOfChange: "follow" | "unfollow", friend: NullableType<boolean> = null) => {
        return {
            type: CHANGE_CONNECTIVITY,
            arrayID: arrayID,
            typeOfChange: typeOfChange, //follow or unfollow
            friend: friend //if true => the request of unfollowing is made from chats page => contact should be removed from array
        } as const
    },
    changeIsLoadingActionCreator: (isLoading: boolean) => {
        return {
            type: CHANGE_IS_LOADING,
            isLoading: isLoading
        } as const
    },
    changeFollowButtonAbilityActionCreator: (userID: number, change: FollowButtonAbilityChangeType) => {
        return {
            type: CHANGE_FOLLOW_BUTTON_ABILITY,
            change: change,
            userID: userID
        } as const
    },
    setFriendQueryActionCreator: (friendQuery: NullableType<boolean>) => {
        return {
            type: SET_FRIEND_QUERY,
            friendQuery: friendQuery
        } as const
    },
    setTermQueryActioNCreator: (termQuery: string) => {
        return {
            type: SET_TERM_QUERY,
            termQuery: termQuery
        } as const
    }
}
//Thunk Creators
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, UnknownAction>
export const createUsersDataThunkCreator = (count: number, page: number, friend: NullableType<boolean> = null, term: string = ""): ThunkType => async(dispatch) => {
    dispatch(usersDataActionCreators.changeIsLoadingActionCreator(true))
    let response = await usersAPI.getUsers(count, page, friend, term)
    dispatch(usersDataActionCreators.createUsersDataActionCreator(response.items, response.totalCount))
    dispatch(usersDataActionCreators.changeIsLoadingActionCreator(false))
}
export const changeConnectivityThunkCreator = (userID: NullableType<number>, arrayID: NullableType<number>, typeOfChange: "follow" | "unfollow", friend: NullableType<boolean> =null): ThunkType => async(dispatch) => {
    //if friend isn't null => the request of unfollowing is made from the chats page
    if(userID !== null){
        if(arrayID !== null) //if made on users page or chats page
            dispatch(usersDataActionCreators.changeFollowButtonAbilityActionCreator(userID, "disable"))
        else
            dispatch(userDataActionCreators.changeProfileFollowButtonAbilityActionCreator("disable"))
    }
    let response
    if(typeOfChange === "follow"){
        response = await usersAPI.postFollow(userID)
        if(response.resultCode === ResultCodeType.success){
            if(arrayID !== null) //if it's null => profile is viewed => no arrayID is known
                dispatch(usersDataActionCreators.changeConnectivityActionCreator(arrayID, typeOfChange, friend))
            else 
                dispatch(userDataActionCreators.changeConnectivityForProfileActionCreator(typeOfChange))
        }
        else
            alert("An error occured")
    }
    else if(typeOfChange === "unfollow"){
        response = await usersAPI.deleteFollow(userID)
        if(response.resultCode === ResultCodeType.success){
            if(arrayID !== null) //if it's null => profile is viewed => no arrayID is known
                dispatch(usersDataActionCreators.changeConnectivityActionCreator(arrayID, typeOfChange, friend))
            else 
                dispatch(userDataActionCreators.changeConnectivityForProfileActionCreator(typeOfChange))
        }
        else
            alert("An error occured")
    }
    if(userID !== null){
        if(arrayID !== null) //if made on users page or chats page
            dispatch(usersDataActionCreators.changeFollowButtonAbilityActionCreator(userID, "enable"))
        else
            dispatch(userDataActionCreators.changeProfileFollowButtonAbilityActionCreator("enable"))
    }
}

type Action = ActionTypes<typeof usersDataActionCreators> //gives the object of actiom creators to type out actions

const usersDataReducer = (state: InitialType=initial, action: Action): InitialType => {
    switch(action.type){
        case CREATE_USERS_DATA:
            var stateCopy = {...state}
            stateCopy.amountOfUsers = action.amountOfUsers
            stateCopy.maxPage = Math.ceil(action.amountOfUsers/state.count)
            stateCopy.users = JSON.parse(JSON.stringify(state.users))
            var k = 0;
            stateCopy.users = action.users.map((e: UserServerType) => {
                k+=1
                return {
                    userName: e.name,
                    userID: e.id,
                    arrayID: k-1,
                    photos: {
                        small: e.photos.small,
                        large: e.photos.large
                    },
                    status: e.status,
                    isFollowed: e.followed,
                }
            })
            return stateCopy
        case CLEAR_USERS_DATA:
            var stateCopy = {...state}
            stateCopy.users = []
            return stateCopy
        case CHANGE_CONNECTIVITY:
            var stateCopy = {...state}
            stateCopy.users = [...state.users]
            stateCopy.users[action.arrayID] = {...state.users[action.arrayID]}
            if(action.typeOfChange === "follow")
                stateCopy.users[action.arrayID].isFollowed = true
            else if(action.typeOfChange === "unfollow"){
                stateCopy.users[action.arrayID].isFollowed = false
                if(action.friend === true){
                    stateCopy.users = structuredClone(state.users)
                    stateCopy.users.splice(action.arrayID, 1)
                }
            }
            return stateCopy
        case CHANGE_IS_LOADING:
            var stateCopy = {...state}
            stateCopy.isLoading = action.isLoading
            return stateCopy
        case CHANGE_FOLLOW_BUTTON_ABILITY:
            var stateCopy = {...state}
            stateCopy.disabledFollowButtons = [...state.disabledFollowButtons]
            if(action.change === "enable"){
                var index = state.disabledFollowButtons.indexOf(action.userID)
                stateCopy.disabledFollowButtons.splice(index, 1)
                return stateCopy
            }
            else if(action.change === "disable"){
                stateCopy.disabledFollowButtons.push(action.userID)
            }
            return stateCopy
        case SET_FRIEND_QUERY:
            var stateCopy = {...state}
            stateCopy.friendQuery = action.friendQuery
            return stateCopy
        case SET_TERM_QUERY:
            var stateCopy = {...state}
            stateCopy.termQuery = action.termQuery
            return stateCopy
        default:
            return state;
    }
}

export default usersDataReducer