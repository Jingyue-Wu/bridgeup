import { BridgeType } from '../../types'

export default function Card({ bridge }: { bridge: BridgeType }) {
    return (
      <div className='card'>
        <h2>{bridge.name}</h2>
        <p>{bridge.status.status}</p>
        <p>{bridge.status.updated_at}</p>
      </div>
    )
  }