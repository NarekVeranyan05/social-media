import { useEffect, useState } from "react"
import styled from "styled-components"
import User from "./User/User"
import PageSelect from "./PageSelect/PageSelect"
import UserSkeleton from "./User/UserSkeleton"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { getCount, getDisabledFollowButtons, getFriendQuery, getMaxPage, getTermQuery, getUsers, getUsersLoadingStatus } from "../../Redux/UsersDataSelectors"
import { getLoggedInStatus } from "../../Redux/AuthDataSelectors"
import { UserType, changeConnectivityThunkCreator, createUsersDataThunkCreator, usersDataActionCreators } from "../../Redux/UsersDataReducer"
import React from "react"
import { SearchForm } from "./SearchForm"
import { NullableType } from "../../types"
import { useLocation, useNavigate } from "react-router-dom"
import { EmptySearchResults } from "../../assets/EmptySearchResults"

// Amount of users = 25765
// Count(amount of items per page) = 9
// Page(the number of the page) = 1 (maxPage=Math.ceil(Amount of users/ Count))

// Set:
// portionNumber = 1
// pagesPerPortion = 5 (amount of buttons shown)
// maxPortionNumber = math.Ceil(maxPage/pagesPerPortion)
// page = (portionNumber-1)*pagesPerPortion + 1

const MainPage = () => {
    const dispatch = useAppDispatch()
    //global state
    const isLoading = useAppSelector((state: RootState) => getUsersLoadingStatus(state))
    const isLoggedIn = useAppSelector((state: RootState) => getLoggedInStatus(state)) 
    const count = useAppSelector((state: RootState) => getCount(state))
    const maxPage = useAppSelector((state: RootState) => getMaxPage(state))
    const users = useAppSelector((state: RootState) => getUsers(state))
    const disabledFollowButtons = useAppSelector((state: RootState) => getDisabledFollowButtons(state))
    const termQuery = useAppSelector((state: RootState) => getTermQuery(state))
    const friendQuery =  useAppSelector((state: RootState) => getFriendQuery(state))

    //mDTP
    const createUsers = (count: number, page: number, friendQuery: NullableType<boolean>, termQuery: string) => dispatch(createUsersDataThunkCreator(count, page, friendQuery, termQuery))
    const clearUsers = () => dispatch(usersDataActionCreators.clearUsersDataActionCreator())
    const changeConnectivity = (userID: number | null, arrayID: number, typeOfChange: "follow" | "unfollow") => dispatch(changeConnectivityThunkCreator(userID, arrayID, typeOfChange))
    const setTermQuery = (newTermQuery: string) => dispatch(usersDataActionCreators.setTermQueryActioNCreator(newTermQuery))
    const setFriendQuery = (newFriendQuery: NullableType<boolean>) => dispatch(usersDataActionCreators.setFriendQueryActionCreator(newFriendQuery))

    //local state
    let [portionNumber, setPortionNumber] = useState(1) //The portion we request
    let [pagesPerPortion, setPagesPerPortion] = useState(5) //How many pages a portion contains
    let [maxPortionNumber, setMaxPortionNumber] = useState(Math.ceil(maxPage/pagesPerPortion)) //The amount of portions
    let [startPage, setStartPage] = useState((portionNumber-1)*pagesPerPortion + 1) //The page number to start with
    let [page, setPage] = useState(startPage)

    let changePortion = (direction: "next" | "back") => {
        var newPortionNumber: number
        if(direction === "next"){
            newPortionNumber = portionNumber+1
            setPortionNumber(newPortionNumber)
            setStartPage((newPortionNumber-1)*pagesPerPortion + 1)
        }
        else if(direction === "back"){
            newPortionNumber = portionNumber-1
            setPortionNumber(newPortionNumber)
            setStartPage((newPortionNumber-1)*pagesPerPortion + 1)
        }
    }

    const navigate = useNavigate()
    useEffect(() => {
        //Count = amount of items per page
        clearUsers()
        setMaxPortionNumber(Math.ceil(maxPage/pagesPerPortion))
        createUsers(count, page, friendQuery, termQuery)
        let termActualQuery: NullableType<string> = null
        let friendActualQuery: NullableType<boolean> = null
        if(termQuery !== "")
            termActualQuery = termQuery
        if(friendQuery !== null)
            friendActualQuery = friendQuery

        if(termActualQuery !== null && friendActualQuery !== null)
            navigate(`/?term=${termActualQuery}&friend=${friendActualQuery}`)
        else if(friendActualQuery !== null)
            navigate(`/?friend=${friendActualQuery}`)
        else if(termActualQuery !== null)
            navigate(`/?term=${termActualQuery}`)
        else 
            navigate(`/`)
    }, [count, maxPage, page, termQuery, friendQuery])

    useEffect(() => {
        let searchParams = new URLSearchParams(window.location.search)

        let termActualQueryCopy = searchParams.get("term")
        let termActualQuery: string = ""
        if(termActualQueryCopy !== null)
            termActualQuery = termActualQueryCopy

        let friendActualQueryCopy = searchParams.get("friend")
        let friendActualQuery: NullableType<boolean> = null
        switch (friendActualQueryCopy) {
            case "true":
                friendActualQuery = true
                break
            case "false":
                friendActualQuery = false
            default:
                break;
        }
        setTermQuery(termActualQuery)
        setFriendQuery(friendActualQuery)
    })


    let usersCopy = users.map((user) => {
        // if(users.length === 0)  {
        //     if(disabledFollowButtons.indexOf(user.userID) !== -1){
        //         return <User userName={"karen"} isLoggedIn={false} userID={null} arrayID={0} userImage={null} status={null} isFollowed={false} isConnecitivtyButtonDisabled={true} changeConnectivity={function (userID: number | null, arrayID: number, typeOfChange: "follow" | "unfollow"): void {
        //             throw new Error("Function not implemented.")
        //         } }/>
        //     }
        //     else{
        //         return <User userName={"karen"} isLoggedIn={false} userID={null} arrayID={0} userImage={null} status={null} isFollowed={false} isConnecitivtyButtonDisabled={false} changeConnectivity={function (userID: number | null, arrayID: number, typeOfChange: "follow" | "unfollow"): void {
        //             throw new Error("Function not implemented.")
        //         } }/>
        //     }
        // }
        if(disabledFollowButtons.indexOf(user.userID) !== -1){
            return <User key={String(user.userID)} isLoggedIn={isLoggedIn} userName={user.userName} userID={user.userID} arrayID={user.arrayID} userImage={user.photos.small} status={user.status} isFollowed={user.isFollowed} isConnecitivtyButtonDisabled={true} changeConnectivity={changeConnectivity}/>
        }
        else{
            return <User key={String(user.userID)} isLoggedIn={isLoggedIn} userName={user.userName} userID={user.userID} arrayID={user.arrayID} userImage={user.photos.small} status={user.status} isFollowed={user.isFollowed} isConnecitivtyButtonDisabled={false} changeConnectivity={changeConnectivity}/>
        }
    })
    let pageSelects = [];
    for(var k=startPage; k < startPage+pagesPerPortion; k++){
        if(k <= maxPage){
            pageSelects.push(<PageSelect key={String(k)} page={k} isselected={page===k ? "true" : "false"} setPage={(page: number) => setPage(page)}/>)
        }
    } 
    return (
        <StyledMainPageContainer>
            <SearchContainer>
                <SearchForm isNoFriendQuery={false} page={page} termQuery={termQuery} friendQuery={friendQuery} setTermQuery={setTermQuery} setFriendQuery={setFriendQuery}/>
            </SearchContainer>
            <UsersGrid>
                {usersCopy.length !== 0 ? usersCopy : (!isLoading && <EmptySearchResults>No Users Found</EmptySearchResults>)}
                {isLoading && <UserSkeleton amount={count}/>}
            </UsersGrid>
            <Paginator>
                {portionNumber !== 1 && <PortionSwitch onClick={() => changePortion("back")}>
                    <span className="material-symbols-outlined">arrow_back</span>Back
                </PortionSwitch>}
                {(pageSelects.length !== 1 && portionNumber !== maxPortionNumber) && pageSelects}
                {portionNumber < maxPortionNumber && <PortionSwitch onClick={() => changePortion("next")}>
                    Next<span className="material-symbols-outlined">arrow_forward</span>
                </PortionSwitch>}
            </Paginator>
        </StyledMainPageContainer>
    )
}

export default MainPage

//styled components
const StyledMainPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: min(100%, var(--pageMaxWidth));
    margin: 0 auto;
    padding: 1.75rem clamp(1rem, 2.4vw, 1.75rem) 3rem;
    box-sizing: border-box;
    gap: 1.25rem;
`

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: fit-content;
    margin-bottom: 0.5rem;
`

const UsersGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: start;
    justify-items: center;
    width: 100%;
    gap: 1.5rem;

    @media screen and (min-width: 1080px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`

export const Paginator = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    height: fit-content;
    margin: 0;
`
export const PortionSwitch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.35rem;
    min-width: 116px;
    min-height: 44px;
    padding: 0 1rem;

    user-select: none;
    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    color: whitesmoke;
    background: var(--cardGradient);
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 999px;
    box-shadow: var(--softShadow);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover{
        cursor: pointer;
        transform: translateY(-1px);
        box-shadow: var(--cardShadow);
    };

    @media (prefers-color-scheme: dark){
        background: var(--cardGradient);
    }
`
