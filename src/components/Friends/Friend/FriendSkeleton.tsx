import { Skeleton } from "@mui/material"
import React from "react"
import styled from "styled-components"

const FriendSkeleton = ({amount}: {amount: number}) => {
    let contacts = new Array(amount).fill(0).map((_, index) => {
        return (
            <StyledContactContainer key = {index}>
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
    align-items: center;
    gap: 1rem;
    position: relative;
    width: 100%;
    min-height: 84px;
    margin: 0;
    padding: 0.85rem 1rem;
    box-sizing: border-box;
    border-radius: var(--radiusMd);   
    
    background-color: var(--surfaceAlt);
    border: 1px solid var(--border);
    box-shadow: var(--softShadow);

    @media (prefers-color-scheme: dark){
        background-color: var(--surfaceAlt);
    }
`

const UserName = styled(Skeleton)`
    justify-self: left;
    align-self: center;
    margin-left: 20px;

    @media (prefers-color-scheme: dark){
        background-color: rgba(255, 255, 255, 0.14);
    }
`
