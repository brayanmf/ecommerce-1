const app = require("./src/app.js")
const dotenv = require("dotenv")

dotenv.config({ path: "./.env" })

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Running on port ${PORT} ...`))
