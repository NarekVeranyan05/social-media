import styled from "styled-components"
import StatusWithMemo from "./Status/Status"
import { Skeleton } from "@mui/material"
import React from "react"
import { useAppSelector } from "../../../Redux/Store"
import {
    getLookingForAJobDescription,
    getUserAboutMe,
    getUserContactInfo,
} from "../../../Redux/UserDataSelectors"

type PropsType = {
    isLoading: boolean
    isPinned: boolean
    setIsPinnedManager: (newPinStatusWithMemo: boolean) => void
}

const Description = (props: PropsType) => {
    const aboutMe = useAppSelector(state => getUserAboutMe(state))
    const lookingForAJobDescription = useAppSelector(state => getLookingForAJobDescription(state))
    const contacts = useAppSelector(state => getUserContactInfo(state))

    const contactObjects: React.ReactElement[] = Object.entries(contacts ?? {})
        .filter(([_, value]) => typeof value === "string" && value.trim() !== "")
        .map(([key, value]) => (
            <DetailLink
                key={key}
                target="_blank"
                rel="noopener noreferrer"
                href={value}
            >
                {key}
            </DetailLink>
        ))

    return (
        <StyledDescriptionContainer>
            <StatusWithMemo
                isLoading={props.isLoading}
                isPinned={props.isPinned}
                setIsPinnedManager={props.setIsPinnedManager}
            />

            <DetailsContainer>
                {!props.isLoading ? (
                    <>
                        <DetailsBlock>
                            {aboutMe && <Detail><Label>About</Label>{aboutMe}</Detail>}
                            {lookingForAJobDescription && (
                                <Detail>
                                    <Label>Job Outlook</Label>
                                    {lookingForAJobDescription}
                                </Detail>
                            )}
                        </DetailsBlock>

                        <DetailsBlock>
                            {contactObjects.length > 0 && contactObjects}
                        </DetailsBlock>
                    </>
                ) : (
                    <>
                        <DetailsBlock>
                            <Skeleton width="60%" height={28} />
                            <Skeleton width="85%" height={28} />
                            <Skeleton width="70%" height={28} />
                        </DetailsBlock>

                        <DetailsBlock>
                            <Skeleton width="50%" height={28} />
                            <Skeleton width="65%" height={28} />
                            <Skeleton width="40%" height={28} />
                        </DetailsBlock>
                    </>
                )}
            </DetailsContainer>
        </StyledDescriptionContainer>
    )
}

export default Description

const StyledDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    width: 100%;
    padding: 1.1rem;
    box-sizing: border-box;
`

const DetailsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;

    background-color: rgba(17, 29, 50, 0.34);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radiusLg);

    @media (prefers-color-scheme: dark) {
        background-color: rgba(17, 25, 41, 0.62);
    }
`

const DetailsBlock = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 300px;
    min-height: 160px;
    gap: 0.5rem;

    padding: 0.75rem 0.85rem;
    border-radius: var(--radiusMd);

    background-color: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(6px);
`

const Detail = styled.p`
    margin: 0;
    font-size: clamp(1rem, 1.6vw, 1.1rem);
    line-height: 1.5;
    color: whitesmoke;
    overflow-wrap: anywhere;

    &::before {
        content: '· ';
        opacity: 0.7;
    }
`

const DetailLink = styled.a`
    font-size: clamp(1rem, 1.6vw, 1.1rem);
    line-height: 1.5;
    color: whitesmoke;
    text-decoration: none;
    overflow-wrap: anywhere;

    &::before {
        content: '· ';
        opacity: 0.7;
    }

    &:hover {
        text-decoration: underline;
        opacity: 0.85;
    }
`

const Label = styled.span`
    display: block;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.6;
    margin-bottom: 0.15rem;
`