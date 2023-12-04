require("dotenv").config() 
var helmet=require('helmet')
const {createServer, Server}=require("http")
const express = require('express')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const app = express()
app.use(helmet())

const httpServer=createServer(app)
global.io=new Server(httpServer)

app.use(cookieParser())
app.use(fileUpload())

const port = 5000
const apiRoutes = require("./routes/apiRoutes")
app.use(express.json())
app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`My app listening on port ${port}`)
})

//mongodb connection

const connectDB = require("./config/db")
connectDB();




app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
})
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    }
    )
  } else {
    res.status(500).json({
      message: error.message,
    })
  }
  next(error);
})

// app.get('/', async (req, res, next) => {
//   const Product = require("./models/productmodel")
//   try {
//     const product = new Product
//     product.name = "New product name"
//     const productSaved = await product.save()
//     console.log(productSaved === product)
//     const products = await Product.find()
//     console.log(products.length)
//     res.send("Product created " + products.length)
//   }
//   catch (er) {
//     next(er)
//   }
// })