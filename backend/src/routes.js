const { Router } = require("express")
const mongoose = require("mongoose")
const Product = require("./models/product.js")
const Order = require("./models/order.js")
const payment = require("./models/payment.js")
const mercadoPago = require("mercadopago")
const dotenv = require("dotenv")

dotenv.config()
mercadoPago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
})

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

router.post("/orders", async (req, res, next) => {
  const { products } = req.body
  try {
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findById(new mongoose.Types.ObjectId(products[i])).lean()
      products[i] = product
    }
    const order = await Order.create({ products })
    const items = products.map((p) => ({ title: p.name, unit_price: p.price, quantity: 1 }))
    const preference = {
      items,
      back_urls: {
        success: "http://localhost:3000/mercadopago/success",
        failure: "http://localhost:3000/mercadopago/failure",
        pending: "http://localhost:3000/mercadopago/pending",
      },
      external_reference: order._id.toString(),
    }
    const { response } = await mercadoPago.preferences.create(preference)
    console.log(response)
    res.json({ order, preferenceId: response.id })
  } catch (e) {
    next(e)
  }
})
router.post("/mercadopago/webhook", async (req, res, next) => {
  try {
    const { action } = req.body
    if (action === "payment.created" || action === "payment.updated") {
      const paymentId = req.body.data.id
      const { response } = await mercadopago.payment.get(paymentId)
      await updateOrder(response)
      await payment.create({ payload: response })
    }
    res.json({})
  } catch (e) {
    next(e)
  }
})

async function updateOrder(paymentInfo) {
  const status = paymentInfo.status
  const orderId = paymentInfo.external_reference
  const order = await Order.findById(orderId)

  if (status === "approved") {
    order.status = "payed"
    await order.save()
  }
}

module.exports = router
