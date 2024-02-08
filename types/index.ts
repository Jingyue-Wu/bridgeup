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
  closures: any[]
}

export interface Status {
  id: number
  status: string
  status_type: number
  valid_date: boolean
  next: any
  subsequent: any
  requests: number
  bridge_id: number
  created_at: string
  updated_at: string
  next_direction: any
  subsequent_direction: any
}

export interface ClosureType {
  id: number
  bridge_id: number
  time_string: string
  closed_for: string
  purpose: string
}
