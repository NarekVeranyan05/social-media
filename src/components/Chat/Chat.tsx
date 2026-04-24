import $ from 'jquery'
import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { ChatForm } from "./ChatForm"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { getMessages, getSendButtonAbilityStatus } from "../../Redux/ChatDataSelectors"
import { MessageServerType, chatDataActionCreators, sendMessageThunkCreator, setUpChatWSThunkCreator, stopChatWSThunkCreator } from "../../Redux/ChatDataReducer"
import { Message } from "./Message/Message"
import { getLoggedInUserID } from "../../Redux/AuthDataSelectors"
import { Navigate } from "react-router-dom"

// let wsChannel: WebSocket

// wsChannel?.removeEventListener('close', () => {
//     closeEventHandler() // removes event handlers of previous webSocket
//     setTimeout(() => {
//         debugger
//         memoHandler()
//     }, 3000)
// })

export const Chat = () => {
    const dispatch = useAppDispatch()
    //global state
    const loggedInUserID = useAppSelector((state: RootState) => getLoggedInUserID(state))
    const messages = useAppSelector((state: RootState) => getMessages(state))
    const isSendButtonDisabled = useAppSelector((state: RootState) => getSendButtonAbilityStatus(state))

    //local state 
    let [isMobile, setIsMobile] = useState(window.innerWidth <= 720) //if window width is less than 720px => return true
    const mounted = useRef();

    const sendNewMessage = (text: string) => {
        dispatch(sendMessageThunkCreator(text)) 
        dispatch(chatDataActionCreators.setIsSendButtonDisabled(false)) //disabling the button not to send several messages accidentally
    }

    const messagesElements = messages.map((e) => {
        return <Message key={e.arrayID} arrayID={e.arrayID} userID={e.userID} photo={e.photo} message={e.message} userName={e.userName} loggedInUserID={loggedInUserID}/>
    })

    useEffect(() => {
        if(typeof $('#messageContainer') !== "undefined") {
            let height: number = $('#messageContainer')[0].scrollHeight
            var div_top = $('#messageContainer')[0].offsetTop //distance from the top
            if(height - div_top <= 200){
                $('#messageContainer')[0].scrollTo({
                    top: height,
                    behavior: "smooth"
                })
            }   
        }
        window.addEventListener("resize", () => {
            setIsMobile(window.innerWidth <= 720)
        })
        return () => {
            window.removeEventListener("resize", () => {
                setIsMobile(window.innerWidth <= 720)
            })
        }
    })

    return (
        <>
        {isMobile ?
            <StyledChatContainer>
                <ChatBox>
                    <MessagesContainer id={'messageContainer'}>
                        {messagesElements}
                    </MessagesContainer>
                    <ChatForm isDisabled={isSendButtonDisabled} sendNewMessage={sendNewMessage}/>
                </ChatBox>
            </StyledChatContainer>
        :
          <Navigate to={"/"}/>
        }
        </>
    )
}

const StyledChatContainer = styled.div`
    display: block;
    position: relative;
    width: 100%;
    padding: 1.25rem 1rem 2rem;
    box-sizing: border-box;
`

const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: min(100%, 760px);
    min-height: calc(100vh - 180px);
    margin: 0 auto;

    background-color: var(--surface);
    border-radius: var(--radiusLg);
    overflow: hidden;
    box-shadow: var(--cardShadow);

    @media (prefers-color-scheme: dark){
        background-color: var(--surface);
    }
`

const MessagesContainer = styled.div`
    box-sizing: border-box;
    flex: 1 1 auto;
    width: 100%;
    min-height: 0;
    padding: 1rem;

    border-bottom: 1px solid var(--border);
    background: linear-gradient(180deg, rgba(24, 125, 233, 0.08), transparent 30%), var(--surfaceAlt);
    overflow-y: auto;

    @media (prefers-color-scheme: dark){
        border-bottom: 1px solid var(--border);
    }
`
