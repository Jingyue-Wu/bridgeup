import express from "express"
import cors from "cors"
require("dotenv").config()

const app = express()

app.use(cors())

const port = 3000

app.listen(port, () => {
  return console.log(`Server is listening at port ${port}`)
})

app.get("/", (req, res) => {
  res.send("Bridge Up API: /status, /closures, /map")
})

const statusRouter = require("./routes/status")
app.use("/status", statusRouter)

const closuresRouter = require("./routes/closures")
app.use("/closures", closuresRouter)

const mapRouter = require("./routes/map")
app.use("/map", mapRouter)
