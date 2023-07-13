"use client"
import { FilterContextProvider } from "@/context/filter-context"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ThemeProvider } from "styled-components"

interface DefaultProvidersProps {
    children: ReactNode
}

const theme = {
     desktopBreakpoint: "768px"
}

export function DefaultProviders({children} : DefaultProvidersProps){
  
    const client = new QueryClient()

    return(
        <QueryClientProvider client={client}>
            <FilterContextProvider>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </FilterContextProvider>
        </QueryClientProvider>
    )
}