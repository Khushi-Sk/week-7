import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import { Category } from "../context/categoryContext"
import { Route, Routes } from "react-router"
import Reviews from "./reviews"

export default function Product(){

    const { categoryId } = useParams()

    // I created category context, because I wanted to align category id with 
    // product.category_id, for showing products with respect to  its category
    
    const { categories, setCategories } = useContext(Category)
    const [product, setProduct] = useState([])
    const [reviews, setReviews] = useState([])
    const [ buy, setBuy] = useState(false)

    const handleBuy = () => {
        setBuy(!buy)
    }

    const handleReview = () => {
         <Routes>
            <Route path='/product' element={<Reviews />} />
        </Routes>
    }
    useEffect(() => {
        async function getProduct() {
            const response = await fetch(`http://localhost:8080/product?categoryId=${categoryId}`)
            const data = await response.json()
            setProduct(data)
        }    
        getProduct();
      }, [categoryId])

    useEffect(() => {
    async function getReviews() {
        const response = await fetch(`http://localhost:8080/getReviews`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({productId: product.id})
        })
        const data = await response.json()
        setReviews(data)
        console.log(data)
    }    
    getReviews();
    }, [])


    const categoryName = ["notcounted_Startfrom_0", "MEN", "WOMEN", "KIDS"] // category name with respect to category_id coming from DB
    return (<>
    <h1>Products for {categoryName[categoryId]}:</h1>
        {/* {product.filter((item) => { */}
        {product.map((item) => {
            return (
            <div key={item.id}>    
                <img src={item.thumbnail} width={300} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>Details: {item.details}</p>
                    <h3>Price: £ {item.price}</h3>
                    <button onClick={handleBuy}>{buy ? "Added to cart" : "Buy"}</button>
            </div>)
        })}
        <div className="btn">
            <button onClick={handleReview} id="addMyReview">Add your Review</button>
        </div>
        
        <div className="reviewDiv">
            <h2>Reviews</h2>
        {reviews.map((review) => {
            return ( <div key={review.id} className="eachReviewSec">
                    <h3>User{review.user_id}</h3>
                    <h3> {review.comment}</h3>
                    {/* <p>product: {review.product_id}</p> */}
                    
            </div>)
        })}
        </div>
        
        {/* <Routes>
            <Route path='/product' element={<Reviews />} />
        </Routes> */}
        {/* <Reviews /> */}

    </>)
}