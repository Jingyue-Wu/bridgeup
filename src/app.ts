import express from "express"
const app = express()
const port = 3000

app.listen(port, () => {
  return console.log(
    `Server is listening at http://localhost:${port}`
  )
})

const statusRouter = require("./routes/status")
app.use('/status', statusRouter)

const closuresRouter = require("./routes/closures")
app.use('/closures', closuresRouter)

// const mapRouter = require("./routes/map")
// app.use('/map', mapRouter)

// app.get("/", (req, res) => {
//   res.send("Hello NOD Readers!")
// })
