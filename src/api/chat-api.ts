import { MessageServerType } from "../Redux/ChatDataReducer"

let subscribers: Array<Function> = []

let wsChannel: WebSocket
const createChannel = () => {
    wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
}

const closeEventHandler = () => {
    wsChannel?.removeEventListener('open', () => {
        subscribers.forEach((subscriber) => {
            subscriber({type: "open", payload: {isDisabled: false}} as ChatAPIResponseType<{isDisabled: boolean}>)
        })
    })
    wsChannel?.removeEventListener('message', (e) => {
        subscribers.forEach((subscriber) => {
            subscriber({type: "message", payload: {messages: JSON.parse(e.data)}} as ChatAPIResponseType<{messages: Array<MessageServerType>}>)
        })
    })
    wsChannel?.removeEventListener('close', () => {
        closeEventHandler() // removes event handlers of previous webSocket
        setTimeout(() => {
            channelEstablisher()
        }, 3000)
    })
    wsChannel?.close()
}

export type ChatAPIResponseType<payloadType> = {
    type: string
    payload: payloadType
}
const channelEstablisher = () => {
    // removes event handlers of previous webSocket
    closeEventHandler()

    //creating a new channel + setting up event listeners
    createChannel()
    wsChannel.addEventListener('open', () => {
        subscribers.forEach((subscriber) => {
            subscriber({type: "open", payload: {isDisabled: false}} as ChatAPIResponseType<{isDisabled: boolean}>)
        })
    })
    wsChannel.addEventListener('message', (e) => {
        subscribers.forEach((subscriber) => {
            subscriber({type: "message", payload: {messages: JSON.parse(e.data)}} as ChatAPIResponseType<{messages: Array<MessageServerType>}>)
        })
    })
    wsChannel?.addEventListener('close', () => {
        closeEventHandler() // removes event handlers of previous webSocket
        setTimeout(() => {
            channelEstablisher()
        }, 3000)
    })
}

export const chatAPI = {
    subscribe: (callback: Function) => {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter((s) => s !== callback)
        }
    },
    start: () => {
        channelEstablisher()
    },
    sendMessage: (text: string) => {
        wsChannel.send(text)
    },
    stop: () => {
        closeEventHandler()
    }
}