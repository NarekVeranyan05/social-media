import { MessageType } from "./ChatDataReducer";
import { RootState } from "./Store";

export const getMessages = (state: RootState): Array<MessageType> => {
    const chatData = state.chatData!
    return chatData.messages
}

export const getSendButtonAbilityStatus = (state: RootState): boolean => {
    const chatData = state.chatData!
    return chatData.isSendButtonDisabled
}