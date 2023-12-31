const Product = require("../models/ProductModel")
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const path = require("path")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
const getProducts = async (req, res, next) => {
    try {
        const pageNum = Number(req.query.pageNum) || 1;
        //sort by name,price
        let sort = {} //dynamic object
        let select = {}
        const sortOption = req.query.sort || ""
        if (sortOption) {
            let sortOpt = sortOption.split("_")
            sort = { [sortOpt[0]]: Number(sortOpt[1]) }

        }
        let queryCondition = false
        let priceQueryCondition = {}
        let ratingQueryCondition = {}
        let categoryQueryCondition = {}
        let attrsQueryCondition = []
        let searchQueryCondition = {}
        let query = {}
        if (req.query.price) {
            queryCondition = true
            priceQueryCondition = { price: { $lte: Number(req.query.price) } }
        }

        if (req.query.rating) {
            queryCondition = true
            ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } }
        }

        const categoryName = req.params.categoryName || ""

        if (categoryName) {
            console.log("categoryName:" + categoryName)
            queryCondition = true
            let a = categoryName.replaceAll(",", "/")
            var regEx = new RegExp("^" + a)
            categoryQueryCondition = { category: regEx }
        }

        if (req.query.category) {
            queryCondition = true
            let a = req.query.category.split(",").map((item) => {
                if (item) return new RegExp("^" + item)
            })
            categoryQueryCondition = { category: { $in: a } }
        }
        if (req.query.attrs) {
            attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
                if (item) {
                    let a = item.split("-");
                    let values = [...a];
                    values.shift();
                    let finalQuery = { attrs: { $elemMatch: { key: a[0], value: { $in: values } } }, };
                    acc.push(finalQuery);
                    return acc;
                } else return acc;
            }, []);
            console.log(attrsQueryCondition)
            queryCondition = true;

        }
        const searchQuery = req.params.searchQuery || ""
        if (searchQuery) {
            queryCondition = true;
            //query = { $text: { $search: '"'+searchQuery+'"' } }
            searchQueryCondition = { $text: { $search: searchQuery } }
            select = { score: { $meta: "textScore" } }
            sort = { score: { $meta: "textScore" } }
        }
        if (queryCondition) {
            query = { $and: [priceQueryCondition, ratingQueryCondition, categoryQueryCondition, ...attrsQueryCondition] }
        }
        const totalProducts = await Product.countDocuments(query)
        const products = await Product.find(query)
            .select(select)
            .skip(recordsPerPage * (pageNum - 1))
            .sort(sort)
            .limit(recordsPerPage)
        res.json({
            products,
            pageNum,
            paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage)
        })
    } catch (error) {
        next(error)
    }
}
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate("reviews").orFail()
        res.json(product)
    }
    catch (error) {
        next(error)
    }
}
const getBestSellers = async (req, res, next) => {
    try {
        const products = await Product.aggregate([
            { $sort: { category: 1, sales: -1 } },
            { $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } } },
            { $replaceWith: "$doc_with_max_sales" },
            {$match:{sales:{$gt:0}}},
            { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
            { $limit: 3 }
        ])
        res.json(products)
    }
    catch (error) {
        next(error)
    }
}

const adminGetProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
            .sort({ category: 1 })
            .select("name price category")
        res.json(products)
    }
    catch (error) {
        next(error)
    }
}
const adminDeleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).orFail()
        await product.deleteOne()
        res.json({ message: "product removed" })
    }
    catch (error) {
        next(error)
    }
}
const adminCreateProduct = async (req, res, next) => {
    try {
        const product = new Product()
        const { name, description, count, price, category, attributesTable } = req.body
        product.name = name
        product.description = description
        product.count = count
        product.price = price
        product.category = category
        if (attributesTable.length > 0) {
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        }
        await product.save()
        res.json({
            message: "product created",
            productId: product._id
        })
    }
    catch (error) {
        next(error)
    }
}
const adminUpdateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).orFail()
        const { name, description, count, price, category, attributesTable } = req.body
        product.name = name || product.name
        product.description = description || product.description
        product.count = count || product.count
        product.price = price || product.price
        product.category = category || product.category
        if (attributesTable.length > 0) {
            product.attrs = []
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        }
        else {
            product.attrs = []
        }
        await product.save()
        res.json({
            message: "product updated",
        })

    }
    catch (error) {
        next(error)
    }
}
const adminUpload = async (req, res, next) => {
    if (req.query.cloudinary === "true") {
        try {
            console.log("req.query.id:"+req.query.productId)
            const product = await Product.findById(req.query.productId).orFail()
            console.log("req.body.url:"+req.body.url)
            product.images.push({ path: req.body.url })
            await product.save()
        } catch (err) {
            next(err)
        }
        return
    }
        try {
            if (!req.files || !!req.files.images === false) {
                return res.status(400).send("No files were uploaded.")
            }
            imagesTable = []
            if (Array.isArray(req.files.images)) {
                imagesTable = req.files.images
            }
            else {
                imagesTable.push(req.files.images)
            }

            //validation of an image

            const validateResult = imageValidate(imagesTable)
            if (validateResult.error) {
                return res.status(400).send(validateResult.error)
            }

            //Upload Directory

            const uploadDirectory = path.resolve(__dirname, "../../front-end", "public", "images", "products")
            const product = await Product.findById(req.query.productId)
            //Save image on server after changing its name

            for (let image of imagesTable) {
                var fileName = uuidv4() + path.extname(image.name)
                var uploadPath = uploadDirectory + "/" + fileName
                console.log("uploadPath:" + uploadPath)
                product.images.push({ path: "/images/products/" + fileName })
                console.log(req.query.productId)
                image.mv(uploadPath, function (error) {
                    if (error) {
                        return res.status(500).send(err)
                    }
                })

            }
            res.send("Images Uploaded")
            await product.save()
        } catch (error) {
            next(error)
        }
}
const adminDeleteProductImage = async (req, res, next) => {
    const imagePath = decodeURIComponent(req.params.imagePath)
    console.log("cloudinary:"+req.query.cloudinary)
    if (req.query.cloudinary === "true"){
        try {
            console.log("req.params.productId : "+req.params.productId)
            console.log("req.params.imagePath : "+req.params.imagePath)
            await Product.findOneAndUpdate({ _id: req.params.productId }, { $pull: { images: { path: imagePath } } }).orFail()

        } catch (er) {
            next(er)
        }
        return
    }
    try {
        console.log(imagePath)
        const finalPath = path.resolve("../front-end/public") + imagePath
        console.log(finalPath)
        fs.unlink(finalPath, (err) => {
            if (err) {
                res.status(500).send(err)
            }
        })
        await Product.findOneAndUpdate({ _id: req.params.productId }, { $pull: { images: { path: imagePath } } }).orFail()
        res.end()
    }
    catch (error) {
        next(error)
    }
}
module.exports = { getProducts, getProductById, getBestSellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload, adminDeleteProductImage }