import { FilterType } from "@/types/filter-types";
import { PriorityType } from "@/types/priority-types";

export function getCategoryByType(type: FilterType){
    if(type === FilterType.MUG) return "mugs"
    if(type === FilterType.SHIRT) return "t-shirts"
    return ""
}

export function getFiledByPriority(priority: PriorityType) {
    if(priority === PriorityType.NEWS) return {field: "created_at", order: "ASC" }
    if(priority === PriorityType.BIGGEST_PRICE) return {field: "price_in_cents", order: "DSC" }
    if(priority === PriorityType.MINOR_PRICE) return {field: "price_in_cents", order: "ASC" }

    return {field: "sales", order: "DSC" }
}

export const mountQuery = (type: FilterType, priority: PriorityType) => {
    if (type === FilterType.ALL && priority === PriorityType.POPULARITY) return `query {
            allProducts(sortField: "sales", sortOrder: "DSC") {
              id
              name
              price_in_cents
              image_url
            }
          }
        `

        const sortSettings = getFiledByPriority(priority)
        const categoryFilter = getCategoryByType(type)  
        return `
        query {
            allProducts(sortField: "${sortSettings.field}", sortOrder: "${sortSettings.order}", ${categoryFilter ? `filter: {category: "${categoryFilter}"}` : ''}) {
              id
              name
              price_in_cents
              image_url
              category
            }
          }
        `
}

// Coemecei mas não consegui finalizar.
export const paginationFilter = () => {
 
  return `
  query {
    allProducts(page: , perPage: 12) {
      id
      name
      price_in_cents
      category
      sales
      
    }
  }
  `
}