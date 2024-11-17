import { useEffect, useState } from "react";
import { useParams } from "react-router";


export default function Reviews() {

    const [ reviews, setReviews ] = useState([])
    // const { product, review } = useParams()

    useEffect(() => {
        async function addReview() {
            const response = await fetch(`http://localhost:8080/addReviews`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId:7, comment: "my comment", productId: 1, rating: 4 } )
        })
        const data = await response.json()
        setReviews(data)
        console.log(data)
        }
        
        addReview()
    }, [])

    return (<>
        {reviews.map((review) => {
            <div key={review.id}>
                <h3>{review.userId}</h3>
                <h3>{review.comment}</h3>
                <h3>{review.product_id}</h3>
            </div>
        })}
    </>)
}