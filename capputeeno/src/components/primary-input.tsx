import { styled } from "styled-components";
import { SearchLoupe } from "./icons/search-loupe-icon";
import { InputHTMLAttributes } from "react";

export const PrimaryInput = styled.input`
    width: 100%;
    padding: 10px 16px;
    background-color: var(--bg-secondary);
    border-radius: 8px;
    font-family: inherit;
    font-weight: 400;
    font-size: 12px;
    color: var(--text-dark);
    border: none;
    line-height: 20px;

    @media (min-width: ${props => props.theme.desktopBreakpoint}) {
        font-size: 14px;
        line-height: 22px;
    }
`

const InputContainer = styled.div`
    position: relative;
    width: 250px;

    svg {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    @media (min-width: ${props => props.theme.desktopBreakpoint}) {
        width: 352px;
    }

`

interface InputProps extends InputHTMLAttributes<HTMLIFrameElement> {
    value: string,
    handleChange: (value: string) => void
}

export function PrimaryInputWSearchLoupe(props: InputProps){
    return(
        <InputContainer>
            <PrimaryInput onChange={(event) => props.handleChange(event.target.value)} {...props} />
            <SearchLoupe />
        </InputContainer>
    )
}