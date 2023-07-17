"use client"

import { BackButton } from "@/components/back-button"
import { DefaultPageLayout } from "@/components/default-page-layout"
import { ShoppingIcon } from "@/components/icons/shopping-icon"
import { useProduct } from "@/hooks/useProduct"
import { formatPrice } from "@/utils/format-price"
import { useRouter } from "next/navigation"


import { styled } from "styled-components"

interface ProductProps{

}

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    section {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 32px;
        margin-top: 24px;

        img{
            max-width: 640px;
            width: 50%;
        }

        > div {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            
            
            button{
                border-radius: 4px;
                background: var(--brand-blue, #115D8C);
                mix-blend-mode: multiply;
                border: none;
                padding: 10px 0;
                text-align: center;
                font-size: 16px;
                font-weight: 500;
                color: var(--shapes-light);
                cursor: pointer;
                font-family: inherit;
                text-transform: uppercase;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
            }
        }
    }
`

const ProductInfo = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
        
    span {
        color: var(--text-dark-2);
        font-family: inherit;
        font-size: 16px;
        font-weight: 400;
        line-height: 150%; 
        margin-bottom: 24px;
    }
    
    h2{
        font-size: 32px;
        font-weight: 300;
        margin-top: 12px;
    }
    span:nth-of-type(2){
        color: var(--shapes-dark);
        font-size: 20px;
        font-weight: 600;
    }

    p{
        font-size: 12px;
        font-weight: 400;
    }

    div {
        margin-top: 58px;
        h3 {
            text-transform: uppercase;
            color: var(--text-dark);
            font-weight: 500;
            font-size: 16px;
            margin-bottom: 8px;
        }

        p{
        font-size: 14px;
        }
    }
`


export default function Product({searchParams}: {searchParams: {id: string}}) {
    const {data} = useProduct(searchParams.id)
    const router = useRouter()

    const handleAddToCart = () => {
        let cartItems = localStorage.getItem('shopp-items')
        if(cartItems) {
            let cartItemsArray = JSON.parse(cartItems)

            let existingProductIndex = cartItemsArray.findIndex((item: {id: string}) => item.id === searchParams.id)

            if(existingProductIndex != -1) {
                cartItemsArray[existingProductIndex].quantity += 1
            }else {
                cartItemsArray.push({ ...data, quantity: 1, id: searchParams.id})
            }
            localStorage.setItem('shopp-items', JSON.stringify(cartItemsArray))
        } else {
            const newCart = [{ ...data, quantity: 1, id: searchParams.id}]
            localStorage.setItem('shopp-items', JSON.stringify(newCart))
        }
        router.push("/cart")
    }

    return(
        <DefaultPageLayout>
            <Container>
                <BackButton navigate="/"/>
                <section>
                    <img src={data?.image_url}  />
                    <div>
                        <ProductInfo>
                            <span>{data?.category} </span>
                            <h2>{data?.name}</h2>
                            <span>{formatPrice(data?.price_in_cents ?? 0)}</span>
                            <p>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</p>
                            <div>
                                <h3>Descrição</h3>
                                <p>{data?.description}</p>
                            </div>
                        </ProductInfo>
                        <button onClick={handleAddToCart}>
                            <ShoppingIcon />
                            Adicionar ao carrinho
                        </button>
                    </div>
                </section>
            </Container>
        </DefaultPageLayout>
    )
}