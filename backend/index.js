const dotenv = require("dotenv")
const app = require("./src/app.js")
dotenv.config()

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Running on port ${PORT} ...`))
