"use client"

import { BackButton } from "@/components/back-button"
import { DefaultPageLayout } from "@/components/default-page-layout"

import { styled } from "styled-components"

interface ProductProps{

}

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
`



export default function Product(props: ProductProps) {
    return(
        <DefaultPageLayout>
            <Container>
                <BackButton navigate="/"/>
                <section>Informações do Produto</section>
            </Container>
        </DefaultPageLayout>
    )
}