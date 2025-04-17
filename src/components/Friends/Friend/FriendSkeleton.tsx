import { Skeleton } from "@mui/material"
import React from "react"
import styled from "styled-components"

const FriendSkeleton = ({amount}: {amount: number}) => {
    let contacts = new Array(amount).fill(0).map((e) => {
        return (
            <StyledContactContainer>
                <Skeleton variant="circular" width={60} height={60}></Skeleton>
                <UserName variant="rounded" width={120} height={20}></UserName>
            </StyledContactContainer>
        )
    })

    return (
        <>
            {contacts}
        </>
    )
}

export default FriendSkeleton

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
    border-top-left-radius: 20px;   
    border-top-right-radius: 20px; 
    
    border-bottom: 0.1cm var(--secondary) solid;

    @media (prefers-color-scheme: dark){
        background-color: var(--shadowDark);
        border-bottom: 0.1cm var(--secondaryDark) solid;
    }
`

const UserName = styled(Skeleton)`
    justify-self: left;
    align-self: center;
    margin-left: 20px;

    @media (prefers-color-scheme: dark){
        background-color: var(--shadowDark);
    }
`