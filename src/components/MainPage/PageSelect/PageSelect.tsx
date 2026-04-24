import React from "react"
import styled from "styled-components"

type PropsType = {
    page: number
    isselected: "true" | "false"
    setPage: (page: number) => void
}
const PageSelect = (props: PropsType) => {
    const setPage = () => {
        props.setPage(props.page)
    }

    return (
        <StyledPageSelectContainer role={props.isselected === "true" ? "pageChangeSelected" : "pageChange"} isselected={props.isselected} onClick={setPage}>
            {String(props.page)}
        </StyledPageSelectContainer>
    )
}

export default PageSelect;

const StyledPageSelectContainer = styled.button<{isselected: "true" | "false"}>`
    min-width: 44px;
    height: 44px;
    padding: 0 0.95rem;

    user-select: none;
    font-size: 1.05rem;
    font-weight: 700;
    background-image: ${props => props.isselected === "true" ? "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.95))" : "var(--cardGradient)"};
    background-repeat: no-repeat;
    border: 1px solid ${props => props.isselected === "true" ? "var(--secondary)" : "rgba(255,255,255,0.22)"};
    color: ${props => props.isselected === "true" ? "var(--main)" : "whitesmoke"};
    border-radius: 999px;
    box-shadow: ${props => props.isselected === "true" ? "none" : "var(--softShadow)"};
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover{
        cursor:pointer;
        transform: translateY(-1px);
        box-shadow: var(--cardShadow);
    };

    @media (prefers-color-scheme: dark){
        color: ${props => props.isselected === "true" ? "var(--mainDark)" : "whitesmoke"};
        background-image: ${props => props.isselected === "true" ? "linear-gradient(135deg, rgba(180, 175, 175, 0.9), rgba(180, 175, 175, 0.9))" : "var(--cardGradient)"};
        border-color: ${props => props.isselected === "true" ? "var(--secondaryDark)" : "rgba(255,255,255,0.14)"};
    }
`
