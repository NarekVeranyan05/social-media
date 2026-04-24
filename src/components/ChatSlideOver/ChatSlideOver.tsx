import $ from "jquery"
import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { ChatForm } from "../Chat/ChatForm"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { getLoggedInUserID } from "../../Redux/AuthDataSelectors"
import { getMessages, getSendButtonAbilityStatus } from "../../Redux/ChatDataSelectors"
import { MessageServerType, chatDataActionCreators, sendMessageThunkCreator, setUpChatWSThunkCreator, stopChatWSThunkCreator } from "../../Redux/ChatDataReducer"
import { Message } from "../Chat/Message/Message"
import { ButtonBase } from "@mui/material"
import { Navigate } from "react-router-dom"

let wsChannel: WebSocket

export const ChatSlideOver = () => {
    const dispatch = useAppDispatch()
    //global state
    const loggedInUserID = useAppSelector((state: RootState) => getLoggedInUserID(state))
    const messages = useAppSelector((state: RootState) => getMessages(state))
    const isSendButtonDisabled = useAppSelector((state: RootState) => getSendButtonAbilityStatus(state))

    //local state
    let [isOpened, setIsOpened] = useState(false)

    useEffect(() => {
        dispatch(setUpChatWSThunkCreator())
        return () => {
            //when switching the component, removing all event listeners and closing the channel
            dispatch(stopChatWSThunkCreator())
        }
    }, [])

    const sendNewMessage = (text: string) => {
        dispatch(sendMessageThunkCreator(text)) 
        dispatch(chatDataActionCreators.setIsSendButtonDisabled(true)) //disabling the button not to send several messages accidentally
    }

    const messagesElements = messages.map((e) => {
        return <Message key={e.arrayID} arrayID={e.arrayID} userID={e.userID} photo={e.photo} message={e.message} userName={e.userName} loggedInUserID={loggedInUserID}/>
    })

    return (
        <Container>
            {isOpened && 
                <StyledChatContainer>
                    <ChatBox>
                        <MessagesContainer id={'messageContainer'}>
                            {messagesElements}
                        </MessagesContainer>
                        <ChatForm isDisabled={isSendButtonDisabled} sendNewMessage={sendNewMessage}/>
                    </ChatBox>
                </StyledChatContainer>
            }
            <Button onClick={() => {isOpened ? setIsOpened(false) : setIsOpened(true)}}>
                <Span style={{fontSize: "2em"}} className="material-symbols-outlined">forum</Span>
            </Button>
        </Container>
    )
}

const Container = styled.div`
    z-index: 300;
    @media screen and (max-width: 720px){
        display: none;
    }
`

const StyledChatContainer = styled.div`
    display: block;
    position: fixed;
    right: 20px;
    width: min(430px, calc(100vw - 40px));
    height: min(680px, calc(100% - 120px));
    z-index: 300;
`
const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    margin-top: 20px;

    background-color: var(--surface);
    box-shadow: var(--cardShadow); 
    border: 1px solid var(--border);
    border-radius: var(--radiusLg);
    overflow: hidden;

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

const Span = styled.span`
    color: var(--text);
    transition: all 0.5s;
`
const Button = styled.button`
    display: block;
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 70px;
    height: 70px; 

    border: 1px solid var(--border);
    border-radius: 100vw;
    background-color: var(--surface);
    box-shadow: var(--cardShadow); 
    font-size: 1rem;
    z-index: 300;
    transition: all 0.5s;

    &:hover{
        cursor: pointer;
        box-shadow: var(--softShadow);
    }
    &:hover ${Span} {
        background: linear-gradient(to right top, var(--main), var(--secondary) 100%); 
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transform: translateY(-5px);
    }

    @media (prefers-color-scheme: dark){
        &:hover ${Span} {
            background: linear-gradient(to bottom right, var(--mainDark), var(--secondaryDark));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transform: translateY(-5px);
        }
    }
`
