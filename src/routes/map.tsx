import { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'

export default function Map() {

  const [coord, setCoord] = useState(51.5071)

  const markers = [
    {
      geocode: [coord, -0.07],
      popUp: 'Hello, I am pop up 1',
      id: 1,
    },
    {
      geocode: [51.507, -0.07],
      popUp: 'Hello, I am pop up 2',
      id: 2,
    },
    {
      geocode: [51.502, -0.08],
      popUp: 'Hello, I am pop up 3',
      id: 3,
    },
  ]


  return (
    <>
      <div className='lg:m-auto lg:max-w-[40%] m-[5%]'>
        <h1 className='text-[32px] pt-1 my-5 font-title'>Map</h1>

        <div className='border-0 my-5 p-2 lg:p-4 rounded-[13px] bg-card dark:bg-card_d'>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '60vh', width: '100%' }}
            attributionControl={false}
          >
            <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png' />

            {markers.map((marker) => (
              <Marker position={marker.geocode as LatLngTuple} key={marker.id}>
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>
      </div>
    </>
  )
}
