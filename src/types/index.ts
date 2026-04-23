export type ServiceKey = 'bathing' | 'styling' | 'nail' | 'ear' | 'teeth'

export interface GroomingRecord {
  id: number
  name: string
  ownerName: string
  email: string
  dept: ServiceKey[]
  status: 'active' | 'inactive'
  photo: string | null
  signIn: string
}

export type DateFilter = 'all' | '1' | '2' | '3' | '4' | '5' | '6' | '7'
export type SortCol = 'ownerName' | 'signIn'
export type SortDir = 1 | -1
