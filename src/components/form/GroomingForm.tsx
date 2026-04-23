import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { PhotoUpload } from './PhotoUpload'
import { ServiceCheckboxes } from './ServiceCheckboxes'
import type { GroomingRecord, ServiceKey } from '@/types'

interface Props {
  editingRecord: GroomingRecord | null
  onSave: (fields: Omit<GroomingRecord, 'id' | 'signIn'>) => void
  onCancel: () => void
  onOpenCamera: () => void
  pendingCameraPhoto: string | null
  onClearCameraPhoto: () => void
}

export function GroomingForm({ editingRecord, onSave, onCancel, onOpenCamera, pendingCameraPhoto, onClearCameraPhoto }: Props) {
  const [name, setName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [email, setEmail] = useState('')
  const [dept, setDept] = useState<ServiceKey[]>([])
  const [status, setStatus] = useState<'active' | 'inactive'>('active')
  const [photo, setPhoto] = useState<string | null>(null)

  useEffect(() => {
    if (editingRecord) {
      setName(editingRecord.name)
      setOwnerName(editingRecord.ownerName)
      setEmail(editingRecord.email)
      setDept(editingRecord.dept)
      setStatus(editingRecord.status)
      setPhoto(editingRecord.photo)
    }
  }, [editingRecord])

  useEffect(() => {
    if (pendingCameraPhoto) {
      setPhoto(pendingCameraPhoto)
      onClearCameraPhoto()
    }
  }, [pendingCameraPhoto, onClearCameraPhoto])

  const reset = () => {
    setName(''); setOwnerName(''); setEmail('')
    setDept([]); setStatus('active'); setPhoto(null)
  }

  const handleSave = () => {
    if (!name.trim()) { toast.error('Pet name is required'); return }
    if (!ownerName.trim()) { toast.error('Owner name is required'); return }
    onSave({ name: name.trim(), ownerName: ownerName.trim(), email: email.trim(), dept, status, photo })
    reset()
  }

  const handleCancel = () => { reset(); onCancel() }

  const isEditing = !!editingRecord

  return (
    <div className={`w-full bg-brand-card border rounded-2xl p-3 sm:p-5 lg:sticky lg:top-[72px] ${isEditing ? 'border-brand-gold ring-2 ring-brand-gold/30' : 'border-brand-border'}`}>
      <div className="space-y-3.5">
        <Field label="">
          <PhotoUpload value={photo} onChange={setPhoto} onOpenCamera={onOpenCamera} />
        </Field>
        <Field label="Pet's Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Fluffy" />
        </Field>
        <Field label="Owner's Full Name">
          <Input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="e.g. Maria Santos" />
        </Field>
        <Field label="Email">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. owner@example.com" />
        </Field>
        <Field label="Services">
          <ServiceCheckboxes value={dept} onChange={setDept} />
        </Field>
        <Field label="Status">
          <Select value={status} onValueChange={(v) => setStatus(v as 'active' | 'inactive')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="flex gap-2 mt-5">
        <Button className="flex-1" onClick={handleSave}>
          {isEditing ? 'Update Record' : 'Save Record'}
        </Button>
        {isEditing && (
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        )}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      {label && <label className="block font-mono text-[10px] uppercase tracking-widest text-brand-ink2 mb-1.5">{label}</label>}
      {children}
    </div>
  )
}
