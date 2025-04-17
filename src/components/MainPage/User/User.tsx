import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

type PropsType = {
    isLoggedIn: boolean
    userName: string | null
    userID: number | null
    arrayID: number
    userImage: string | null
    status: string | null
    isFollowed: boolean
    isConnecitivtyButtonDisabled: boolean
    changeConnectivity: (userID: number | null, arrayID: number, typeOfChange: 'unfollow' | 'follow') => void
}
const User = (props: PropsType) => {
    const changeConnectivity = () => {
        console.log("click")
        let typeOfChange: "follow" | "unfollow" = props.isFollowed ? "unfollow" : "follow"
        props.changeConnectivity(props.userID, props.arrayID, typeOfChange)
    }

    return (
        <StyledUserContainer>
            <UserImageContainer to={`/Profile/${props.userID}/`}> 
                <UserImage className={props.userImage === null ? "material-symbols-outlined" : null} image={props.userImage}>{props.userImage===null && "person"}</UserImage>
            </UserImageContainer>
            <MainInfo>
                {props.status !== null && <Status readOnly>{props.status}</Status>}
                <Details>
                    <UserName>{props.userName}</UserName>
                    {props.isLoggedIn !== false && <Follow role={"unfollow-follow"} onClick={changeConnectivity} disabled={props.isConnecitivtyButtonDisabled}>{props.isFollowed === true ? "Unfollow" : "Follow"}</Follow>}
                </Details>
            </MainInfo>
        </StyledUserContainer>
    )
}

export default User

//styled components
const StyledUserContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    position: relative;
    width: 90vw;
    min-width: fit-content;
    height: 190px;
    margin-bottom: 40px;
    padding: 10px;
    
    background-image: linear-gradient(to bottom right, var(--main), var(--secondary));
    border-radius: 20px;

    @media screen and (max-width: 470px){
        min-width: 90vw;
    }
    @media screen and (min-width: 1110px){
        width: 40vw;
        min-width: fit-content;
    }

    @media (prefers-color-scheme: dark){
        background-image: linear-gradient(to bottom right, var(--mainDark), var(--secondaryDark));
        &:active{
            background-color: var(--shadowDark)
        }
    }
`
const UserImageContainer = styled(NavLink)`
    display: block;
    width: 190px;
    min-width: fit-content;
    height: 190px;
    text-decoration: none;
    border-radius: 20px;
`
const UserImage = styled.span<{image: null | string, className: string | null}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: fit-content;
    height: 100%;

    font-size: 5em;
    color: black;
    background-color: var(--shadow);
    background-image: ${props => props.image === null ? "none" : `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 20px;

    @media (prefers-color-scheme: dark){
        background-color: var(--shadowDark)
    }
`
const MainInfo = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    flex-wrap: nowrap;
    width: calc(100% - 200px);
    // min-width: fit-content;
    height: 190px;
`
const Status = styled.textarea`
    display: flex;
    text-overflow:ellipsis;
    align-self: flex-start;
    max-width: calc(100% - 20px);
    min-width: calc(100% - 20px);
    height: calc(70% - 20px);
    padding: 10px;

    font-size: 1.5rem;
    background-color: whitesmoke;
    border-radius: 20px;
    resize: none;
    outline: none;

    @media (prefers-color-scheme: dark){
        background-color: var(--shadowDark)
    }
    @media(max-width: 400px){
        display: none;
    }
`
const Details = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: baseline;
    justify-content: space-between;
    position: relative;
    width: calc(100% - 10px);
    min-width: fit-content;
    height: 30%;
    padding: 10px;
    bottom: 0;
`
const UserName = styled.p`
    display: flex;
    width: fit-content;
    max-width: 75%;

    font-size: 1.5rem;
    font-weight: 500;
    overflow: scroll;
    @media (prefers-color-scheme: dark){
        color: var(--background);
    }
` 

const Follow = styled.button`
    display: flex;
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
    }

    @media(max-width: 400px){
        display: none;
    }
    @media (prefers-color-scheme: dark){
        color: var(--mainDark);
    }
`
