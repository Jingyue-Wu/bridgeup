import WebSocket from "ws"
import express from "express"
const router = express.Router()

const socket = new WebSocket("wss://stream.aisstream.io/v0/stream")

const AISkey = process.env.AIS_KEY

interface Ship {
  id: number
  latitude: number
  longitude: number
  name: string
  sog: number
  heading: number
  lastUpdated: number
}

let shipList: Ship[] = []

socket.onopen = (_) => {
  console.log("WebSocket connection established")

  let subscriptionMessage = {
    Apikey: AISkey,
    BoundingBoxes: [
      [
        [43.278205, -79.29245],
        [42.805477, -79.152374],
      ],
    ],
    FiltermessageTypes: ["PositionReport"],
  }
  socket.send(JSON.stringify(subscriptionMessage))
}

socket.onmessage = (event) => {
  let aisMessage = JSON.parse(event.data)
  let positionReport = aisMessage.Message.PositionReport

  const ship: Ship = {
    id: positionReport.UserID,
    latitude: positionReport.Latitude,
    longitude: positionReport.Longitude,
    name: aisMessage.MetaData.ShipName,
    sog: positionReport.Sog,
    heading: positionReport.TrueHeading,
    lastUpdated: Date.now(),
  }
  updateList(ship)
}

function updateList(newShip: Ship) {
  let inList = false
  for (let i = 0; i < shipList.length; i++) {
    if (shipList[i].id == newShip.id) {
      inList = true
      shipList[i].latitude = newShip.latitude
      shipList[i].longitude = newShip.longitude
      shipList[i].sog = newShip.sog
      shipList[i].heading = newShip.heading
      shipList[i].lastUpdated = newShip.lastUpdated
    }
  }

  if (!inList) {
    shipList.push(newShip)
    console.log(shipList)

    let currentdate = new Date()
    let datetime =
      "Last Sync: " +
      currentdate.getDay() +
      "/" +
      currentdate.getMonth() +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds()

    console.log(datetime)
  }

  shipList = shipList.filter((ship) => {
    return Date.now() - ship.lastUpdated <= 3600000
  })
}

router.get("/", (req, res) => {
  res.json(shipList)
})

module.exports = router
