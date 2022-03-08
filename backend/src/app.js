const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")

const routes = require("./routes.js")
//const payment = require("./payment")

mongoose.connect(process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/mercadoPago")

const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Accept", "Content-Type", "Authorization"],
  })
)
app.use(express.json())

app.use("/api", routes)
//app.use("/api/payment", payment)

module.exports = app
