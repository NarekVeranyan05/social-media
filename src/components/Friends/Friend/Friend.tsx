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
    flex-wrap: nowrap;
    aling-items; center;
    position: relative;
    width: 90vw;
    height: 60px;
    margin-bottom: 40px;
    padding: 10px;
    
    border-bottom: 0.1cm var(--secondary) solid;
    @media (prefers-color-scheme: dark){
        border-bottom: 0.1cm var(--secondaryDark) solid;
    }
`
const LinkToChat = styled(NavLink)`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width:calc(100% - 20vw);
    height: 100%;

    text-decoration: none;
    color: black;
`
const ContactImage = styled.span<{image: null | string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 60px;
    margin-left: 10px;
    height: 60px;

    border-radius: 100vh;
    background-color: whitesmoke;
    background-image: ${(props) => props.image === null ? "none" : `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: contain;
    background-origin: border-box;

    font-size: 3em;
`
const ContactName = styled.div`
    display: flex;
    width: fit-content;
    justify-self: left;
    align-self: center;

    font-size: 1.3rem;
    margin-left: 20px;
    @media (prefers-color-scheme: dark){
        color: var(--background);
    }
`
const Follow = styled.button`
    display: flex;
    position: absolute;
    right: 10px;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 20px;
    height: 35px;

    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    color: var(--main);
    background-color: whitesmoke;
    border: 0.1cm transparent;
    border-radius: 20px;
    transition: all 0.2s;
    &:hover {
        cursor: pointer;
    };
    &:active {
        background-color: var(--shadow);
        color: whitesmoke;
    };

    @media (prefers-color-scheme: dark){
        color: var(--mainDark);
        &:active{
            background-color: var(--shadowDark)
        }
    }
`