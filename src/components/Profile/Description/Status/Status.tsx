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
    height: 20%;
`
const StyledStatus = styled.p`
    font-size: 1.5rem;
    font-weight: 800;
    margin: 20px;
    color: black;
`

const StatusWithMemo = React.memo(Status)
export default StatusWithMemo