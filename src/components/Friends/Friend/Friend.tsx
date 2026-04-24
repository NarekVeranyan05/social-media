import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

//userID, userName, userImage
type PropsType = {
    userID: number | null
    arrayID: number
    userName: string | null
    userImage: string | null
    isConnecitivtyButtonDisabled: boolean
    changeConnectivity: (userID: number | null, arrayID: number, typeOfChange: "unfollow" | "follow") => void
}
const Friend = (props: PropsType) => {
    const changeConnectivity = () => {
        props.changeConnectivity(props.userID, props.arrayID, "unfollow")
    }

    return (
        <StyledContactContainer >
            <LinkToChat to={`/Profile/${props.userID}`}>
                <ContactImage className={props.userImage === null ? "material-symbols-outlined" : undefined} image={props.userImage}>{props.userImage === null && "person"}</ContactImage>
                <ContactName>{props.userName}</ContactName>
            </LinkToChat>
            <Follow onClick={changeConnectivity} disabled={props.isConnecitivtyButtonDisabled}>{"Unfollow"}</Follow>
        </StyledContactContainer>
    )
}

export default Friend

//styled components
const StyledContactContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    position: relative;
    width: 100%;
    min-height: 84px;
    margin: 0;
    padding: 0.85rem 1rem;
    box-sizing: border-box;
    
    background-color: var(--surfaceAlt);
    border: 1px solid var(--border);
    border-radius: var(--radiusMd);
    box-shadow: var(--softShadow);
    @media (prefers-color-scheme: dark){
        background-color: var(--surfaceAlt);
    }

    @media screen and (max-width: 560px) {
        flex-wrap: wrap;
        justify-content: flex-start;
    }
`
const LinkToChat = styled(NavLink)`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    flex: 1 1 220px;
    min-width: 0;
    height: 100%;

    text-decoration: none;
    color: var(--text);
`
const ContactImage = styled.span<{image: null | string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 60px;
    height: 60px;

    border-radius: 999px;
    background-color: rgba(24, 125, 233, 0.12);
    background-image: ${(props) => props.image === null ? "none" : `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-origin: border-box;

    font-size: 3em;
    color: var(--main);
`
const ContactName = styled.div`
    display: flex;
    width: fit-content;
    min-width: 0;
    align-self: center;

    font-size: clamp(1.05rem, 2vw, 1.2rem);
    font-weight: 600;
    overflow-wrap: anywhere;
    @media (prefers-color-scheme: dark){
        color: var(--text);
    }
`
const Follow = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    min-height: 42px;
    padding: 0.7rem 1rem;

    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    color: var(--main);
    background-color: rgba(24, 125, 233, 0.08);
    border: 1px solid var(--border);
    border-radius: 999px;
    transition: transform 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;
    &:hover {
        cursor: pointer;
        transform: translateY(-1px);
    };
    &:disabled {
        cursor: wait;
        opacity: 0.7;
    };

    @media (prefers-color-scheme: dark){
        color: var(--mainDark);
    }

    @media screen and (max-width: 560px) {
        width: 100%;
    }
`
