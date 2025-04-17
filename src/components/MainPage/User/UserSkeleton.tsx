import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import styled from 'styled-components';

const UserSkeleton = ({amount}: {amount: number}) => {
    let users = new Array(amount).fill(0).map((e) => {
        return (
            <StyledUserContainer>
                <UserImageContainer variant="rectangular" animation="pulsate" width={190} height={190}></UserImageContainer>
                <MainInfo>
                    <SkeletonWrapper height={100} variant="round"/>
                    <Skeleton width={'calc(100% - 200px)'} height={50}/>
                </MainInfo>
            </StyledUserContainer>
        )
    })

    return (
        <>
            {users}
        </>
    )
}

export default UserSkeleton

//styled components
const StyledUserContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    position: relative;
    width: 90vw;
    min-width: fit-content;
    height: 190px;
    margin-bottom: 40px;
    padding: 10px;
    border-radius: 20px;
    background-color: whitesmoke;

    @media screen and (max-width: 470px){
        min-width: 90vw;
    }
    @media screen and (min-width: 1110px){
        width: 40vw;
        min-width: fit-content;
    }
    @media (prefers-color-scheme: dark){
        background-color: var(--shadowDark);
    }

`
const UserImageContainer = styled(Skeleton)<{animation: string}>`
    display: block;
    text-decoration: none;
    border-radius: 20px;

    @media (prefers-color-scheme: dark){
        background-color: var(--shadowDark);
    }
`
const MainInfo = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    flex-wrap: nowrap;
    width: calc(100% - 200px);
    min-width: fit-content;
    height: 190px;
    @media (prefers-color-scheme: dark){
        background-color: var(--shadowDark);
    }
`
const SkeletonWrapper = styled(Skeleton)<{variant?: string}>`
    display: block
    @media (prefers-color-scheme: dark){
        background-color: var(--shadowDark);
    }
`