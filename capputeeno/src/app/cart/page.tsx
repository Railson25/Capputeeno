"use client"

import { BackButton } from "@/components/back-button";
import { CartItem } from "@/components/cart/cart-item";
import { DefaultPageLayout } from "@/components/default-page-layout";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ProductInCart } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import { styled } from "styled-components";


const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
`

const CartListContainer = styled.div`
    margin-top: 24px;

    h3{
        font-size: 24px;
        font-weight: 500;
        text-transform: uppercase;
        color: var(--text-dar-2);
        line-height: 150%; 
    }

    p{
        font-weight: 300;
        font-size: 16px;
        line-height: 150%; 
        color: var(--text-dar-2);
        
        span{
            font-weight: 600;
        }
    }
`

const CartList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
`

export default function CartPage() {
    const {value, updateLocalStorage} = useLocalStorage<ProductInCart[]>("shopp-items", [])

    const calculateTotal = (value: ProductInCart[]) => {
        return value.reduce((sum, item) => sum += (item.price_in_cents * item.quantity), 0)
    }

    const carTotal = formatPrice(calculateTotal(value))

    const handleUpdateQuantity = (id: string, quantity: number) => {
        const newValue = value.map(item => {
            if(item.id !== id) return item
            return {...item, quantity: quantity}
        })
        console.log(newValue)
        updateLocalStorage(newValue)
    }

    const handleDeleteItem = (id: string) => {
        const newValue = value.filter(item => {
            if(item.id !== id) return item
        })
        updateLocalStorage(newValue)
    }

    return(
        <DefaultPageLayout>
            <Container>
                <BackButton navigate="/" />
                <CartListContainer>
                    <h3>Seu carrinho</h3>
                    <p>
                    Total ({value.length}) <span> {carTotal}</span>
                    </p>

                    <CartList>
                        {value.map(item => 
                        <CartItem 
                        handleDelete={handleDeleteItem}
                        product={item} 
                        key={item.id}  
                        handleUpdateQuantity={handleUpdateQuantity}
                    />)}
                    </CartList>
                </CartListContainer>
            </Container>
        </DefaultPageLayout>
    )
}