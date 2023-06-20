import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ShoppingBag } from "./shopping-bag";
import { styled } from "styled-components";


const ShoppingCount = styled.span `
    width: 17px;
    height: 26px;
    border-radius: 100%;
    padding: 0 5px;
    font-size: 10px;
    background-color: var(--delete-color);
    color: white;
    margin-left: -10px;
`

const Container = styled.div`
    position: relative;
`

export function ShoppingControl(){
    const {value} = useLocalStorage('shopp-items')

    return(
        <Container>
           <ShoppingBag />
            {value.length && <ShoppingCount>{value.length}</ShoppingCount>}
        </Container>
    )
}