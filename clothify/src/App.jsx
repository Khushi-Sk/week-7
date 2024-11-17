import { Profiler, useContext, useEffect, useState } from 'react'
import { Link, Route, Routes } from "react-router-dom";
import './App.css'
import Product from './components/product';
import { Category } from './context/categoryContext';
import Reviews from './components/reviews';

function App() {

  const { categories, setCategories } = useContext(Category)
  const [product, setProduct] = useState([]);
  const [addProduct, setAddProduct] = useState([]);
  
  useEffect(() => {
      async function getCategories() {
          const response = await fetch("http://localhost:8080/categories")
          const data = await response.json()
          
          setCategories(data)
          console.log(data)
      }    
      getCategories();
    }, [])
  
    
    // useEffect(() => {
    //   async function addProduct() {
    //       const response = await fetch("http://localhost:8080/addProduct", {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({})
    //       })
    //       const data = await response.json()
    //       console.log(data.Array)
    //   }    
    //   addProduct();
    // }, [])

    // console.log(categories)
  return (
    <>
    {/* <h1>Choose your Category</h1> */}
    <Routes>
      <Route path='/'
    element={
      <div className='categoryLayout' >
      {categories.map((category) => {
      return (
        <div key={category.id} className='categoryDiv'  >
          {/* <Routes>
            <Route to={"/product/:name"} element={ <Product/>}  >
            
            </Route> 
          </Routes> */}
          <Link to={`/product/${category.id}`} >
              <img width={500} src={category.thumbnail} className='categoryImg' /> 
          </Link>
            
            <h2>{category.name}</h2>
        </div>
      )  
    })}
    </div>
    }
    />
    <Route path="/product/:categoryId" element={<Product />} />
    
    </Routes>
    </>
  )
}

export default App
