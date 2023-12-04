const express=require('express')
const router=express.Router()
const {getProducts,getProductById,getBestSellers, adminGetProducts,adminDeleteProduct,adminCreateProduct,adminUpdateProduct,adminUpload, adminDeleteProductImage}=require("../controllers/productController")
const {verifyIsLoggedIn} = require('../middlewares/verifyAuthToken')
const {verifyIsAdmin} = require('../middlewares/verifyAuthToken')
router.get("/category/:categoryName",getProducts)
router.get("/search/:searchQuery",getProducts)
router.get("/category/:categoryName/search/:searchQuery",getProducts)
router.get("/",getProducts)
router.get("/bestSeller",getBestSellers)
router.get("/get-one/:id",getProductById)
//admin routes
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.get("/admin",adminGetProducts)
router.delete("/admin/:id",adminDeleteProduct)
router.delete("/admin/image/:imagePath/:productId",adminDeleteProductImage)
router.put("/admin/:id",adminUpdateProduct)
router.post("/admin",adminCreateProduct)
router.post("/admin/upload",adminUpload)


module.exports=router