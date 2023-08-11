import { useState, useEffect } from 'react'
import { BridgeType } from '../../types'
import Card from '../components/Card'
  
export default function Status() {
    const [bridges, setBridges] = useState<BridgeType[]>([])
  
    function fetchData(){
      const endpoint = 'https://bridge-up-api.vercel.app/api/bridges'
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          setBridges(data.bridges)
          console.log(data.bridges)
        })
    }  
  
    useEffect(() => {
      fetchData();
  
      const interval = setInterval(() => {
        fetchData();
      }, 60000)
  
      return () => clearInterval(interval)
    }, [])
  
    return (
      <>
        {bridges.map((bridge) => (
          <Card bridge={bridge} key={bridge.id} />
        ))}
      </>
    )
}