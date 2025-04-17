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
    width: 40px;
    min-width: fit-content;
    height: 40px;
    margin: 0px 10px 0px;

    user-select: none;
    font-size: 1.3rem;
    font-weight: 500;
    background-image: ${props => props.isselected === "true" ? "linear-gradient(to bottom right, whitesmoke, whitesmoke)" : "linear-gradient(to bottom right, var(--main), var(--secondary))"};
    background-repeat: no-repeat;
    border: ${props => props.isselected === "true" ? "0.05cm solid" : "none"};
    border-color: ${props => props.isselected === "true" && "var(--secondary)"};
    color: ${props => props.isselected === "true" ? "var(--main)" : "whitesmoke"};
    border-radius: 20px;

    &:hover{
        cursor:pointer
    };

    @media (prefers-color-scheme: dark){
        color: ${props => props.isselected === "true" ? "var(--mainDark)" : "whitesmoke"};
        background-image: ${props => props.isselected === "true" ? "linear-gradient(to bottom right, var(--shadowDark), var(--shadowDark))" : "linear-gradient(to bottom right, var(--mainDark), var(--secondaryDark))"};
        border-color: ${props => props.isselected === "true" && "var(--secondaryDark)"};
    }
`