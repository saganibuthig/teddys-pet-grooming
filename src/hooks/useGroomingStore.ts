import { useState, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { GroomingRecord, DateFilter, SortCol, SortDir } from '@/types'

type Row = {
  id: number
  name: string
  owner_name: string
  email: string
  dept: string[]
  status: string
  photo: string | null
  sign_in: string
}

function toRecord(row: Row): GroomingRecord {
  return {
    id: row.id,
    name: row.name,
    ownerName: row.owner_name,
    email: row.email,
    dept: row.dept as GroomingRecord['dept'],
    status: row.status as GroomingRecord['status'],
    photo: row.photo,
    signIn: row.sign_in,
  }
}

export function useGroomingStore() {
  const [records, setRecords] = useState<GroomingRecord[]>([])
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')
  const [sortCol, setSortCol] = useState<SortCol>('signIn')
  const [sortDir, setSortDir] = useState<SortDir>(-1)

  useEffect(() => {
    supabase
      .from('grooming_records')
      .select('*')
      .order('sign_in', { ascending: false })
      .then(({ data }) => {
        if (data) setRecords(data.map(toRecord))
      })
  }, [])

  const addRecord = useCallback(
    async (fields: Omit<GroomingRecord, 'id' | 'signIn'>) => {
      const { data } = await supabase
        .from('grooming_records')
        .insert({
          name: fields.name,
          owner_name: fields.ownerName,
          email: fields.email,
          dept: fields.dept,
          status: fields.status,
          photo: fields.photo,
        })
        .select()
        .single()
      if (data) setRecords((prev) => [toRecord(data), ...prev])
    },
    [],
  )

  const updateRecord = useCallback(
    async (id: number, fields: Omit<GroomingRecord, 'id' | 'signIn'>, existingSignIn: string) => {
      const { data } = await supabase
        .from('grooming_records')
        .update({
          name: fields.name,
          owner_name: fields.ownerName,
          email: fields.email,
          dept: fields.dept,
          status: fields.status,
          photo: fields.photo,
        })
        .eq('id', id)
        .select()
        .single()
      if (data) {
        setRecords((prev) =>
          prev.map((r) => (r.id === id ? { ...toRecord(data), signIn: existingSignIn } : r)),
        )
      }
    },
    [],
  )

  const deleteRecord = useCallback(async (id: number) => {
    await supabase.from('grooming_records').delete().eq('id', id)
    setRecords((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const toggleSort = useCallback(
    (col: SortCol) => {
      if (sortCol === col) setSortDir((d) => (d === 1 ? -1 : 1))
      else { setSortCol(col); setSortDir(1) }
    },
    [sortCol],
  )

  const filteredRecords = (() => {
    const q = search.toLowerCase()
    const now = new Date()
    const cutoff = dateFilter !== 'all'
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - (parseInt(dateFilter) - 1))
      : null

    return records
      .filter((r) => {
        const match =
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.ownerName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q)
        const inRange = !cutoff || (!!r.signIn && new Date(r.signIn) >= cutoff)
        return match && inRange
      })
      .sort((a, b) => {
        const va = (a[sortCol] ?? '') as string
        const vb = (b[sortCol] ?? '') as string
        return va.localeCompare(vb) * sortDir
      })
  })()

  const stats = {
    total: records.length,
    active: records.filter((r) => r.status === 'active').length,
    today: new Date().toLocaleDateString('en-PH', {
      month: 'short', day: 'numeric', year: 'numeric',
    }),
  }

  return {
    records, filteredRecords, stats,
    search, setSearch,
    dateFilter, setDateFilter,
    sortCol, sortDir, toggleSort,
    addRecord, updateRecord, deleteRecord,
  }
}
