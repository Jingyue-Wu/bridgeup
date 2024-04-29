export interface BridgeType {
  id: number
  order: number
  name: string
  nickname: string
  location: string
  canal_id: number
  created_at: string
  updated_at: string
  status: Status
}

export interface Status {
  id: number
  status: string
  status_type: number
  valid_date: boolean
  requests: number
  bridge_id: number
  created_at: string
  updated_at: string
}

export interface ClosureType {
  id: number
  bridge_id: number
  time_string: string
  closed_for: string
  purpose: string
}

export interface ShipType {
  id: number
  latitude: number
  longitude: number
  name: string
  sog: number
  heading: number
}

export interface MarkerType {
  geocode: number[]
  popUp: string
  id: number
  heading: number
  sog: number
}

export interface StatusShip {
  latitude: number
  longitude: number
  speed: number
  heading: number
}

export interface CardType {
  bridge: BridgeType
  shipData: StatusShip[]
}
