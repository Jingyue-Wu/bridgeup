import { CardType } from "../../types"
import { useState, useEffect } from "react"

export default function Card({ bridge, shipData }: CardType) {
  const [expand, setExpand] = useState(false)
  const [estimation, setEstimation] = useState(0)
  const [time, setTime] = useState<string>()

  const bridgeCoords: Record<number, [number, number]> = {
    1: [43.216172, -79.212292],
    2: [43.191869, -79.200923],
    3: [43.165754, -79.195044],
    4: [43.145274, -79.192331],
    5: [43.076501, -79.210472],
    6: [42.901493, -79.245437],
    7: [42.896482, -79.246597],
    8: [42.886398, -79.248593],
  }

  useEffect(() => {
    const distList: number[] = []
    const speedList: number[] = []

    shipData.forEach((ship) => {
      const dy = bridgeCoords[bridge.id][0] - ship.latitude

      if (
        (dy > 0 && (ship.heading >= 270 || ship.heading <= 90)) ||
        (dy < 0 && ship.heading < 270 && ship.heading > 90)
      ) {
        const dist = getDistance(
          bridgeCoords[bridge.id][0],
          bridgeCoords[bridge.id][1],
          ship.latitude,
          ship.longitude
        )

        distList.push(dist)
        speedList.push(ship.speed)
      }
    })

    const fastest = getFastest(distList)
    const time = getTime(distList[fastest], speedList[fastest])

    setEstimation(time)
    console.log(bridge.id, distList)
  }, [shipData])

  useEffect(() => {
    const n = new Date(0, 0)
    n.setMinutes(+estimation * 60)
    const result = n.toTimeString().slice(0, 5)
    setTime(result)
  }, [estimation])

  // Convert latitude/longitude to kilometers
  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6378.137
    const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180
    const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return d
  }

  function getFastest(distList: number[]) {
    let smallestDist = 0
    for (let i = 0; i < distList.length; i++) {
      if (distList[i] < distList[smallestDist]) {
        smallestDist = i
      }
    }
    console.log(smallestDist)

    return smallestDist
  }

  function getTime(dist: number, speed: number) {
    let time: number = 0

    if (speed < 1) {
      time = dist / 1.25
    } else if (speed == 0) {
      if (dist < 1.5) {
        time = dist / 20
      } else {
        time = dist / 2
      }
    } else {
      time = dist / speed
    }

    console.log(dist, speed, time)

    if (dist > 2.5) {
      if (time > 10) {
        return time - 3.5
      }
      return time + 0.5
    } else {
      return time
    }
  }

  const [bg, setBg] = useState(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    return mediaQuery.matches ? "#2D2D2D" : "#F4F4F4"
  })

  localStorage.setItem("bgColor", bg)

  const [statusCol, setStatusCol] = useState("#FCFCFC")
  const [textCol, setTextCol] = useState(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    return mediaQuery.matches ? "#FCFCFC" : "#2D2D2D"
  })

  localStorage.setItem("textColor", textCol)

  const [defaultTextCol, setDefaultTextCol] = useState(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    return mediaQuery.matches ? "#FCFCFC" : "#2D2D2D"
  })

  localStorage.setItem("defaultTextColor", textCol)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      const newColor = matches ? "#2D2D2D" : "#F4F4F4"
      setBg(newColor)
      localStorage.setItem("bgColor", newColor)

      const newTextColor = matches ? "#FCFCFC" : "#2D2D2D"
      setTextCol(newTextColor)
      localStorage.setItem("textColor", newTextColor)

      const newDefaultTextColor = matches ? "#FCFCFC" : "#2D2D2D"
      setDefaultTextCol(newDefaultTextColor)
      localStorage.setItem("defaultTextColor", newDefaultTextColor)
    }

    const handleChangeDefault = ({ matches }: MediaQueryListEvent) => {
      const newDefaultTextColor = matches ? "#FCFCFC" : "#2D2D2D"
      setDefaultTextCol(newDefaultTextColor)
      localStorage.setItem("defaultTextColor", newDefaultTextColor)
    }

    if (bridge.status.status == "Available") {
      mediaQuery.addEventListener("change", handleChange)

      setStatusCol("#00D208")

      return () => {
        mediaQuery.removeEventListener("change", handleChange)
      }
    } else if (bridge.status.status == "Raising Soon") {
      setBg("#F1AE00")
      setStatusCol("#FCFCFC")
      setTextCol("#FCFCFC")

      mediaQuery.addEventListener("change", handleChangeDefault)
      return () => {
        mediaQuery.removeEventListener("change", handleChangeDefault)
      }
    } else if (
      bridge.status.status !== "Available" &&
      bridge.status.status !== "Raising Soon"
    ) {
      setBg("#E25656")
      setStatusCol("#FCFCFC")
      setTextCol("#FCFCFC")

      mediaQuery.addEventListener("change", handleChangeDefault)
      return () => {
        mediaQuery.removeEventListener("change", handleChangeDefault)
      }
    }
  }, [bridge.status.status])

  const links: Record<number, string> = {
    1: "https://maps.app.goo.gl/UvZkapeVtSvQwbCA8",
    2: "https://maps.app.goo.gl/3MdUHNwUgdkzGq9f6",
    3: "https://maps.app.goo.gl/4V84z89C34nQ1xh78",
    4: "https://maps.app.goo.gl/FX7ftuh7YSpvhviR6",
    5: "https://maps.app.goo.gl/ATP4hiaAcUqL9gKm6",
    6: "https://maps.app.goo.gl/SNT83jZzGhbZCmiw8",
    7: "https://maps.app.goo.gl/sXxW8QL4md9GzkmBA",
    8: "https://maps.app.goo.gl/uJAV8gfao4t6bp279",
  }

  return (
    <div
      className="border-0 my-5 p-5 rounded-[13px] bg-card dark:bg-card_d"
      style={{ backgroundColor: bg! }}
      onClick={() => {
        expand ? setExpand(false) : setExpand(true)
      }}
    >
      <div className="flex justify-between relative">
        <h1 style={{ color: textCol }} className="text-lg">
          {bridge.name}
        </h1>

        <h2
          style={{ color: textCol }}
          className="font-thin text-text2 dark:text-text-light"
        >
          {bridge.location.split("(")[0]}
        </h2>
      </div>

      <div className="flex justify-between items-end">
        <h1
          style={{ color: statusCol }}
          className="text-xl mt-5 font-semi xl:font-primary xl:font-thin"
        >
          {bridge.status.status}
        </h1>

        {bridge.status.status == "Raising Soon" && (
          <img
            className="w-10 h-9 object-cover"
            src="icons/warning.svg"
            alt=""
          />
        )}

        {bridge.status.status !== "Available" &&
          bridge.status.status !== "Raising Soon" && (
            <img
              className="w-10 h-9 object-cover"
              src="icons/lifting_bridge.svg"
              alt=""
            />
          )}
      </div>
      <div
        className="overflow-hidden transition-max-height duration-150"
        style={{ maxHeight: expand ? "260px" : "0" }}
      >
        <div
          className="mt-6 flex flex-col gap-5 text-lg"
          style={{ color: textCol }}
        >
          {estimation > 0.5 && estimation < 5 ? (
            <h1>Estimated time until raised: {time} hours</h1>
          ) : (
            <h1>Estimated time until raised: N/A</h1>
          )}
          <a
            href={links[bridge.id]}
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <div className="border-0 p-3 rounded-[10px] dark:bg-text2 bg-bg text-center">
              <h1 className="text-md" style={{ color: defaultTextCol }}>
                Directions
              </h1>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
