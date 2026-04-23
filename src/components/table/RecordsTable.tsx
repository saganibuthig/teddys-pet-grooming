import { ChevronUp, ChevronDown, Dog } from 'lucide-react'
import { RecordRow } from './RecordRow'
import { RecordCard } from './RecordCard'
import type { GroomingRecord, SortCol, SortDir } from '@/types'

interface Props {
  records: GroomingRecord[]
  sortCol: SortCol
  sortDir: SortDir
  onSort: (col: SortCol) => void
  onEdit: (r: GroomingRecord) => void
  onDelete: (id: number) => void
  onPhotoClick: (src: string, name: string) => void
}

const HEADERS: { label: string; col?: SortCol }[] = [
  { label: 'Name', col: 'ownerName' },
  { label: 'Date Sign In', col: 'signIn' },
  { label: 'Amount Due' },
  { label: 'Services' },
  { label: 'Status' },
  { label: 'Actions' },
]

export function RecordsTable({ records, sortCol, sortDir, onSort, onEdit, onDelete, onPhotoClick }: Props) {
  return (
    <>
      {/* Mobile + tablet cards */}
      <div className="md:hidden">
        {records.length === 0 ? (
          <div className="bg-brand-card border border-brand-border rounded-2xl py-16 flex flex-col items-center gap-2 text-brand-ink3">
            <Dog className="w-8 h-8 opacity-40" />
            <p className="text-sm">No records found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {records.map((r) => (
              <RecordCard key={r.id} record={r} onEdit={onEdit} onDelete={onDelete} onPhotoClick={onPhotoClick} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-brand-border">
            {HEADERS.map(({ label, col }) => (
              <th
                key={label}
                className={`px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-brand-ink3 select-none ${col ? 'cursor-pointer hover:text-brand-ink' : ''} ${col && sortCol === col ? 'text-brand-accent' : ''}`}
                onClick={() => col && onSort(col)}
              >
                <span className="flex items-center gap-1">
                  {label}
                  {col && sortCol === col && (
                    sortDir === 1
                      ? <ChevronUp className="w-3 h-3" />
                      : <ChevronDown className="w-3 h-3" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-16 text-center">
                <div className="flex flex-col items-center gap-2 text-brand-ink3">
                  <Dog className="w-8 h-8 opacity-40" />
                  <p className="text-sm">No records found.</p>
                </div>
              </td>
            </tr>
          ) : (
            records.map((r) => (
              <RecordRow
                key={r.id}
                record={r}
                onEdit={onEdit}
                onDelete={onDelete}
                onPhotoClick={onPhotoClick}
              />
            ))
          )}
        </tbody>
      </table>
      </div>
      </div>
    </>
  )
}
