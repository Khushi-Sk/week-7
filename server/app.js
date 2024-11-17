import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
const PORT = 8080
app.use(express.json())
app.use(cors());
dotenv.config();


const db = new pg.Pool({ connectionString: process.env.DB_URL })

app.get("/", function (req, res) {
    res.json("Connection Successful. yayyyayay")
})

app.get("/categories", async function(req, res) {
    const result = await db.query(`
        SELECT
        categories.id,
        categories.name, 
        categories.thumbnail
        FROM categories
        `)
    const categories = result.rows;
    res.status(200).json( categories )
})

app.get("/product", async function(req, res) {
    const requestedCategory  = req.query.categoryId
    const result = await db.query(`
        SELECT *
        FROM products WHERE ${requestedCategory}=products.category_id
        `)
    const product = result.rows;
    res.status(200).json(product)
})

// app.post("/addProduct", async function(req, res) {
//     const result = db.query(`
//         INSERT INTO products (name, thumbnail, details, price, category_id) VALUES
//         (Boxy Wool Blend Overshirt In Black,
//         https://images.asos-media.com/products/asos-design-boxy-wool-blend-overshirt-in-black/206843704-2?$n_320w$&wid=317&fit=constrain,
//         Colour: Off-White 
//         Fabric: Warm Fur 
//         Neck: Spread collar 
//         Sleeve: Long sleeves 
//         Button-type: Button placket/Buttoned cuffs 
//         Pockets: Chest pockets 
//         , 20.0, 1
// ) `)
//     const addProduct = (await result).rows;
//     res.status(200).send(addProduct)
// })


app.post("/getReviews", async function(req, res) {
    const { productId }  = await req.body
    // console.log(requestedCategory)
    const result = await db.query(`
        SELECT *
        FROM reviews 
        
        `)
    const review = result.rows;
    res.status(200).json(review)
})


app.post("/addReviews", async function(req, res) {
    const {userId, comment, productId, rating} = await req.body
    const result = await db.query("INSERT INTO reviews (user_id, comment, product_id, rating) VALUES ($1, $2, $3, $4)",
         [userId, comment, productId, rating] )
    const reviews = await result.rows
    res.status(200).json(reviews.rows)
})

app.listen(PORT, function(){
    console.log(`App is running on ${PORT}`)
})