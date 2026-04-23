import { useState, useCallback } from 'react'
import type { GroomingRecord, DateFilter, SortCol, SortDir } from '@/types'

let _nextId = 1

export function useGroomingStore() {
  const [records, setRecords] = useState<GroomingRecord[]>([])
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')
  const [sortCol, setSortCol] = useState<SortCol>('signIn')
  const [sortDir, setSortDir] = useState<SortDir>(-1)

  const addRecord = useCallback(
    (fields: Omit<GroomingRecord, 'id' | 'signIn'>) => {
      setRecords((prev) => [
        ...prev,
        { ...fields, id: _nextId++, signIn: new Date().toISOString() },
      ])
    },
    [],
  )

  const updateRecord = useCallback(
    (
      id: number,
      fields: Omit<GroomingRecord, 'id' | 'signIn'>,
      existingSignIn: string,
    ) => {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, ...fields, signIn: existingSignIn } : r,
        ),
      )
    },
    [],
  )

  const deleteRecord = useCallback((id: number) => {
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
