import { styled } from "styled-components"
import { ArrowIcon } from "./icons/arrow-icon"
import { useState } from "react"
import { useFilter } from "@/hooks/useFilter"
import { PriorityType } from "@/types/priority-types"



const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    button {
        border: none;
        background: transparent;
        cursor: pointer;
        font-family: inherit;
        color: var(--text-dark);
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        display: flex;
        align-items: center;
        gap: 16px;
    }
`

const PriorityFilter = styled.ul`
    position: absolute;
    width: 176px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--shapes-01, #FFF);
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.10);
    padding: 12px 16px;
    list-style: none;
    top: 100%;
    z-index: 999;
    right: 8px;
     
    li {
        color: var(--text-dark);
        font-family: inherit;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        cursor: pointer;
    }

    li + li {
        margin-top: 4px;
    }
`

export function FilterByPriority(){
    const [isOpen, setIsOpen] = useState(false)
    const {setPriority} = useFilter()

   const handleOpen = () => setIsOpen(prev => !prev)

   const handleUpdatePriority = (value: PriorityType) => {
    setPriority(value)
    setIsOpen(false)
   }
    
    return(
        <FilterContainer>
            <button onClick={handleOpen}>
                Organizar por
                <ArrowIcon />
            </button>
            {isOpen && 
                <PriorityFilter>
                    <li onClick={() => handleUpdatePriority(PriorityType.NEWS)}>Novidades</li>
                    <li onClick={() => handleUpdatePriority(PriorityType.BIGGEST_PRICE)}>Preço: Maior - menor</li>
                    <li onClick={() => handleUpdatePriority(PriorityType.MINOR_PRICE)}>Preço: Menor - maior</li>
                    <li onClick={() => handleUpdatePriority(PriorityType.POPULARITY)}>Mais vendidos</li>
                </PriorityFilter>
            }
        </FilterContainer>
    )
}