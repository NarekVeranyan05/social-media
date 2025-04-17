import $ from "jquery"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styled, { keyframes } from "styled-components"
import { Input, InputContainer, inputDisselected, inputSelected } from "../../assets/Input"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { createUsersDataThunkCreator, usersDataActionCreators } from "../../Redux/UsersDataReducer"
import { getCount } from "../../Redux/UsersDataSelectors"
import { NullableType } from "../../types"
import { getLoggedInStatus } from "../../Redux/AuthDataSelectors"

type PropsType = {
    page: number,
    isNoFriendQuery: boolean // if it's chats page => there should be no friend options as we view friends page
    termQuery: string
    friendQuery: NullableType<boolean>
    setTermQuery: (newTermQuery: string) => void
    setFriendQuery: (newFriendQuery: NullableType<boolean>) => void
}
export const SearchForm = (props: PropsType) => {
    //global state
    const isLoggedIn = useAppSelector((state: RootState) => getLoggedInStatus(state))

    useEffect(() => {
        window.addEventListener("keypress", (e) => {
            if(e.key === "s" && e.altKey){
                e.preventDefault()
                $("#searchFormField").trigger("click")
            }
        })
        $("#searchFormField").on("click", () => {
            window.addEventListener("keypress", (e) => {
                if(e.key === "enter" || e.key === "Enter"){
                    e.preventDefault()
                    $("#startSearch").trigger("click")
                }
            })
        })

        return () => {
            window.removeEventListener("keypress", (e) => {
                if(e.key === "s" && e.altKey){
                    e.preventDefault()
                    $("#searchFormField").trigger("click")
                }
            })
            window.removeEventListener("keypress", (e) => {
                if(e.key === "enter" || e.key === "Enter"){
                    e.preventDefault()
                    $("#startSearch").trigger("click")
                }
            })
        }
    })

    useEffect(() => {
        reset({
            userNameInputText: props.termQuery,
            selectOption: String(props.friendQuery)
        })
    }, [props.termQuery, props.friendQuery])

    type Inputs = {
        userNameInputText: string
        selectOption: string
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<Inputs>({
        defaultValues: {
            userNameInputText: props.termQuery,
            selectOption: String(props.friendQuery)
        }
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        let selectOption: NullableType<boolean> 
        switch(data.selectOption){
            case "null":
                selectOption=null
                break
            case "true":
                selectOption=true
                break
            case "false":
                selectOption=false
                break
            default:
                selectOption = null
        }
        props.setTermQuery(data.userNameInputText)
        if(!props.isNoFriendQuery){
            props.setFriendQuery(selectOption)
        }
    }

    const onReset: SubmitHandler<Inputs> = (data) => {
        props.setTermQuery("")
        props.setFriendQuery(null)
    }

    return (
        <Form id={"searchFormField"}>
            <UserNameInputContainer>
                <SearchSpan className="material-symbols-outlined" id={"startSearch"} onClick={handleSubmit(onSubmit)}>search</SearchSpan>
                <UserNameInput {...register("userNameInputText")} placeholder="Search for users..."/>
                {(isLoggedIn && !props.isNoFriendQuery) && 
                    <SelectContainer>
                        <Select {...register("selectOption")}>
                            <Option value="null">All Users</Option>
                            <Option value="true">Followed Users</Option>
                            <Option value="false">Not Followed Users</Option>
                        </Select>
                    </SelectContainer>
                }
                <CancelSpan className="material-symbols-outlined" onClick={handleSubmit(onReset)}>cancel</CancelSpan>
            </UserNameInputContainer>
        </Form>
    )
}

//animations
const searchHover = keyframes`
    0%{rotate: 0deg;}
    10%{rotate: 20deg;}
    20%{rotate: -20deg;}
    30%{rotate: 20deg;}
    50%{rotate: 0deg;}
    100%{rotate: 0deg;}
`

//styled components
const Form = styled.form`
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
`

const UserNameInputContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: fit-content;
    margin-bottom: 20px;
    
    background-color: var(--search);
    border: 0.07cm solid var(--secondary);
    border-radius: 20px;

    &:focus-within{
        animation-name: ${inputSelected};
        animation-fill-mode: forwards;
        animation-duration: 0.8s !important;
    };
    &:not(:focus-within){
        animation-name: ${inputDisselected};
        animation-fill-mode: forwards;
        animation-duration: 0.5s;
    }
`
const SearchSpan = styled.span`
    position: relative;
    margin-left: 20px;

    font-size: 2rem;
    rotate: 0deg;
    transition: all 0.5s;
    &:hover{
        cursor: pointer;
        color: var(--background);
        text-shadow: 0px 2px 5px var(--shadow);
        animation-name: ${searchHover};
        animation-duration: 2s;
    }
`
const UserNameInput = styled.input`
    padding: 10px;
    width: 100%;
    height: 30px;

    resize: none;
    outline: none;
    font-size: 1rem;
    font-weight: 500;
    background-color: transparent;
    border: 0.07cm solid transparent;
    border-radius: 20px;
    &::placeholder{
        color: var(--shadow);
    };

    @media (prefers-color-scheme: dark){
        color: var(--background);
        &::placeholder{
            color: var(--background);
        };
    }
`

const SelectContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 35px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 10px;
    margin-right: 20px;

    background-color: var(--main);
    border: 0.1cm transparent;
    border-radius: 20px;

    @media (prefers-color-scheme: dark){
        background-color: whitesmoke;
    }
`
const Select = styled.select`
    outline: none;
    width: 80px;
    height: 30px;

    appearance: none;
    background-color: transparent;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    color: var(--background);

    @media (prefers-color-scheme: dark){
        color: var(--mainDark);
    }
`
const Option = styled.option``

const CancelSpan = styled(SearchSpan)`
    margin-left: 0px;
    margin-right: 20px;

    &:hover{
        color: var(--error);
        animation: none;
    }
`