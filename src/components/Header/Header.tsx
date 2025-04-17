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
    width: 100%;
    height: 60px;
    top: 0;
    z-index: 300;

    color: whitesmoke;
    background-image: linear-gradient(to right top, var(--main), var(--secondary) 100%);
    border-bottom: 0.01cm rgba(36, 33, 33, 0.705) solid;
    user-select: none;
    &:hover{
        cursor:default;
    }

    @media (prefers-color-scheme: dark){
        background-image: linear-gradient(to right top, var(--mainDark), var(--secondaryDark) 100%);
    }
`

const Title = styled.h1`
    width: 100px;
    margin-left: 20px;
    text-shadow: 0px 2px 2px rgba(36, 33, 33, 0.705);
`

const User = styled.div`
    display: flex;
    width: fit-content;
    position: relative;
    font-size: 1.3rem;
    font-weight: 500;
    margin-right: 20px;
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
            background: var(--shadow);
        }
    }
    @media (prefers-color-scheme: dark){
        &:hover{
            &:after{
                background: var(--shadowDark)
            }
        }
    }
`

const Login = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 35px;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 10px;

    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    color: var(--main);
    background-color: whitesmoke;
    border: 0.1cm transparent;
    border-radius: 20px;

    transition: all 0.2s;

    &:hover{
        cursor: pointer;
    }
    &:active{
        background-color: var(--shadow);
        color: whitesmoke;
        transition: all 0.2s;
    }

    @media (prefers-color-scheme: dark){
        color: var(--mainDark)
        &:active{
            background-color: var(--shadowDark)
        }
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    height: 100%;
`
const Button = styled.button`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 35px;
    padding: 20px;
    margin-right: 10px;

    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    color: var(--main);
    background-color: whitesmoke;
    border: 0.1cm transparent;
    border-radius: 20px;

    transition: all 0.2s;

    &:hover{
        cursor: pointer;
    }
    &:active{
        background-color: var(--shadow);
        color: whitesmoke;
        transition: all 0.2s;
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
    position: absolute;
    justify-content: space-around;
    align-items: center;
    width: max-content;
    height: 100%;
    left: 120px;

    @media screen and (max-width: 720px){
        display: none;
    }
`
const NavButton = styled(NavLink)`
    display: flex;
    width: fit-content;
    position: relative;
    margin-right: 3vw;
    margin-left: 3vw;

    font-size: 1.3rem;
    color: whitesmoke;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
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
            background: var(--shadow);
        }
    }

    &:active{
        color: var(--shadow);
        text-shadow:0px 1px 1px rgba(196, 192, 192, 0.767);
        transition: all 0.2s;
    }

    @media screen and (min-width: 900px){
        margin-right: 5vw;
        margin-left: 5vw;
    }

    @media (prefers-color-scheme: dark){
        &:hover{
            &:after{
                background: var(--shadowDark);
            }
        };
        &:active{
            color: var(--whitesmoke);
        };
    }
`