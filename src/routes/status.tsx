import { useState, useEffect } from "react"
import { BridgeType, StatusShip, ShipType } from "../../types"
import Card from "../components/Card"

export default function Status() {
  const [bridges, setBridges] = useState<BridgeType[]>([])
  const [ships, setShips] = useState<StatusShip[]>([])

  function fetchData() {
    const status = "https://bridge-up-backend.onrender.com/status"
    const shipData = "https://bridge-up-backend.onrender.com/map"

    fetch(status)
      .then((response) => response.json())
      .then((data) => {
        setBridges(data.bridges)
        console.log(data.bridges)
      })

    fetch(shipData)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const newShips: StatusShip[] = []
        data.forEach((ship: ShipType) => {
          const s = {
            latitude: ship.latitude,
            longitude: ship.longitude,
            speed: ship.sog,
            heading: ship.heading,
          }
          newShips.push(s)
        })
        setShips(newShips)
      })
  }

  useEffect(() => {
    console.log(ships)
  }, [ships])

  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="lg:m-auto lg:max-w-[40%] m-[5%]">
        <h1 className="text-[32px] pt-1 my-5 font-title">Bridge Status</h1>
        {bridges.map((bridge) => (
          <Card bridge={bridge} key={bridge.id} shipData={ships} />
        ))}
      </div>
    </>
  )
}
