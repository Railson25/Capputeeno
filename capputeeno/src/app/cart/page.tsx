"use client"

import { BackButton } from "@/components/back-button";
import { CartItem } from "@/components/cart/cart-item";
import { DefaultPageLayout } from "@/components/default-page-layout";
import { Divider } from "@/components/divider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product, ProductInCart } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import { styled } from "styled-components";


const Container = styled.div`
    display: flex;
    gap: 32px;
    justify-content: center;
    flex-direction: column;
    min-height: 500px;

    @media(min-width: ${props => props.theme.desktopBreakpoint}){
        flex-direction: row;
    }
`

const CartListContainer = styled.div`
    h3{
        margin-top: 24px;
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


const CartResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: var(--shapes-light);
    padding: 16px 24px;
    min-width: 352px;
    position: relative;

    h3 {
        font-weight: 600;
        font-size: 20px;
        color: var(--shapes-dark);
        text-transform: uppercase;
        line-height: 150%;
        margin-bottom: 30px;
    }
`

const TotalItem = styled.div<{isBold: boolean}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-weight: ${props => props.isBold ? '600' : '400'};
    font-size: 16px;
    line-height: 150%;
    color: var(--text-dark-2);
    margin-bottom: 12px;
`

const ShopBtn = styled.button`
    color: var(--shapes-light);
    border-radius: 4px;
    background-color: var(--success-color);
    padding: 12px;
    text-transform: uppercase;
    width: 100%;
    border: none;
    margin-top: 40px;
    cursor: pointer;
`

const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    /* border: 1px solid red; */
    position: absolute;
    bottom: 24px;
    left: 24px;
    a {
        

        color: var(--textos-dark-textos-apoio, #737380);

        font-size: 14px;
        font-weight: 500;
        line-height: 150%;
        text-decoration-line: underline;
        text-transform: uppercase;
    }
`

export default function CartPage() {
    const {value, updateLocalStorage} = useLocalStorage<ProductInCart[]>("shopp-items", [])

    const calculateTotal = (value: ProductInCart[]) => {
        return value.reduce((sum, item) => sum += (item.price_in_cents * item.quantity), 0)
    }

    const carTotal = formatPrice(calculateTotal(value))
    const carTotalWithDelivery = formatPrice(calculateTotal(value) + 4000)
    const conditionToFreeDevilery =  carTotal >= formatPrice(90000) || carTotal <= formatPrice(999999999999999999)

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
                <CartListContainer>
                <BackButton navigate="/" />
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

                <CartResultContainer>
                    <h3>Resumo do pedido</h3>    
                    <TotalItem isBold={false}>
                        <p>Subtotal de produtos</p>
                        <p>{carTotal}</p>
                    </TotalItem>
                    <TotalItem isBold={false}>
                        <p>Entrega</p>
                        <p>{
                            conditionToFreeDevilery
                            ? 'Frete Grátis'
                            : formatPrice(4000)
                        }</p>
                    </TotalItem>

                    <Divider />
                    
                    <TotalItem isBold>
                        <p>Entrega</p>
                        <p>{
                            conditionToFreeDevilery
                            ? carTotal
                            : carTotalWithDelivery
                        }</p>
                    </TotalItem>
                    <ShopBtn>Finalizar a compra</ShopBtn>
                    <LinksContainer>
                        <a>Ajuda</a>
                        <a>reembolsos</a>
                        <a>entregas e frete</a>
                        <a>trocas e devoluções</a>
                    </LinksContainer>
                </CartResultContainer>
            </Container>
        </DefaultPageLayout>
    )
}