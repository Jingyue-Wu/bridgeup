import { LatLngTuple } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useEffect, useState } from "react"
import { ShipType, MarkerType } from "../../types"
import * as L from "leaflet"
import arrow from "/icons/arrow.svg"
import "leaflet-rotatedmarker"

export default function Map() {
  const [ships, setShips] = useState<ShipType[]>([])
  const [markers, setMarkers] = useState<MarkerType[]>([])

  function fetchData() {
    const endpoint = "https://bridge-up-backend.onrender.com/map"

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setShips(data)
      })
  }

  useEffect(() => {
    updateShips()
  }, [ships])

  function updateShips() {
    const newMarkers: MarkerType[] = []

    ships.forEach((ship) => {
      const marker = {
        geocode: [ship.latitude, ship.longitude],
        popUp: ship.name,
        id: ship.id,
        heading: ship.heading,
        sog: ship.sog,
      }
      newMarkers.push(marker)
    })
    
    setMarkers(newMarkers)
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const icon = new L.Icon({
    iconUrl: arrow,
    iconRetinaUrl: arrow,
    popupAnchor: [-0, -20],
    iconSize: [25, 25],
    iconAnchor: [12.5, 25],
  })

  return (
    <>
      <div className="lg:m-auto lg:max-w-[70%] m-[5%]">
        <h1 className="text-[32px] pt-1 mt-5 font-title">Map</h1>

        <div className="border-0 mt-5 p-2 lg:p-4 rounded-[13px] bg-card dark:bg-card_d xss:h-[68vh] h-[60vh]">
          <MapContainer
            center={[43.04775, -79.212495]}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            attributionControl={false}
          >
            <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />

            {markers.map((marker) => (
              <Marker
                icon={icon}
                position={marker.geocode as LatLngTuple}
                key={marker.id}
                rotationAngle={marker.heading}
              >
                <Popup>
                  <h1 className="font-bold">{marker.popUp}</h1>
                  {marker.heading >= 270 || marker.heading <= 90 ? (
                    <h1>Heading: North</h1>
                  ) : (
                    <h1>Heading: South</h1>
                  )}
                  <h1>Speed: {(1.852 * marker.sog).toFixed(1)} km/h</h1>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  )
}
