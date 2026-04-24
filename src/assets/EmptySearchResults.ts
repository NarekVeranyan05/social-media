import styled from "styled-components";

export const EmptySearchResults = styled.div`
    display: block;
    width: min(100%, 520px);
    min-height: 52px;
    padding: 1rem 1.25rem;
    box-sizing: border-box;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: var(--textSoft);
    background-color: var(--surfaceAlt);
    border: 1px solid var(--border);
    border-radius: 999px;
    box-shadow: var(--softShadow);
    @media (prefers-color-scheme: dark){
        color: var(--textSoft);
    }
`
