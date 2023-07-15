
import { ProductFetchResponse } from "@/types/product";
import axios, { AxiosPromise } from "axios";
import { useQuery } from "react-query";


const API_URL = process.env.NEXT_PUBLIC_API_URL as string

const fetcher = (productId: string): AxiosPromise<ProductFetchResponse> => {
    return axios.post(API_URL,{query: `
    query {
        Product(id: "${productId}") {
          id
          name
          price_in_cents
          category
          sales
          image_url
          description
        }
      }
    `})
}

export function useProduct(id: string){
    const {data} = useQuery({
        queryFn: () => fetcher(id),
        queryKey: ['product', id],
        enabled: !!id,
        staleTime: 1000 * 60 * 10
    })
    return {
        data: data?.data?.data?.Product
    }
}