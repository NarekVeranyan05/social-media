import { useForm } from "react-hook-form"
import styled from "styled-components"
import { useAppDispatch } from "../../Redux/Store"
import { changeUserImagesThunkCreator } from "../../Redux/UserDataReducer"
import React from "react"

const ProfileForm = (props: {loggedInUserID: number | null, userImage: string | null}) => {
    const dispatch = useAppDispatch()
    const changeUserImages = (newPhoto: File, loggedInUserID: number | null) => {
        dispatch(changeUserImagesThunkCreator(newPhoto, loggedInUserID))
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm()

    const onSubmit = (e: any) => {
        changeUserImages(e.target.files[0], props.loggedInUserID)
        reset()
    }

    return (
        <StyledProfileForm className={props.userImage === null ? "material-symbols-outlined" : null}  image={props.userImage}>
            {props.userImage === null && "person"}
            <ImageInput type="file" accept="image/*" {...register("imageInput")} onChange={onSubmit}/>
        </StyledProfileForm>
    )
}

export default ProfileForm

//styled components
const StyledProfileForm = styled.form<{image: string | null, className: string | null}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 60px;
    margin-left: 10px;
    height: 60px;

    border-radius: 100vh;
    background-color: whitesmoke;
    background-image: ${(props) => props.image === null ? "none" : `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: contain;
    background-origin: border-box;
    font-size: 3em;
`

const ImageInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    margin: auto;
    width: 100%;
    height: 100%;
    &::file-selector-button{
        display: none;
    }
    &:hover{
        cursor: pointer;
        background-color: gray;
        opacity: 0.8;
        &:before{
            content: "change";
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 100%;
            height: 100%;
            font-size: 1rem;
            color: white;   
        };
        border-radius: 100vh;
    }
`