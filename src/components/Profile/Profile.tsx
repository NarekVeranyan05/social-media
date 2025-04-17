import styled from "styled-components"
import React, { useEffect, useMemo, useState } from "react"
import ProfileForm from "./ProfileForm"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { Skeleton } from "@mui/material"
import { getBackgroundImage, getFollowButtonAbility, getIsFollowed, getIsLoggedInUser, getUserID, getUserImage, getUserLoadingStatus, getUserName } from "../../Redux/UserDataSelectors"
import { getLoggedInStatus, getLoggedInUserID } from "../../Redux/AuthDataSelectors"
import { createUserDataThunkCreator } from "../../Redux/UserDataReducer"
import { changeConnectivityThunkCreator } from "../../Redux/UsersDataReducer"
import Description from "../../components/Profile/Description/Description"

const Profile = (props: {params: {userID: number}, userID: number}) => {
    let [isPinned, setIsPinned] = useState(false) //false => didn't edit prevously, true => has been edited at least once
    const setIsPinnedManager = (newPinStatus: boolean) => {
        setIsPinned(newPinStatus)
    }
    const isLoading = useAppSelector((state: RootState) => getUserLoadingStatus(state))
    const isLoggedIn = useAppSelector((state: RootState) => getLoggedInStatus(state))
    const loggedInUserID  = useAppSelector((state: RootState) => getLoggedInUserID(state))
    const isLoggedInUser: boolean = useAppSelector((state: RootState) => getIsLoggedInUser(state))
    const userID = useAppSelector((state: RootState) => getUserID(state))
    const userName = useAppSelector((state: RootState) => getUserName(state))
    const userImage = useAppSelector((state: RootState) => getUserImage(state))
    const backgroundImage = useAppSelector((state: RootState) => getBackgroundImage(state))
    const isFollowed = useAppSelector((state: RootState) => getIsFollowed(state))
    const followButtonAbility = useAppSelector((state: RootState) => getFollowButtonAbility(state))

    const dispatch = useAppDispatch()
    const createUserData = (userID: number | null, isLoggedIn: boolean, isOtherUser: boolean = false) => { //if not logged in, the request for isFollowed can't be done
        dispatch(createUserDataThunkCreator(userID, isLoggedIn, isOtherUser))
    }
    const changeConnectivityDispatcher = (userID: number | null, typeOfChange: "follow" | "unfollow") => {
        dispatch(changeConnectivityThunkCreator(userID, null, typeOfChange))
    }

    useMemo<void>(() => {createUserData(null, isLoggedIn)}, [null, isLoggedIn])
    useEffect(() => {
        if(isLoggedIn === true && props.params.userID === undefined)
            createUserData(loggedInUserID, isLoggedIn)
        else if(props.params.userID !== undefined)
            createUserData(props.params.userID, isLoggedIn, true)
    }, [props.params.userID])

    const changeConnectivity = () => {
        let typeOfChange: "unfollow" | "follow"
        if(isFollowed === true){
            typeOfChange = "unfollow"
            changeConnectivityDispatcher(userID, typeOfChange)
        }
        else if(isFollowed === false){
            typeOfChange = "follow"
            changeConnectivityDispatcher(userID, typeOfChange)
        }
    }
    
    return (
        <StyledProfileContainer data-testid="profile">
                <MainInfo>
                    {/* Scroll down to view Description */}
                    
                    {/* Top element */}
                    {!isPinned ? 
                        <BackgroundImage image={backgroundImage}>
                            <ProfileNameContainer>
                                {isLoggedInUser ? <ProfileForm loggedInUserID={loggedInUserID} userImage={userImage}/> : <ProfileImage isLoggedInUser={isLoggedInUser} className={userImage === null ? "material-symbols-outlined" : null} image={userImage}>{userImage === null && "person"}</ProfileImage>}
                                {!isLoading ? <ProfileName role="userName">{userName}</ProfileName> : <Skeleton variant="rounded" width={150} animation="pulse" style={{backgroundColor: "whitesmoke", marginLeft: "10px", marginRight: "10px"}}></Skeleton>}
                                {(!isLoggedInUser && isLoggedIn) && <Follow onClick={changeConnectivity} disabled={!followButtonAbility}>{!isFollowed ? "Follow" : "Unfollow"}</Follow>}
                            </ProfileNameContainer>    
                            {isLoading && <Skeleton variant="rounded" animation="pulse" width={'100%'} height={'100%'} style={{position: "absolute"}}/>}
                        </BackgroundImage> 
                    :
                        <BackgroundImageUnpinned image={backgroundImage}>
                            <ProfileNameContainer>
                                {isLoggedInUser ? <ProfileForm loggedInUserID={loggedInUserID} userImage={userImage} /> : <ProfileImage isLoggedInUser={isLoggedInUser} className={userImage === null ? "material-symbols-outlined" : null} image={userImage}>{userImage === null && "person"}</ProfileImage>}
                                {!isLoading ? <ProfileName role="userName">{userName}</ProfileName> : <Skeleton variant="rounded" width={150} animation="pulse" style={{backgroundColor: "whitesmoke", marginLeft: "10px", marginRight: "10px"}}></Skeleton>}
                                {(!isLoggedInUser && isLoggedIn) && <Follow onClick={changeConnectivity} disabled={!followButtonAbility}>{!isFollowed ? "Follow" : "Unfollow"}</Follow>}
                            </ProfileNameContainer>    
                        </BackgroundImageUnpinned> 
                    }

                    {/* Bottom element */}
                    {!isPinned ? 
                        <DescriptionCoverContainer>
                            <Description isLoading={isLoading} isPinned={isPinned} setIsPinnedManager={setIsPinnedManager}/>
                        </DescriptionCoverContainer>
                    :
                        <DescriptionCoverContainerPinned>
                            <Description isLoading={isLoading} isPinned={isPinned} setIsPinnedManager={setIsPinnedManager}/>
                        </DescriptionCoverContainerPinned>
                    }
                </MainInfo>
        </StyledProfileContainer>
    )
}

export default Profile

//styled components
const StyledProfileContainer = styled.div`
    display: flex;
    position: relative;
    width: 100vw;
    height: calc(100vh - 60px);
`
const MainInfo = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    width: 90vw;
    height: 50vh;
    min-height: 250px;
    margin: 0 auto;
    margin-top: 40px;

    border-radius: 20px;
    background-color: whitesmoke;
    overflow-y: scroll;
    scroll-snap-type:y mandatory;

    &::-webkit-scrollbar{
        display: none;
    }
    @media screen and (min-width: 900px){
        margin-top: 40px;
        margin-left: 20px;
        width: 60vw;
        height: 60vh;
    }
`

const BackgroundImage = styled.div<{image: null | string}>`
    display: flex;
    align-items: flex-end;
    position: relative;
    width: 100%;
    min-height: 98%;

    background-image: ${(props) => props.image === null ? "linear-gradient(to bottom right, var(--main), var(--secondary))" : `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: cover;
    border: 0.1cm solid var(--main);
    border-radius: 20px;
    scroll-snap-align: start;
    @media (prefers-color-scheme: dark){
        background-image:${(props) => props.image === null ? "linear-gradient(to bottom right, var(--mainDark), var(--secondaryDark))" : `url(${props.image})`};
    }
`
const DescriptionCoverContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 40px;

    background-image: linear-gradient(to bottom right, var(--main), var(--secondary));
    border-radius: 20px;
    
    @media (prefers-color-scheme: dark){
        background-image: linear-gradient(to bottom right, var(--mainDark), var(--secondaryDark));
    }
`

export const ProfileNameContainer = styled.div`
    display: flex;
    align-items: center;
    min-width: 30%;
    width: fit-content;
    max-width: 50%;
    height: 80px;
    margin-right: auto;
    margin-left: 20px;
    margin-bottom: 20px;

    background-color: var(--shadow);
    border-radius: 100vw;
    z-index: 100;
`

export const  ProfileImage = styled.span<{image: null | string, isLoggedInUser: boolean, className: string | null}>`
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
    &:hover{
        cursor: ${props => props.isLoggedInUser ? "pointer" : "default"};
        background-color: ${props => props.isLoggedInUser && "gray"};
        &:after{
            content: '${props => props.isLoggedInUser && "change"}';
            position: absolute;
            font-size: 0.5rem;
            color: white;
        }
    }
`

export const ProfileName = styled.p`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: fit-content;
    max-width: 60%;
    height: fit-content;
    padding-right: 10px;
    padding-left: 10px;

    font-size: 1.3rem;
    color: whitesmoke;
    overflow-x: scroll;
    &::-webkit-scrollbar{
        display: non
    }
`

const Follow = styled.button`
    display: flex;
    position: absolute;
    right: 0;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 20px;
    height: 35px;
    margin-right: 20px;

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
`

const DescriptionCoverContainerPinned = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 40px;

    background-image: linear-gradient(to bottom right, var(--main), var(--secondary));
    border-radius: 20px;
    
    @media (prefers-color-scheme: dark){
        background-image: linear-gradient(to bottom right, var(--mainDark), var(--secondaryDark));
    }
`
const BackgroundImageUnpinned = styled.div<{image: null | string}>`
    display: flex;
    align-items: flex-end;
    position: relative;
    width: 100%;
    min-height: 98%;

    background-image: ${(props) => props.image === null ? "linear-gradient(to bottom right, var(--main), var(--secondary))" : `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: cover;
    border: 0.1cm solid var(--main);
    border-radius: 20px;
    @media (prefers-color-scheme: dark){
        background-image:${(props) => props.image === null ? "linear-gradient(to bottom right, var(--mainDark), var(--secondaryDark))" : `url(${props.image})`};
    }
`