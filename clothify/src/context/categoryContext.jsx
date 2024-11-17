import { createContext, useState } from "react";

export const Category = createContext();

export function MyCategory({children}) {

    // I created category context, because I wanted to align category name with 
    // product.category_id, for showing products with respect to  its category

    
    const [categories, setCategories] = useState([])

    return (
        <Category.Provider  value={{categories , setCategories}}> 
            {children}            
        </Category.Provider>

    )

}