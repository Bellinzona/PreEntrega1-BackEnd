const express = require("express")

const itemsRouter = require("./routes/items.router")
const carritoRouter = require("./routes/cart.router")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/api/items",itemsRouter)
app.use("/api/carrito",carritoRouter)

app.listen(8080, ()=> console.log("el server va a full"))