import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ShoppingBag } from "./icons/shopping-bag-icon";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";


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

const Container = styled.button`
    position: relative;
    border: none;
    background: transparent;
    cursor: pointer;
`

export function ShoppingControl(){
    const {value} = useLocalStorage('shopp-items', [])
    const router = useRouter()

    const handleNavigateToCart = () => {
        router.push("/cart")
    }

    return(
        <Container onClick={handleNavigateToCart} >
           <ShoppingBag />
            {value.length > 0 && <ShoppingCount>{value.length}</ShoppingCount>}
        </Container>
    )
}