import { styled } from "styled-components";
import { ArrowLeft } from "./icons/arrow-left";
import { ArrowRight } from "./icons/arrow-right";



export interface PaginationItemProps{
    selected: boolean
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    align-self: flex-end;
    width: 244px;
    height: 32px;
    margin-top: 24px;
    gap: 4px;

    > div {
            margin-left: 12px;
        }
   
`

const Links = styled.button<PaginationItemProps>`

        border: ${props => props.selected ? '1px solid var(--orange-low)' : '1 solid var(--text-dark)'};
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        line-height: 150%; 
        text-transform: uppercase;
        cursor: pointer;
        
        background-color: rgb(115, 115, 128, 0.05);
        color: ${props => props.selected ? 'var(--orange-low)' : 'var(--text-dark)'};
        border-radius: 8px;
        width: 24px;
        height: 24px;

        
`

export function Pagination() {
    
    return(
        <Container>
            <Links selected>1</Links>
            <Links selected={false}>2</Links>
            <Links selected={false}>3</Links>
            <Links selected={false}>4</Links>
            <Links selected={false}>5</Links>
            <div>
                <Links selected={false}><ArrowLeft/> </Links>
                <Links selected={false}><ArrowRight/> </Links>
            </div>
        </Container>
    )
}