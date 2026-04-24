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
                {props.status !== null && <Status readOnly value={props.status} />}
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
    gap: clamp(1rem, 2vw, 1.4rem);
    position: relative;
    width: min(100%, 600px);
    min-height: 210px;
    margin: 0;
    padding: clamp(1rem, 2vw, 1.2rem);
    box-sizing: border-box;
    
    background: var(--cardGradient);
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: var(--radiusLg);
    box-shadow: var(--cardShadow);

    @media screen and (max-width: 640px){
        flex-direction: column;
        width: 100%;
        min-height: unset;
    }

    @media (prefers-color-scheme: dark){
        background: var(--cardGradient);
    }
`
const UserImageContainer = styled(NavLink)`
    display: block;
    width: clamp(108px, 28vw, 190px);
    min-width: clamp(108px, 28vw, 190px);
    height: clamp(108px, 28vw, 190px);
    text-decoration: none;
    border-radius: var(--radiusMd);

    @media screen and (max-width: 640px) {
        width: 100%;
        min-width: 0;
        height: 220px;
    }
`
const UserImage = styled.span<{image: null | string, className: string | null}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    font-size: 5em;
    color: rgba(16, 24, 39, 0.75);
    background-color: rgba(255, 255, 255, 0.72);
    background-image: ${props => props.image === null ? "none" : `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: var(--radiusMd);

    @media (prefers-color-scheme: dark){
        background-color: rgba(255, 255, 255, 0.18);
        color: rgba(255, 255, 255, 0.88);
    }
`
const MainInfo = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 auto;
    min-width: 0;
`
const Status = styled.textarea`
    display: flex;
    box-sizing: border-box;
    align-self: flex-start;
    width: 100%;
    min-height: 116px;
    padding: 1rem;

    font-size: clamp(1rem, 1.8vw, 1.1rem);
    line-height: 1.5;
    color: var(--text);
    background-color: rgba(255, 255, 255, 0.94);
    border: none;
    border-radius: var(--radiusMd);
    resize: none;
    outline: none;
    overflow: auto;

    @media (prefers-color-scheme: dark){
        background-color: rgba(13, 19, 31, 0.78);
        color: var(--text);
    }
    @media(max-width: 640px){
        min-height: 90px;
    }
`
const Details = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    position: relative;
    gap: 0.85rem;
    width: 100%;
`
const UserName = styled.p`
    display: flex;
    align-items: center;
    margin: 0;
    flex: 1 1 220px;
    min-width: 0;

    font-size: clamp(1.2rem, 2vw, 1.45rem);
    font-weight: 700;
    color: whitesmoke;
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
    min-height: 44px;
    padding: 0.75rem 1.15rem;

    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    color: var(--main);
    background-color: rgba(255, 255, 255, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.34);
    border-radius: 999px;
    box-shadow: var(--softShadow);
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
    &:hover {
        cursor: pointer;
        transform: translateY(-1px);
        box-shadow: 0 14px 24px rgba(36, 33, 33, 0.14);
    };
    &:disabled {
        cursor: wait;
        opacity: 0.7;
    }

    @media(max-width: 640px){
        width: 100%;
    }
    @media (prefers-color-scheme: dark){
        color: var(--mainDark);
    }
`
