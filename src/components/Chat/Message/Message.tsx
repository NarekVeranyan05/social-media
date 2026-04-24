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
    align-items: flex-start;
    width: min(100%, 560px);
    max-width: 88%;
    height: fit-content;
    margin: 0 0 1rem;
    margin-left: ${(props) => props.loggedInUserID === props.userID ? 'auto' : '0'};
    padding: 0.85rem;
    box-sizing: border-box;

    border-radius: var(--radiusMd);
    background-color: ${props => props.loggedInUserID === props.userID ? "rgba(24, 125, 233, 0.12)" : "var(--surface)"};
    border: 1px solid var(--border);
    box-shadow: var(--softShadow);
`

const AuthorNameContainer = styled(ProfileNameContainer)`
    min-width: unset;
    width: fit-content;
    max-width: 100%;
    min-height: 42px;
    align-self: flex-start;
    margin: 0 0 0.75rem;
    padding: 0.35rem 0.85rem 0.35rem 0.35rem;
    background-color: var(--cardGradientSoft);
`
const AuthorImage = styled(NavLink)<{image: null | string, isLoggedInUser: boolean, className: string | null}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 34px;
    height: 34px;

    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0.92);
    background-image: ${(props) => props.image === null ? "none" : `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-origin: border-box;
    font-size: 1.5em;
    text-decoration: none;
    color: var(--main);

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
    width: 100%;
    height: fit-content;
    margin: 0;

    font-size: 1rem;
    line-height: 1.6;
    color: var(--text);
    word-wrap: break-word;
    overflow-wrap: anywhere;
`
