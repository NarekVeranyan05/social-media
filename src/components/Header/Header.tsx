import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../Redux/Store"
import { getLoggedInStatus, getLoggedInUserName } from "../../Redux/AuthDataSelectors"
import React from "react"
import { logoutUserThunkCreator } from "../../Redux/AuthDataReducer"

const Header = () => {
    const dispatch = useAppDispatch()
    //global data
    const isLoggedIn = useAppSelector(state => getLoggedInStatus(state))
    const loggedInUserName = useAppSelector(state => getLoggedInUserName(state))
    //local state
    let [logoutMode, setLogoutMode] = useState(false) //false => log out button isnt viewed
    //mapDTP
    const logout = () => {setLogoutMode(false); dispatch(logoutUserThunkCreator())}

    return (
        <StyledHeaderContainer>
            <Title>Social</Title>
            {!logoutMode &&
                <NavContainer>
                    <NavButton to={"/"} >Home</NavButton>
                    <NavButton to={"/Friends/"}>Friends</NavButton>
                    {/* <NavButton to={"/Chat"}>Chat</NavButton> */}
                    <NavButton to={"/Profile/"}>Profile</NavButton>
                    <NavButton to={"/Settings/"}>Settings</NavButton>
                </NavContainer>
            }
            {(isLoggedIn && !logoutMode) && <User role={"userIndicator"} onClick={()=> setLogoutMode(true)}>{loggedInUserName}</User>}
            {!isLoggedIn && <Login to={"/Login"}>Log in</Login>}  
            {logoutMode && <ButtonsContainer><Button onClick={logout}>Log out</Button><Button onClick={()=>setLogoutMode(false)}>Cancel</Button></ButtonsContainer>}
        </StyledHeaderContainer>
    )
}

export default Header

const StyledHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    inset: 0 0 auto 0;
    width: 100%;
    min-height: var(--headerHeight);
    padding: 0 clamp(1rem, 3vw, 2rem);
    z-index: 300;
    box-sizing: border-box;
    color: whitesmoke;
    background: linear-gradient(135deg, rgba(24, 125, 233, 0.94), rgba(50, 157, 192, 0.94));
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 10px 28px rgba(22, 48, 92, 0.16);
    backdrop-filter: blur(14px);
    user-select: none;

    &:hover{
        cursor:default;
    }

    @media (prefers-color-scheme: dark){
        background: linear-gradient(135deg, rgba(5, 74, 148, 0.94), rgba(18, 107, 184, 0.94));
        border-bottom-color: rgba(255, 255, 255, 0.1);
    }
`

const Title = styled.h1`
    margin: 0;
    min-width: fit-content;
    font-size: clamp(1.6rem, 2.2vw, 2rem);
    letter-spacing: 0.04em;
    text-shadow: 0px 2px 8px rgba(36, 33, 33, 0.28);
`

const User = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    position: relative;
    font-size: clamp(1rem, 1.7vw, 1.15rem);
    font-weight: 600;
    margin-left: auto;
    &:after{
        content: '';
        position: absolute;
        width: 0%;
        height: 0.2em;
        background: transparent;
        bottom: -2px;
        left: 0;
        right: 0;
        margin: 0 auto;
        border-radius: 20px;

        transition: width 0.5s, background 0.6s;
    }

    &:hover{
        cursor: pointer;
        &:after{
            width: 100%;
            background: rgba(255, 255, 255, 0.9);
        }
    }
    @media (prefers-color-scheme: dark){
        &:hover{
            &:after{
                background: rgba(255, 255, 255, 0.9)
            }
        }
    }
`

const Login = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    min-height: 44px;
    padding: 0.7rem 1.1rem;
    margin-left: auto;

    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    color: var(--main);
    background-color: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 999px;
    box-shadow: var(--softShadow);

    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease;

    &:hover{
        cursor: pointer;
        transform: translateY(-1px);
    }
    &:active{
        background-color: rgba(255, 255, 255, 0.82);
        color: whitesmoke;
    }

    @media (prefers-color-scheme: dark){
        color: var(--mainDark);
        &:active{
            background-color: var(--shadowDark);
        }
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: fit-content;
    height: 100%;
    margin-left: auto;

    @media screen and (max-width: 520px) {
        flex-wrap: wrap;
        justify-content: flex-end;
    }
`
const Button = styled.button`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: fit-content;
    min-height: 44px;
    padding: 0.7rem 1.1rem;

    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    color: var(--main);
    background-color: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 999px;
    box-shadow: var(--softShadow);

    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease;

    &:hover{
        cursor: pointer;
        transform: translateY(-1px);
    }
    &:active{
        background-color: rgba(255, 255, 255, 0.82);
        color: whitesmoke;
    }

    @media (prefers-color-scheme: dark){
        color: var(--mainDark);
        &:active{
            color: var(--whitesmoke);
            background-color: var(--shadowDark);
        };
    }
`

const NavContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: max-content;
    height: 100%;
    gap: clamp(0.75rem, 2vw, 2rem);
    margin-left: clamp(1rem, 3vw, 3rem);

    @media screen and (max-width: 900px){
        display: none;
    }
`
const NavButton = styled(NavLink)`
    display: flex;
    width: fit-content;
    position: relative;

    font-size: clamp(1rem, 1.6vw, 1.08rem);
    color: whitesmoke;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
    &:after{
        content: '';
        position: absolute;
        width: 0%;
        height: 0.2em;
        background: transparent;
        bottom: -2px;
        left: 0;
        right: 0;
        margin: 0 auto;
        border-radius: 20px;

        transition: width 0.5s, background 0.6s;
    }

    &:hover{
        cursor: pointer;
        &:after{
            width: 100%;
            background: rgba(255, 255, 255, 0.92);
        }
    }

    &:active{
        color: rgba(255, 255, 255, 0.82);
    }

    @media (prefers-color-scheme: dark){
        &:hover{
            &:after{
                background: rgba(255, 255, 255, 0.9);
            }
        };
        &:active{
            color: rgba(255, 255, 255, 0.82);
        };
    }
`
