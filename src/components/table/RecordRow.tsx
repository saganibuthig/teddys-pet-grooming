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

export function RecordRow({ record, onEdit, onDelete, onPhotoClick }: Props) {
  const color = getAvatarColor(record.id)

  return (
    <tr className="border-b border-brand-border hover:bg-brand-hover transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 overflow-hidden ${record.photo ? 'cursor-pointer' : ''}`}
            style={{ background: color + '20', color }}
            onClick={() => record.photo && onPhotoClick(record.photo, record.name)}
          >
            {record.photo
              ? <img src={record.photo} alt={record.name} className="w-full h-full object-cover" />
              : getInitials(record.name)}
          </div>
          <div>
            <div className="text-sm font-medium text-brand-ink">{record.ownerName}</div>
            <div className="font-mono text-xs text-brand-ink3">{record.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-brand-ink2 min-w-[180px]">{formatSignIn(record.signIn)}</td>
      <td className="px-4 py-3 text-sm font-mono text-brand-ink">₱{record.dept.length * SERVICE_PRICE}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {record.dept.length
            ? record.dept.map((d) => (
                <Badge key={d} className={SERVICE_BADGE_CLASSES[d]}>{SERVICE_LABELS[d]}</Badge>
              ))
            : <span className="text-brand-ink3 text-sm">—</span>}
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="flex items-center gap-1.5 text-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'active' ? 'bg-brand-green' : 'bg-brand-ink3'}`} />
          {record.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-1.5">
          <Button variant="outline" size="sm" onClick={() => onEdit(record)}>
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="hover:border-red-300 hover:text-red-600" onClick={() => onDelete(record.id)}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  )
}
