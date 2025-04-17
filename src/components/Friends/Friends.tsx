import { ReactElement, useEffect, useState } from "react"
import styled from "styled-components"
import Friend from "./Friend/Friend"
import { Paginator, PortionSwitch, SearchContainer } from "../MainPage/MainPage"
import PageSelect from "../MainPage/PageSelect/PageSelect"
import FriendSkeleton from "./Friend/FriendSkeleton"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { getCount, getDisabledFollowButtons, getMaxPage, getTermQuery, getUsers, getUsersLoadingStatus } from "../../Redux/UsersDataSelectors"
import { getLoggedInStatus } from "../../Redux/AuthDataSelectors"
import React from "react"
import { changeConnectivityThunkCreator, createUsersDataThunkCreator, usersDataActionCreators } from "../../Redux/UsersDataReducer"
import { SearchForm } from "../MainPage/SearchForm"
import { NullableType } from "../../types"
import { useNavigate } from "react-router-dom"
import { EmptySearchResults } from "../../assets/EmptySearchResults"

const Friends = () => {
    const dispatch = useAppDispatch()
    //global state
    const isLoading = useAppSelector((state: RootState) => getUsersLoadingStatus(state))
    const isLoggedIn = useAppSelector((state: RootState) => getLoggedInStatus(state))
    const count = useAppSelector((state: RootState) => getCount(state))
    const maxPage = useAppSelector((state: RootState) => getMaxPage(state))
    const friends = useAppSelector((state: RootState) => getUsers(state))
    const disabledFollowButtons = useAppSelector((state: RootState) => getDisabledFollowButtons(state))
    const termQuery = useAppSelector((state: RootState) => getTermQuery(state))

    //mapDTP
    const createFriends = (count: number, page: number, termQuery: string) => {dispatch(createUsersDataThunkCreator(count, page, true, termQuery))}
    const clearUsers = () => dispatch(usersDataActionCreators.clearUsersDataActionCreator())
    const changeConnectivity = (userID: number | null, arrayID: number, typeOfChange: "unfollow" | "follow") => {dispatch(changeConnectivityThunkCreator(userID, arrayID, typeOfChange, true))}
    const setTermQuery = (newTermQuery: string) => dispatch(usersDataActionCreators.setTermQueryActioNCreator(newTermQuery))

    //local state
    let [portionNumber, setPortionNumber] = useState(1) //The portion we request
    let [pagesPerPortion, setPagesPerPortion] = useState(5) //How many pages a portion contains
    let [maxPortionNumber, setMaxPortionNumber] = useState(Math.ceil(maxPage/pagesPerPortion)) //The amount of portions
    let [startPage, setStartPage] = useState((portionNumber-1)*pagesPerPortion + 1) //The page number to start with
    let [page, setPage] = useState(startPage)

    let changePortion = (direction: "next" | "back") => {
        let newPortionNumber: number
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
        createFriends(count, page, termQuery)
        if(termQuery !== "")
            navigate(`/Friends/?term=${termQuery}`)
        else 
            navigate(`/Friends`)
    }, [count, maxPage, page, termQuery])

    useEffect(() => {
        let searchParams = new URLSearchParams(window.location.search)

        let termActualQueryCopy = searchParams.get("term")
        let termActualQuery: string = ""
        if(termActualQueryCopy !== null)
            termActualQuery = termActualQueryCopy

        setTermQuery(termActualQuery)
    })



    let friendsCopy: Array<React.ReactElement> = friends.map((user) => {
        if(disabledFollowButtons.indexOf(user.userID) !== -1)
            return <Friend key={String(user.userID)} userName={user.userName} userID={user.userID} arrayID={user.arrayID} userImage={user.photos.small} isConnecitivtyButtonDisabled={true} changeConnectivity={changeConnectivity}/>
        else
            return <Friend key={String(user.userID)} userName={user.userName} userID={user.userID} arrayID={user.arrayID} userImage={user.photos.small} isConnecitivtyButtonDisabled={false} changeConnectivity={changeConnectivity}/>
    })
    let pageSelects: Array<React.ReactElement> = [];
    for(var k=startPage; k < startPage+pagesPerPortion; k++){
        if(k <= maxPage){
            pageSelects.push(<PageSelect key={String(k)} page={k} isselected={page===k ? "true" : "false"} setPage={(page) => setPage(page)}/>)
        }
    } 

    return (
        <StyledFriendsContainer data-testid="chats">
            <SearchContainer>
                <SearchForm isNoFriendQuery={true} page={page} termQuery={termQuery} setTermQuery={setTermQuery} friendQuery={true} setFriendQuery={(newFriendQuery: NullableType<boolean>) => {}}/>
            </SearchContainer>
            {isLoading && <FriendSkeleton amount={count}/>}
            {friendsCopy.length !== 0 ? friendsCopy : (!isLoading && <EmptySearchResults>No Users Found</EmptySearchResults>)}
            <Paginator>
                {portionNumber !== 1 && <PortionSwitch onClick={() => changePortion("back")}>
                    <span className="material-symbols-outlined">arrow_back</span>Back
                </PortionSwitch>}
                {(pageSelects.length !== 1 && portionNumber !== maxPortionNumber) && pageSelects}
                {portionNumber <= maxPortionNumber && <PortionSwitch onClick={() => changePortion("next")}>
                    Next<span className="material-symbols-outlined">arrow_forward</span>
                </PortionSwitch>}
            </Paginator>
        </StyledFriendsContainer>
    )
}

const StyledFriendsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    width: 100vw;
    height: 100%;
    margin-top: 40px;
    margin-bottom: 60px;
`

export default Friends