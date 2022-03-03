const { Router } = require("express")

const { createTokenHandler } = require("./payment.controller")
const router = Router()

router.get("/token", createTokenHandler)

module.exports = router
