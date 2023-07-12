import { formatPrice } from "@/utils/format-price"
import { styled } from "styled-components"

interface ProductCardProps{
    image: string,
    title: string,
    price: number
}

const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 8px 8px 0px 0px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    width: 256px;

    img{
        width: 256px;
        height: 300px;
    }

    h3{
        color: var(--text-dark-2);
        font-family: inherit;
        font-size: 16px;
        font-weight: 300;
        line-height: 150%;
    }

    p{
        color: var(--shapes-dark );
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        line-height: 150%;  
    }

    div {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        padding: 8px 0;

        > div {
            width: 228px;
            height: 1px;
            margin: 8px 0;
            background: var(--shapes-2);
            padding: 0;
        }
    }

`

export function ProductCard(props : ProductCardProps){
    const price = formatPrice(props.price)

    return(
        <Card>
            <img src={props.image} />
            <div>
                <h3>{props.title}</h3>
                <div></div>
                <p>{price}</p>
            </div>
        </Card>
    )
}