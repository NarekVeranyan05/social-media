import React from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { useAppDispatch } from "../../Redux/Store"
import { changeUserImagesThunkCreator } from "../../Redux/UserDataReducer"

const ProfileForm = (props: { loggedInUserID: number | null; userImage: string | null }) => {
    const dispatch = useAppDispatch()

    const changeUserImages = (newPhoto: File, loggedInUserID: number | null) => {
        dispatch(changeUserImagesThunkCreator(newPhoto, loggedInUserID))
    }

    const {
        register,
        reset,
    } = useForm()

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        changeUserImages(file, props.loggedInUserID)
        reset()
    }

    return (
        <StyledProfileForm
            image={props.userImage}
            className={props.userImage === null ? "material-symbols-outlined" : undefined}
        >
            {props.userImage === null && "person"}

            <ImageInput
                type="file"
                accept="image/*"
                aria-label="Change profile image"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    changeUserImages(file, props.loggedInUserID)
                    e.target.value = ""
                }}
            />

            <HoverLabel>change</HoverLabel>
        </StyledProfileForm>
    )
}

export default ProfileForm

const StyledProfileForm = styled.form<{ image: string | null }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 0 0 64px;
    width: 64px;
    height: 64px;

    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0.92);
    background-image: ${({ image }) => (image === null ? "none" : `url(${image})`)};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-origin: border-box;
    overflow: hidden;

    font-size: 3rem;
    color: var(--main);

    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-1px);
    }

    &:hover::after {
        opacity: 1;
    }
`

const ImageInput = styled.input`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    border-radius: inherit;

    &::-webkit-file-upload-button {
        cursor: pointer;
    }
`

const HoverLabel = styled.span`
    position: absolute;
    inset: auto 0 6px 0;
    text-align: center;
    font-size: 0.5rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: white;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;

    ${StyledProfileForm}:hover & {
        opacity: 1;
    }

    ${StyledProfileForm}:hover {
        background-color: rgba(17, 29, 50, 0.42);
    }
`