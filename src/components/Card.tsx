import { BridgeType } from '../../types'
import { useState, useEffect } from 'react'

export default function Card({ bridge }: { bridge: BridgeType }) {
  const [bg, setBg] = useState(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    return mediaQuery.matches ? '#2D2D2D' : '#F4F4F4'
  })
  localStorage.setItem('bgColor', bg)

  const [statusCol, setStatusCol] = useState('#FCFCFC')

  const [textCol, setTextCol] = useState(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    return mediaQuery.matches ? '#FCFCFC' : '#2D2D2D'
  })
  localStorage.setItem('textColor', textCol)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      const newColor = matches ? '#2D2D2D' : '#F4F4F4'
      setBg(newColor)
      localStorage.setItem('bgColor', newColor)

      const newTextColor = matches ? '#FCFCFC' : '#2D2D2D'
      setTextCol(newTextColor)
      localStorage.setItem('textColor', newTextColor)
    }

    if (bridge.status.status == 'Available') {
      mediaQuery.addEventListener('change', handleChange)

      setStatusCol('#00D208')

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    } else if (bridge.status.status == 'Raising Soon') {
      setBg('#F1AE00')
      setStatusCol('#FCFCFC')
      setTextCol('#FCFCFC')
    } else if (
      bridge.status.status !== 'Available' &&
      bridge.status.status !== 'Raising Soon'
    ) {
      setBg('#E25656')
      setStatusCol('#FCFCFC')
      setTextCol('#FCFCFC')
    }
  }, [bridge.status.status])

  return (
    <div
      className='border-0 my-5 p-5 rounded-[13px] bg-card dark:bg-card_d'
      style={{ backgroundColor: bg! }}
    >
      <div className='flex justify-between'>
        <h1 style={{ color: textCol }} className='text-lg'>
          {bridge.name}
        </h1>
        <h2
          style={{ color: textCol }}
          className='font-thin text-text2 dark:text-text-light'
        >
          {bridge.location.split('(')[0]}
        </h2>
      </div>
      <div className='flex justify-between items-end'>

        <h1 style={{ color: statusCol }} className='text-xl mt-5 font-semi'>
          {/* font-semibold */}
          {bridge.status.status}
        </h1>

        {bridge.status.status == 'Raising Soon' && (
          <img
            className='w-10 h-9 object-cover'
            src='icons/warning.svg'
            alt=''
          />
        )}
        {bridge.status.status !== 'Available' &&
          bridge.status.status !== 'Raising Soon' && (
            <img
              className='w-10 h-9 object-cover'
              src='icons/lifting_bridge.svg'
              alt=''
            />
          )}
      </div>
    </div>
  )
}
