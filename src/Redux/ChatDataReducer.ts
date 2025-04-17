import { ThunkAction } from "redux-thunk"
import { ActionTypes } from "../types"
import { UnknownAction } from "redux"
import { RootState } from "./Store"
import { ChatAPIResponseType, chatAPI } from "../api/chat-api"

const SET_MESSAGES = "social-media/chatData/SET_MESSAGES"
const SET_IS_SEND_BUTTON_DISABLED = "social-media/chatData/SET_IS_SEND_BUTTON_DISABLED"

export type MessageType = {
    arrayID: number
    message: string
    photo: string | null
    userID: number
    userName: string
}
export type MessageServerType = {
    message: string
    photo: string | null
    userId: number
    userName: string
}
const initial = {
    messages: [] as Array<MessageType>,
    isSendButtonDisabled: true //initially, the button is disabled until webSocket connection is ready => a message could be sent
}
type InitialType = typeof initial

export const chatDataActionCreators = {
    setMessagesActionCreator: (messages: Array<MessageServerType>) => {
        return {
            type: SET_MESSAGES,
            messages: messages
        } as const
    },
    setIsSendButtonDisabled: (isDisabled: boolean) => {
        return {
            type: SET_IS_SEND_BUTTON_DISABLED,
            isDisabled: isDisabled
        } as const
    }
}

let unsubscribeOpenEvent: Function
let unsubscribeMessageEvent: Function

export const setUpChatWSThunkCreator = (): ThunkAction<void, RootState, unknown, UnknownAction> => async(dispatch) => {
    chatAPI.start() //starts the connection
    unsubscribeOpenEvent = chatAPI.subscribe((data: ChatAPIResponseType<{isDisabled: boolean}>) => {data.type === "open" && dispatch(chatDataActionCreators.setIsSendButtonDisabled(data.payload.isDisabled))})
    unsubscribeMessageEvent = chatAPI.subscribe((data: ChatAPIResponseType<{messages: Array<MessageServerType>}>) => {if(data.type === "message"){dispatch(chatDataActionCreators.setMessagesActionCreator(data.payload.messages)); dispatch(chatDataActionCreators.setIsSendButtonDisabled(false))}})
}

export const sendMessageThunkCreator = (text: string): ThunkAction<void, RootState, unknown, UnknownAction> => async(dispatch) => {
    chatAPI.sendMessage(text)
}

export const stopChatWSThunkCreator = (): ThunkAction<void, RootState, unknown, UnknownAction> => async(dispatch) => {
    unsubscribeOpenEvent()
    unsubscribeMessageEvent()
    chatAPI.stop() //stops the connection
}


type Action = ActionTypes<typeof chatDataActionCreators>

export const chatDataReducer = (state: InitialType = initial, action: Action) => {
    switch(action.type){
        case SET_MESSAGES:
            var stateCopy = {...state}
            var length = state.messages.length
            stateCopy.messages = [...state.messages]
            action.messages.forEach((message) => {
                stateCopy.messages.push({arrayID: length, message: message.message, photo: message.photo, userID: message.userId, userName: message.userName})
                length++
            })
            return stateCopy
        case SET_IS_SEND_BUTTON_DISABLED:
            var stateCopy = {...state}
            stateCopy.isSendButtonDisabled = action.isDisabled
            return stateCopy
        default: 
            return state
    }
}