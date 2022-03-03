const mercadoPago = require("mercadopago")

mercadopago.configure({
  client_id: process.env.PUBLIC_KEY,
  client_secret: process.env.ACCESS_TOKEN,
})
