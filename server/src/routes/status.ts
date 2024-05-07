import express from "express"
const router = express.Router()

let bridgeStatus = null

async function getData() {
  try {
    const res = await fetch("https://canalstatus.com/api/v1/bridges", {
      cache: "no-store",
    })
    bridgeStatus = await res.json()
  } catch (e) {
    console.error("An error has occurred getting bridge status")
  }
}

getData()

setInterval(getData, 60000)

router.get("/", (req, res) => {
  res.json(bridgeStatus)
})

module.exports = router
