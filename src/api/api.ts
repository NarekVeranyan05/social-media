import axios from "axios"
import { ContactsType, DataType, PhotosType } from "../Redux/UserDataReducer"
import { UserServerType } from "../Redux/UsersDataReducer"
import { NullableType } from "../types"

const instance1 = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true
})

//authAPI
export enum ResultCodeType {
    success = 0,
}
type AuthUserResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodeType | Omit<number, 0>
    messages?: Array<string>
}
type LoginUserResponseType = {
    data: {userId: number}
    messages?: Array<string>
    resultCode: ResultCodeType | Omit<number, 0>
}
type LogoutUserResponseType = {
    data: Object
    messages?: Array<string>
    resultCode: ResultCodeType | Omit<number, 0> 
}
export const authAPI = {
    authUser: async() => {
        let response = await instance1.get<AuthUserResponseType>("auth/me")
        return response.data
    },
    loginUser: async(userData: {email: string, password: string, rememberMe: boolean}) => {
        let response = await instance1.post<LoginUserResponseType>("auth/login", userData)
        return response.data
    },
    logoutUser: async() => {
        try{
            let response = await instance1.delete<LogoutUserResponseType>("auth/login")
            return response.data
        } catch(error){
            return {data: {}, resultCode: 1, messages: [`${error}`]}
        }
    }
}

//profileAPI
type PutStatusResponseType = {
    resultCode: ResultCodeType | Omit<number, 0>
    messages?: Array<string>
    data: Object
}
type PutPhotoResponseType = {
    data: {small: null | string, large: null | string}
    resultCode: ResultCodeType | Omit<number, 0>
    messages: Array<string | undefined>
}
export const profileAPI = {
    getUser: async(userID: number | null) => {
        try{
            let response = await instance1.get<DataType>(`profile/${userID}`)
            return response.data   
        } catch(error){
            return {aboutMe: null, contacts: {facebook: null, website: null, vk: null, twitter: null, instagram: null, youtube: null, github: null, mainLink: null}, lookingForAJob: null, lookingForAJobDescription: null, fullName: "", userId: null, photos: {small: null, large: null}, messages: [`${error}`]}
        }
    },
    getFollow: async(userID: number | null) => {
        let response = await instance1.get<boolean>(`follow/${userID}`) 
        return response.data
    },
    getStatus: async(userID: number | null) => {
        try{
            let response = await instance1.get<string | null>(`profile/status/${userID}`)
            return {status: response.data, messages: []}
        } catch(error){
            return {status: null, messages: [`${error}`]}
        }
    },
    putStatus: async(newStatus: string | null) => {
        try{
            let response = await instance1.put<PutStatusResponseType>("profile/status", {status: newStatus})
            return response.data
        }catch(error){
            return {resultCode: 1, messages: [`${error}`], data: {}}
        }
    },
    putPhoto: async(data: object) => {
        try{
            let response = await instance1.put<PutPhotoResponseType>("profile/photo", data)
            return response.data
        }catch(error){
            return {data: {small: null, large: null}, messages: [`${error}`], resultCode: 1}
        }
    }
}

//usersAPI
type GetUsersResponseType = {
    items: Array<UserServerType>
    totalCount: number
    error: string | null
}
type PostFollowResponseType = {
    resultCode: ResultCodeType | Omit<number, 0>
    messages?: Array<string>
    data: Object
}
export const usersAPI = {
    // getUsers: async(count: number, page: number, friend: null | boolean = null) => {
    getUsers: async(count: number, page: number, friend: NullableType<boolean> = null, term: string = "") => {
        //count: the amount of users a single page will have
        //page: the page number 
        //friend: if asking for only followed (true), only not followec (false), or all (null) users
        let response
        if(friend === null)
            response = await instance1.get<GetUsersResponseType>(`users?count=${count}&page=${page}&term=${term}`)
        else
            response = await instance1.get<GetUsersResponseType>(`users?count=${count}&page=${page}&term=${term}&friend=${friend}`)
        return response.data
    },
    postFollow: async(userID: number | null) => {
        let response = await instance1.post<PostFollowResponseType>(`/follow/${userID}`)
        return response.data
    },
    deleteFollow: async(userID: number | null) => {
        try{
            let response = await instance1.delete<PostFollowResponseType>(`/follow/${userID}`)
            return response.data
        } catch(error){
            return {resultCode: 1, messages: [`${error}`], data: {}}
        }
    }
}
