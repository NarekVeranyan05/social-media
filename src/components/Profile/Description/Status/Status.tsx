import { FC, useEffect, useState } from "react"
import StatusForm from "./StatusForm"
import styled from "styled-components"
import React from "react"
import { Skeleton } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../../Redux/Store"
import { getIsLoggedInUser, getUserStatus } from "../../../../Redux/UserDataSelectors"
import { changeStatusThunkCreator } from "../../../../Redux/UserDataReducer"

type PropsType = {
    isLoading: boolean,
    isPinned: boolean
    setIsPinnedManager: (newPinStatus: boolean) => void
}
const Status = (props: PropsType) => {
    const dispatch = useAppDispatch()
    //global state
    const status = useAppSelector(state => getUserStatus(state))
    const isLoggedInUser = useAppSelector(state => getIsLoggedInUser(state))
    //mDTP functions
    const changeStatus = (newStatus: string | null): void => {dispatch(changeStatusThunkCreator(newStatus))}

    //local state
    let [statusCopy, setStatusCopy] = useState(status)
    const setStatusCopyManager = (newStatus: string) => {setStatusCopy(newStatus)}
    let [statusEditMode, setStatusEditMode] = useState(false) //false => no edit, true => edit
    const setStatusEditModeManager = (newMode: boolean) => {setStatusEditMode(newMode)}

    useEffect(() => {
        setStatusCopy(status)
    }, [status])
    useEffect(() => {
        if(props.isLoading === false){
            if(isLoggedInUser === true && (status === null || status.length === 0 || !status.trim().length)){
                setStatusEditMode(true)
                props.setIsPinnedManager(true)
            }
        }
    })

    return (
        <StyledStatusContainer>
            {!props.isLoading ? 
                <>
                    {(status !== null && statusEditMode === false) && <StyledStatus onDoubleClick={() => {if(isLoggedInUser){setStatusEditMode(true); props.setIsPinnedManager(true)}}}>{statusCopy}</StyledStatus>}
                    {statusEditMode === true && <StatusForm statusCopy={statusCopy} setStatusCopyManager={setStatusCopyManager} setStatusEditModeManager={setStatusEditModeManager} changeStatus={changeStatus}/>}
                </>
            :
                <>
                    <Skeleton variant="rounded" width={'90%'} height={40}/>
                </>
            }
        </StyledStatusContainer>
    )
}

const StyledStatusContainer = styled.div`
    display: flex;
    align-items: center;
    width: calc(90% + 10px);
    min-height: 72px;
`
const StyledStatus = styled.p`
    width: 100%;
    margin: 0;
    padding: 1rem 1.1rem;
    box-sizing: border-box;
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    font-weight: 700;
    line-height: 1.5;
    color: whitesmoke;
    background-color: rgba(17, 29, 50, 0.26);
    border-radius: var(--radiusMd);
`

const StatusWithMemo = React.memo(Status)
export default StatusWithMemo
