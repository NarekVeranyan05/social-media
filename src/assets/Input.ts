import styled, { keyframes } from "styled-components";

export const inputDisselected = keyframes `
    0% {margin-right: 20px; margin-bottom: 20px; box-shadow: 10px 10px 10px rgba(36, 33, 33, 0.705);}
    10%{margin-left: 0px; margin-top: 0px; margin-right: 20px; margin-bottom: 20px; box-shadow: 10px 10px 10px rgba(36, 33, 33, 0.705)}

    60%{margin-left: 5px; margin-top: 5px; box-shadow: none;}
    100% {margin-left: 0; margin-right: 0; box-shadow: none;}
`


export const inputSelected  = keyframes`
    0% {margin-left: 0; margin-right: 0; box-shadow: none;}
    10% {margin-left: 10px; margin-top: 10px; box-shadow: none;}

    65%{margin-left: 0px; margin-top: 0px; margin-right: 20px; margin-bottom: 20px; box-shadow: 10px 10px 10px rgba(36, 33, 33, 0.705)}
    100%{margin-right: 20px; margin-bottom: 20px; box-shadow: 10px 10px 10px rgba(36, 33, 33, 0.705);}
`


export const InputContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    width: 100%;
    min-height: 56px;
`

export const Input = styled.input`
    padding: 0.95rem 1rem;
    width: 100%;
    min-height: 52px;
    
    resize: none;
    outline: none;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text);
    background-color: var(--surfaceAlt);
    border: 1px solid var(--border);
    border-radius: 999px;
    box-sizing: border-box;
    &:focus{
        animation-name: ${inputSelected};
        animation-fill-mode: forwards;
        animation-duration: 0.8s !important;
    };
    &:not(:focus){
        animation-name: ${inputDisselected};
        animation-fill-mode: forwards;
        animation-duration: 0.5s;
    }

    @media (prefers-color-scheme: dark){
        background-color: var(--surfaceAlt);
        color: var(--text);
        &::placeholder{
            color: var(--textSoft);
        }
    };
`
