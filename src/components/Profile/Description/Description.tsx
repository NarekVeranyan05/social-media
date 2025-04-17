import styled from "styled-components"
import StatusWithMemo from "./Status/Status"
import { Skeleton } from "@mui/material"
import React from "react"
import { useAppSelector } from "../../../Redux/Store"
import { getIsLoggedInUser, getLookingForAJobDescription, getUserAboutMe, getUserContactInfo, getUserStatus } from "../../../Redux/UserDataSelectors"

type PropsType = {
    isLoading: boolean,
    isPinned: boolean
    setIsPinnedManager: (newPinStatusWithMemo: boolean) => void
}
const Description = (props: PropsType) => {
    // const isLoggedInUser = useAppSelector(state => getIsLoggedInUser(state))
    const aboutMe = useAppSelector(state => getUserAboutMe(state))
    // const lookingForAJob = useAppSelector(state => getUserAboutMe(state))
    const lookingForAJobDescription = useAppSelector(state => getLookingForAJobDescription(state))
    const contacts =  useAppSelector(state => getUserContactInfo(state))
    // const StatusWithMemo = useAppSelector(state => getUserStatusWithMemo(state))



    let contactObjects: Array<React.ReactElement> = []
    Object.keys(contacts).forEach((contact: any): void => {
        if(contacts[contact] !== "" || contacts[contact] !== null){
            contactObjects.push(<DetailLink target="_blank" href={`${contacts[contact]}`} key={contact}>{`${contact}`}</DetailLink>)
        }
    })
    return (
        <StyledDescriptionContainer>
            <StatusWithMemo isLoading={props.isLoading} isPinned={props.isPinned} setIsPinnedManager={props.setIsPinnedManager}/>
            <DetailsContainer>
                {!props.isLoading ?
                    <> 
                        <Details>
                            {aboutMe !== null && <Detail>{"About: " + aboutMe}</Detail>}
                            {lookingForAJobDescription !== null && <Detail>{"Job Lookout: " + lookingForAJobDescription}</Detail>}
                        </Details>
                        <Details>
                            {contactObjects.length !== 0 && contactObjects}
                        </Details>
                    </>
                :
                <>
                    <Details>
                        <Skeleton width={"40%"} height={40}></Skeleton>
                        <Skeleton width={"40%"} height={40}></Skeleton>
                        <Skeleton width={"40%"} height={40}></Skeleton>
                    </Details>
                    <Details>
                        <Skeleton width={"40%"} height={40}></Skeleton>
                        <Skeleton width={"40%"} height={40}></Skeleton>
                        <Skeleton width={"40%"} height={40}></Skeleton>
                    </Details>
                </>
                }
            </DetailsContainer>
        </StyledDescriptionContainer>
    )
}

export default Description

const StyledDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
`
const DetailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 90%;
    height: 65%;
    padding: 10px;

    background-color: var(--shadow);
    @media (prefers-color-scheme: dark){
        background-color: var(--shadowDark);
    }
    border-radius: 20px;
`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 48%;
    height: 100%;
    overflow: scroll;

    border-radius: 20px;
`
const Detail = styled.p`
    height: 10px;
    font-size: 1.3rem;
    margin-left: 10px;
    &:before{
        content: '·'
    }
    color: whitesmoke;
`
const DetailLink = styled.a`
    height: 30px;
    font-size: 1.3rem;
    margin-left: 10px;
    &:before{
        content: '·'
    }
    color: whitesmoke;
`
