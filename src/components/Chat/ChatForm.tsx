import $ from 'jquery'
import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"
import classes from "./ChatForm.module.css"
import { Input, InputContainer } from "../../assets/Input"
import React, { useEffect } from "react"

type PropsType = {
    isDisabled: boolean
    sendNewMessage: (text: string) => void
}
export const ChatForm = (props: PropsType) => {
    type Inputs = {
        messageInputText: string
    }
    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm<Inputs>()

    let onSubmit: SubmitHandler<Inputs> = (data) => {
        if(data.messageInputText !== ""){
            reset({
                messageInputText: ''
            })
            props.sendNewMessage(data.messageInputText)
        }
    }

    useEffect(() => {
        $("#MessageInputContainer").on("click", () => {
            window.addEventListener("keypress", (e) => {
                if(e.key === "enter" || e.key === "Enter"){
                    e.preventDefault()
                    $("#SendMessage").trigger("click")
                }
            })
        })

        return () => {
            window.removeEventListener("keypress", (e) => {
                if(e.key === "enter" || e.key === "Enter"){
                    e.preventDefault()
                    $("#SendMessage").trigger("click")
                }
            })
        }
    })

    return (
        <Form>
            <InputContainer id={'MessageInputContainer'}>
                <Input {...register("messageInputText")} placeholder="Enter your message here..."/>
            </InputContainer>
            <Button id={'SendMessage'} disabled={props.isDisabled} onClick={handleSubmit(onSubmit)} className={classes.Input}><span className={`material-symbols-outlined ${classes.SendButton}`}>send</span></Button>
        </Form>
    )
}

const Form = styled.div`
    display: flex;
    position: relative;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: fit-content;
    align-self: flex-end;
    
    border-radius: 20px;
`

const Button = styled.button`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 35px;
    margin-bottom: 20px;
    padding: 20px;

    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    color: var(--main);
    background-color: whitesmoke;
    border: 0.1cm transparent;
    border-radius: 20px;

    transition: all 0.2s;

    &:hover{
        cursor: pointer;
        animation-duration: 1s;
    }
    &:active{
        background-color: var(--shadow);
        color: whitesmoke;
        transition: all 0.2s;
    }

    @media (prefers-color-scheme: dark){
        color: var(--mainDark);
        &:active{
            color: var(--whitesmoke);
            background-color: var(--shadowDark);
        };
    }
`

