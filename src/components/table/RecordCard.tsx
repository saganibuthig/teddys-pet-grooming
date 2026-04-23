import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SERVICE_LABELS, SERVICE_BADGE_CLASSES, SERVICE_PRICE } from '@/lib/constants'
import { getInitials, getAvatarColor, formatSignIn } from '@/lib/utils'
import type { GroomingRecord } from '@/types'

interface Props {
  record: GroomingRecord
  onEdit: (r: GroomingRecord) => void
  onDelete: (id: number) => void
  onPhotoClick: (src: string, name: string) => void
}

export function RecordCard({ record, onEdit, onDelete, onPhotoClick }: Props) {
  const color = getAvatarColor(record.id)

  return (
    <div className="bg-brand-card border border-brand-border rounded-xl px-3 py-3 space-y-2.5">
      {/* Row 1: avatar + name/email + action buttons */}
      <div className="flex items-center gap-2.5">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 overflow-hidden ${record.photo ? 'cursor-pointer' : ''}`}
          style={{ background: color + '20', color }}
          onClick={() => record.photo && onPhotoClick(record.photo, record.name)}
        >
          {record.photo
            ? <img src={record.photo} alt={record.name} className="w-full h-full object-cover" />
            : getInitials(record.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-brand-ink truncate">{record.ownerName}</div>
          <div className="font-mono text-xs text-brand-ink3 truncate">{record.email}</div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <Button variant="outline" size="sm" onClick={() => onEdit(record)}>
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="hover:border-red-300 hover:text-red-600" onClick={() => onDelete(record.id)}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Row 2: service badges — wraps freely */}
      <div className="flex flex-wrap gap-1 pl-[46px]">
        {record.dept.length
          ? record.dept.map((d) => (
              <Badge key={d} className={SERVICE_BADGE_CLASSES[d]}>{SERVICE_LABELS[d]}</Badge>
            ))
          : <span className="text-brand-ink3 text-xs">No services</span>}
      </div>

      {/* Row 3: date · amount · status */}
      <div className="flex items-center justify-between pl-[46px] gap-2">
        <span className="font-mono text-xs text-brand-ink2 truncate">{formatSignIn(record.signIn)}</span>
        <span className="font-mono text-xs font-medium text-brand-ink shrink-0">₱{record.dept.length * SERVICE_PRICE}</span>
        <span className="flex items-center gap-1 text-xs shrink-0">
          <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'active' ? 'bg-brand-green' : 'bg-brand-ink3'}`} />
          <span className="text-brand-ink2">{record.status === 'active' ? 'Active' : 'Inactive'}</span>
        </span>
      </div>
    </div>
  )
}
