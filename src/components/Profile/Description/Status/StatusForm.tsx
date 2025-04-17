import React from "react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styled, { keyframes } from "styled-components"

type Inputs = {
    statusInput: string | null
}
type PropsType = {
    statusCopy: string | null
    setStatusCopyManager: (newStatus: string) => void
    setStatusEditModeManager: (newMode: boolean) => void
    changeStatus: (newStatus: string | null) => void
}
const StatusForm = (props: PropsType) => {
    let [isselected, setIsselected] = useState<null | boolean>(null)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues:{
            statusInput: props.statusCopy
        }
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        props.changeStatus(data.statusInput)
        props.setStatusEditModeManager(false)
    }

    return (
        <InputContainer role={"status_input"}>
            <Input isselected={isselected} {...register("statusInput")} onFocus={() => setIsselected(true)} onBlur={handleSubmit(onSubmit)} placeholder="Enter the new status here..."/>
        </InputContainer>
    )
} 

export default StatusForm;

const InputContainer = styled.form`
    display: flex;
    align-self: flex-start;
    position: relative;

    width: 100%;
    height: 60%;
`


const Input = styled.input<{isselected: boolean | null}>`
    padding: 10px;
    width: 100%;
    height: 100%;
    resize: none;
    outline: none;
    font-size: 1rem;
    font-weight: 500;
    border: 0.07cm solid transparent;
    border-radius: 20px;

    animation-name: ${props => {
        if(props.isselected === null){
            return null
        } 
        else if(props.isselected === false){
            return inputDisselected
        }
        else{
            return inputSelected
        }}};
    animation-fill-mode: forwards;
    animation-duration: 0.8s;
    @media (prefers-color-scheme: dark){
        background-color: var(--shadowDark);
        color: var(--background);
        &::placeholder{
            color: var(--background);
        }
    }
`

const inputDisselected = keyframes`
    0% {margin-right: 20px; margin-bottom: 20px; box-shadow: 10px 10px 10px rgba(36, 33, 33, 0.705);}
    10%{margin-left: 0px; margin-top: 0px; margin-right: 20px; margin-bottom: 20px; box-shadow: 10px 10px 10px rgba(36, 33, 33, 0.705)}

    60%{margin-left: 5px; margin-top: 5px; box-shadow: none;}
    100% {margin-left: 0; margin-right: 0; box-shadow: none;}
`


const inputSelected = keyframes`
    0% {margin-left: 0; margin-right: 0; box-shadow: none;}
    10% {margin-left: 10px; margin-top: 10px; box-shadow: none;}

    65%{margin-left: 0px; margin-top: 0px; margin-right: 20px; margin-bottom: 20px; box-shadow: 10px 10px 10px rgba(36, 33, 33, 0.705)}
    100%{margin-right: 20px; margin-bottom: 20px; box-shadow: 10px 10px 10px rgba(36, 33, 33, 0.705);}
`