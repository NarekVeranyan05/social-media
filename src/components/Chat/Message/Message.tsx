import React from "react";
import { MessageType } from "../../../Redux/ChatDataReducer";
import styled from "styled-components";
import { ProfileImage, ProfileName, ProfileNameContainer } from "../../Profile/Profile";
import { NullableType } from "../../../types";
import { NavLink } from "react-router-dom";

interface PropsType extends MessageType{
    arrayID: number
    userID: number
    photo: NullableType<string>
    message: string
    userName: string
    loggedInUserID: NullableType<number>
}
export const Message = (props: PropsType) => {
    return (
        <StyledMessageContainer loggedInUserID={props.loggedInUserID} userID={props.userID}>
            <AuthorNameContainer>
                <AuthorImage to={`/Profile/${props.userID}`} image={props.photo} isLoggedInUser={false} className={props.photo === null ? "material-symbols-outlined" : null}>{props.photo === null && "person"}</AuthorImage>
                <AuthorName>
                    {props.userName}
                </AuthorName>
            </AuthorNameContainer>
            <MessageText>
                {props.message}
            </MessageText>
        </StyledMessageContainer>
    )
}

const StyledMessageContainer = styled.div<{loggedInUserID: NullableType<number>, userID: NullableType<number>}>`
    display: flex;
    position: relative;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    min-width: 60%;
    width: fit-content;
    max-width: 70%;
    height: fit-content;
    margin: 20px;
    margin-left: ${(props) => props.loggedInUserID === props.userID ? 'auto' : '20px'};

    border-radius: 20px;
    // background-image: linear-gradient(to bottom right, var(--main), var(--secondary))
    background-color: var(--background);
`

const AuthorNameContainer = styled(ProfileNameContainer)`
    min-width: 30%;
    width: fit-content;
    max-width: 50%;
    height: 40px;
    align-self: flex-top;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 0px;
`
const AuthorImage = styled(NavLink)<{image: null | string, isLoggedInUser: boolean, className: string | null}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 30px;
    margin-left: 10px;
    height: 30px;

    border-radius: 100vh;
    background-color: whitesmoke;
    background-image: ${(props) => props.image === null ? "none" : `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: contain;
    background-origin: border-box;
    font-size: 1.5em;
    text-decoration: none;
    color: black;

    &:hover{
        cursor: pointer;
        background-color: ${props => props.isLoggedInUser && "gray"};
        &:after{
            content: '${props => props.isLoggedInUser && "change"}';
            position: absolute;
            font-size: 0.5rem;
            color: white;
        }
    }
`

const AuthorName = styled(ProfileName)`
`

const MessageText = styled.p`
    display: block;
    width: 90%;
    max-width: 90%;
    height: fit-content;
    max-height: 400px;

    font-size: 1.3em;
    word-wrap: break-word;
    overflow-y: scroll;
    overflow-x: none;
    resize: none;
    outline: none;
`