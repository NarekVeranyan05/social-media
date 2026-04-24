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
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0.85rem;
    align-self: flex-end;
    padding: 1rem;
    box-sizing: border-box;
    background-color: var(--surface);
`

const Button = styled.button`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: fit-content;
    min-height: 48px;
    padding: 0.85rem 1rem;

    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
    color: var(--main);
    background: var(--cardGradientSoft);
    border: 1px solid var(--border);
    border-radius: 999px;

    transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease;

    &:hover{
        cursor: pointer;
        transform: translateY(-1px);
    }
    &:disabled{
        cursor: wait;
        opacity: 0.7;
    }

    @media (prefers-color-scheme: dark){
        color: var(--mainDark);
    }
`
