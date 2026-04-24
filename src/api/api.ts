import axios from "axios"
import { DataType } from "../Redux/UserDataReducer"
import { UserServerType } from "../Redux/UsersDataReducer"
import { NullableType } from "../types"

const instance = axios.create({
    baseURL: "/api/1.0/",
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "API-KEY": "6de47800-85d0-482f-a06f-f6e52117667c" // paste your API KEY here
    },
})

export const uploadInstance = axios.create({
    baseURL: "/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "6de47800-85d0-482f-a06f-f6e52117667c" // paste your API KEY here
    }
})

export enum ResultCodeType {
    success = 0,
}
type AuthUserResponseType = {
    data: {
        id: number,
        email: string,
        login: string
    },
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
        let response = await instance.get<AuthUserResponseType>("auth/me")
        return response.data
    },
    loginUser: async(userData: {email: string, password: string, rememberMe: boolean}) => {
        let response = await instance.post<LoginUserResponseType>("auth/login", userData)
        return response.data
    },
    logoutUser: async() => {
        try{
            let response = await instance.post<LogoutUserResponseType>("auth/logout")
            localStorage.clear()
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
            let response = await instance.get<DataType>(`profile/${userID}`)
            return response.data
        } catch(error){
            return {aboutMe: null, contacts: {facebook: null, website: null, vk: null, twitter: null, instagram: null, youtube: null, github: null, mainLink: null}, lookingForAJob: null, lookingForAJobDescription: null, fullName: "", userId: null, photos: {small: null, large: null}, messages: [`${error}`]}
        }
    },
    getFollow: async(userID: number | null) => {
        // let response = await instance2.get<boolean>(`follow/${userID}`)
        return false
    },
    getStatus: async(userID: number | null) => {
        try{
            let response = await instance.get<string | null>(`profile/status/${userID}`)
            return {status: response.data, messages: []}
        } catch(error){
            return {status: null, messages: [`${error}`]}
        }
    },
    putStatus: async(newStatus: string | null) => {
        try{
            let response = await instance.put<PutStatusResponseType>("profile/status", {status: newStatus})
            return response.data
        }catch(error){
            return {resultCode: 1, messages: [`${error}`], data: {}}
        }
    },
    putPhoto: async(data: FormData) => {
        try{
            let response = await uploadInstance.put<PutPhotoResponseType>("profile/photo", data)
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
        let response;
        if(friend === null)
            try{
                response = await instance.get<GetUsersResponseType>(`users?count=${count}&page=${page}&term=${term}`)
                let loggedInResult = await instance.get<AuthUserResponseType>("auth/me")
                response.data.items = response.data.items.filter(item => item.id !== loggedInResult.data.data.id)
                return response.data;
            } catch(error){
                return {items: [], totalCount: 0, error: null}
            }
        else{
            try{
                response = await instance.get<GetUsersResponseType>(`users?count=${count}&page=${page}&term=${term}&friend=${friend}`)
                return response.data
            } catch(error){
                return {items: [], totalCount: 0, error: null}
            }
        }

    },
    postFollow: async(userID: number | null) => {
        let response = await instance.post<PostFollowResponseType>(`/follow/${userID}`)
        return response.data
    },
    deleteFollow: async(userID: number | null) => {
        try{
            let response = await instance.delete<PostFollowResponseType>(`/follow/${userID}`)
            return response.data
        } catch(error){
            return {resultCode: 1, messages: [`${error}`], data: {}}
        }
    }
}
