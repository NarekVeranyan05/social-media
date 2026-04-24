import styled from "styled-components"
import React, { useEffect, useState } from "react"
import ProfileForm from "./ProfileForm"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { Skeleton } from "@mui/material"
import {
    getBackgroundImage,
    getFollowButtonAbility,
    getIsFollowed,
    getIsLoggedInUser,
    getUserID,
    getUserImage,
    getUserLoadingStatus,
    getUserName,
} from "../../Redux/UserDataSelectors"
import { getLoggedInStatus, getLoggedInUserID } from "../../Redux/AuthDataSelectors"
import { createUserDataThunkCreator } from "../../Redux/UserDataReducer"
import { changeConnectivityThunkCreator } from "../../Redux/UsersDataReducer"
import Description from "../../components/Profile/Description/Description"

const Profile = (props: { params: { userID: number }, userID: number }) => {
    const [isPinned, setIsPinned] = useState(false)

    const isLoading = useAppSelector((state: RootState) => getUserLoadingStatus(state))
    const isLoggedIn = useAppSelector((state: RootState) => getLoggedInStatus(state))
    const loggedInUserID = useAppSelector((state: RootState) => getLoggedInUserID(state))
    const isLoggedInUser = useAppSelector((state: RootState) => getIsLoggedInUser(state))
    const userID = useAppSelector((state: RootState) => getUserID(state))
    const userName = useAppSelector((state: RootState) => getUserName(state))
    const userImage = useAppSelector((state: RootState) => getUserImage(state))
    const backgroundImage = useAppSelector((state: RootState) => getBackgroundImage(state))
    const isFollowed = useAppSelector((state: RootState) => getIsFollowed(state))
    const followButtonAbility = useAppSelector((state: RootState) => getFollowButtonAbility(state))

    const dispatch = useAppDispatch()

    const createUserData = (id: number | null, loggedIn: boolean, isOtherUser = false) => {
        dispatch(createUserDataThunkCreator(id, loggedIn, isOtherUser))
    }

    const changeConnectivityDispatcher = (id: number | null, typeOfChange: "follow" | "unfollow") => {
        dispatch(changeConnectivityThunkCreator(id, null, typeOfChange))
    }

    useEffect(() => {
        createUserData(null, isLoggedIn)

        if (isLoggedIn === true && props.params.userID === undefined) {
            createUserData(loggedInUserID, isLoggedIn)
        } else if (props.params.userID !== undefined) {
            createUserData(props.params.userID, isLoggedIn, true)
        }
    }, [props.params.userID, isLoggedIn, loggedInUserID])

    const changeConnectivity = () => {
        if (isFollowed === true) {
            changeConnectivityDispatcher(userID, "unfollow")
        } else if (isFollowed === false) {
            changeConnectivityDispatcher(userID, "follow")
        }
    }

    return (
        <StyledProfileContainer data-testid="profile">
            <MainInfo>
                <Hero image={backgroundImage} $pinned={isPinned}>
                    <HeroOverlay />
                    <ProfileNameContainer $pinned={isPinned}>
                        {isLoggedInUser ? (
                            <ProfileForm loggedInUserID={loggedInUserID} userImage={userImage} />
                        ) : (
                            <ProfileImage
                                isLoggedInUser={isLoggedInUser}
                                className={userImage === null ? "material-symbols-outlined" : undefined}
                                image={userImage}
                                title={isLoggedInUser ? "Change profile image" : undefined}
                            >
                                {userImage === null && "person"}
                            </ProfileImage>
                        )}

                        <NameBlock>
                            {!isLoading ? (
                                <ProfileName role="userName">{userName}</ProfileName>
                            ) : (
                                <Skeleton
                                    variant="rounded"
                                    width={180}
                                    height={28}
                                    animation="pulse"
                                    style={{ backgroundColor: "whitesmoke" }}
                                />
                            )}
                        </NameBlock>

                        {(!isLoggedInUser && isLoggedIn) && (
                            <Follow
                                onClick={changeConnectivity}
                                disabled={!followButtonAbility}
                                $active={!!isFollowed}
                            >
                                {!isFollowed ? "Follow" : "Unfollow"}
                            </Follow>
                        )}
                    </ProfileNameContainer>

                    {isLoading && (
                        <HeroLoading>
                            <Skeleton
                                variant="rounded"
                                animation="pulse"
                                width="100%"
                                height="100%"
                                style={{ backgroundColor: "rgba(245,245,245,0.24)" }}
                            />
                        </HeroLoading>
                    )}
                </Hero>

                <DescriptionShell $pinned={isPinned}>
                    <Description
                        isLoading={isLoading}
                        isPinned={isPinned}
                        setIsPinnedManager={setIsPinned}
                    />
                </DescriptionShell>
            </MainInfo>
        </StyledProfileContainer>
    )
}

export default Profile

const StyledProfileContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    min-height: calc(100vh - var(--headerHeight));
    padding: 1.75rem clamp(1rem, 2.4vw, 1.75rem) 3rem;
    box-sizing: border-box;
`

const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: min(100%, 980px);
    min-height: min(78vh, 860px);
    margin: 0 auto;
    border-radius: var(--radiusLg);
    overflow: hidden;
    background-color: var(--surface);
    box-shadow: var(--cardShadow);

    @media screen and (max-width: 760px) {
        min-height: unset;
    }
`

const Hero = styled.div<{ image: null | string; $pinned: boolean }>`
    display: flex;
    align-items: flex-end;
    position: relative;
    width: 100%;
    min-height: 380px;
    padding: 1rem;
    box-sizing: border-box;

    background-image: ${({ image }) =>
            image === null
                    ? "linear-gradient(to bottom right, var(--main), var(--secondary))"
                    : `url(${image})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border: 1px solid var(--border);
    border-radius: var(--radiusLg);

    @media (prefers-color-scheme: dark) {
        background-image: ${({ image }) =>
                image === null
                        ? "linear-gradient(to bottom right, var(--mainDark), var(--secondaryDark))"
                        : `url(${image})`};
    }

    @media screen and (max-width: 760px) {
        min-height: 300px;
    }
`

const HeroOverlay = styled.div`
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
            linear-gradient(to top, rgba(8, 12, 20, 0.72), rgba(8, 12, 20, 0.08) 62%, rgba(8, 12, 20, 0.18));
    pointer-events: none;
`

export const ProfileNameContainer = styled.div<{ $pinned: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.85rem;
    width: fit-content;
    max-width: min(100%, 720px);
    min-height: 84px;
    margin-right: auto;
    padding: 0.7rem 1rem 0.7rem 0.7rem;
    box-sizing: border-box;
    position: relative;
    z-index: 1;

    background-color: rgba(17, 29, 50, 0.58);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: ${({ $pinned }) => ($pinned ? "var(--radiusLg)" : "999px")};
    backdrop-filter: blur(16px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);

    @media screen and (max-width: 640px) {
        width: 100%;
        max-width: 100%;
        flex-wrap: wrap;
        border-radius: var(--radiusMd);
        padding: 0.8rem;
    }
`

const NameBlock = styled.div`
    display: flex;
    align-items: center;
    min-width: 0;
    flex: 1;
`

const ProfileImage = styled.span<{ image: null | string; isLoggedInUser: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 0 0 64px;
    width: 64px;
    height: 64px;
    border-radius: 999px;

    background-color: rgba(255, 255, 255, 0.92);
    background-image: ${({ image }) => (image === null ? "none" : `url(${image})`)};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: var(--main);
    font-size: 3rem;
    user-select: none;

    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        cursor: ${({ isLoggedInUser }) => (isLoggedInUser ? "pointer" : "default")};
        transform: ${({ isLoggedInUser }) => (isLoggedInUser ? "translateY(-1px)" : "none")};
        background-color: ${({ isLoggedInUser }) =>
    isLoggedInUser ? "rgba(255, 255, 255, 0.78)" : "rgba(255, 255, 255, 0.92)"};

        &::after {
            content: ${({ isLoggedInUser }) => (isLoggedInUser ? "'change'" : "''")};
            position: absolute;
            bottom: 6px;
            font-size: 0.52rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            color: var(--main);
            text-transform: uppercase;
        }
    }
`

export const ProfileName = styled.p`
    display: flex;
    align-items: center;
    min-width: 0;
    width: fit-content;
    max-width: 100%;
    margin: 0;
    padding-right: 0.25rem;

    font-size: clamp(1.2rem, 2vw, 1.45rem);
    font-weight: 700;
    color: whitesmoke;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const Follow = styled.button<{ $active: boolean }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 44px;
    padding: 0.75rem 1.15rem;
    margin-left: auto;
    flex: 0 0 auto;

    font-size: 1rem;
    font-weight: 800;
    color: var(--main);

    background-color: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.88)" : "rgba(255, 255, 255, 0.96)")};
    border: 1px solid rgba(255, 255, 255, 0.34);
    border-radius: 999px;
    box-shadow: var(--softShadow);

    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease, filter 0.2s ease;

    &:hover {
        cursor: pointer;
        transform: translateY(-1px);
        filter: brightness(0.98);
    }

    &:disabled {
        cursor: wait;
        opacity: 0.7;
        transform: none;
    }

    @media screen and (max-width: 640px) {
        width: 100%;
        margin-left: 0;
    }
`

const DescriptionShell = styled.div<{ $pinned: boolean }>`
    display: flex;
    width: 100%;
    min-height: 340px;
    margin-top: 1rem;

    background-image: var(--cardGradient);
    border-radius: var(--radiusLg);
    overflow: hidden;

    @media (prefers-color-scheme: dark) {
        background-image: var(--cardGradient);
    }
`

const HeroLoading = styled.div`
    position: absolute;
    inset: 0;
    z-index: 2;
    border-radius: inherit;
`