const { Router } = require("express")
const mongoose = require("mongoose")

const Product = require("./models/product.js")
const Order = require("./models/order.js")

const router = Router()

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (e) {
    next(e)
  }
})

router.post("/products", async (req, res, next) => {
  try {
    const { name, description, price, image } = req.body
    const product = await Product.create({ name, description, price, image })
    res.json(product)
  } catch (e) {
    next(e)
  }
})

router.post("/orders", async (req, res) => {
  const { products } = req.body
  for (let i = 0; i < products.length; i++) {
    const product = await Product.findById(new mongoose.Types.ObjectId(products[i])).lean()
    products[i] = product
  }
  const order = await Order.create({ products })
  res.json(order)
})

module.exports = router
