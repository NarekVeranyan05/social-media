import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import styled from 'styled-components';

const UserSkeleton = ({amount}: {amount: number}) => {
    let i = -1;
    let users = new Array(amount).fill(0).map((_, index) => {
        return (
            <StyledUserContainer key={index}>
                <UserImageContainer variant="rectangular" animation="pulse" width={190} height={190} />
                <MainInfo>
                    <SkeletonWrapper height={100} variant="round" />
                    <Skeleton width={'calc(100% - 200px)'} height={50} />
                </MainInfo>
            </StyledUserContainer>
        );
    });

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
    justify-content: space-between;
    gap: clamp(1rem, 2vw, 1.4rem);
    position: relative;
    width: min(100%, 600px);
    min-height: 210px;
    margin: 0;
    padding: clamp(1rem, 2vw, 1.2rem);
    box-sizing: border-box;
    border-radius: var(--radiusLg);
    background-color: var(--surface);
    box-shadow: var(--cardShadow);

    @media screen and (max-width: 640px){
        flex-direction: column;
    }
    @media (prefers-color-scheme: dark){
        background-color: var(--surface);
    }

`
const UserImageContainer = styled(Skeleton)<{animation: string}>`
    display: block;
    flex: 0 0 clamp(108px, 28vw, 190px);
    text-decoration: none;
    border-radius: var(--radiusMd);

    @media (prefers-color-scheme: dark){
        background-color: rgba(255, 255, 255, 0.14);
    }

    @media screen and (max-width: 640px) {
        width: 100% !important;
        flex-basis: 220px;
    }
`
const MainInfo = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 auto;
    min-width: 0;
    @media (prefers-color-scheme: dark){
        background-color: transparent;
    }
`
const SkeletonWrapper = styled(Skeleton)<{variant?: string}>`
    display: block
    @media (prefers-color-scheme: dark){
        background-color: rgba(255, 255, 255, 0.14);
    }
`
