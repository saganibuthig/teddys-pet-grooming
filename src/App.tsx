import { useState } from 'react'
import { toast } from 'sonner'
import { useGroomingStore } from '@/hooks/useGroomingStore'
import { AppHeader } from '@/components/layout/AppHeader'
import { StatsRow } from '@/components/stats/StatsRow'
import { GroomingForm } from '@/components/form/GroomingForm'
import { RecordsToolbar } from '@/components/toolbar/RecordsToolbar'
import { RecordsTable } from '@/components/table/RecordsTable'
import { CameraModal } from '@/components/modals/CameraModal'
import { PhotoPreviewModal } from '@/components/modals/PhotoPreviewModal'
import type { GroomingRecord } from '@/types'

export default function App() {
  const store = useGroomingStore()
  const [editingRecord, setEditingRecord] = useState<GroomingRecord | null>(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [cameraPhoto, setCameraPhoto] = useState<string | null>(null)
  const [preview, setPreview] = useState<{ src: string; name: string } | null>(null)

  const handleSave = (fields: Omit<GroomingRecord, 'id' | 'signIn'>) => {
    if (editingRecord) {
      store.updateRecord(editingRecord.id, fields, editingRecord.signIn)
      toast.success('Record updated')
    } else {
      store.addRecord(fields)
      toast.success('Record added')
    }
    setEditingRecord(null)
  }

  const handleDelete = (id: number) => {
    store.deleteRecord(id)
    toast.error('Record deleted')
  }

  return (
    <div className="min-h-screen bg-brand-bg lg:bg-secondary lg:p-8">
      <div className="lg:max-w-[1280px] lg:mx-auto lg:rounded-2xl lg:overflow-hidden lg:shadow-2xl lg:border lg:border-black/10 bg-brand-bg">
      <AppHeader />

      <main className="px-2 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
        <div className="mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-ink">Daily Grooming Log</h1>
          <p className="text-sm text-brand-ink2 mt-1">Track every pet visit — log, update, and manage grooming records with ease.</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[320px_1fr] gap-6 items-start">
          <GroomingForm
            editingRecord={editingRecord}
            onSave={handleSave}
            onCancel={() => setEditingRecord(null)}
            onOpenCamera={() => setCameraOpen(true)}
            pendingCameraPhoto={cameraPhoto}
            onClearCameraPhoto={() => setCameraPhoto(null)}
          />

          <div className="w-full min-w-0">
            <StatsRow total={store.stats.total} active={store.stats.active} today={store.stats.today} />
            <RecordsToolbar
              search={store.search}
              onSearchChange={store.setSearch}
              dateFilter={store.dateFilter}
              onDateFilterChange={store.setDateFilter}
            />
            <RecordsTable
              records={store.filteredRecords}
              sortCol={store.sortCol}
              sortDir={store.sortDir}
              onSort={store.toggleSort}
              onEdit={setEditingRecord}
              onDelete={handleDelete}
              onPhotoClick={(src, name) => setPreview({ src, name })}
            />
          </div>
        </div>
      </main>

      <CameraModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={(base64) => { setCameraPhoto(base64); setCameraOpen(false) }}
      />
      <PhotoPreviewModal
        open={!!preview}
        photo={preview?.src ?? null}
        petName={preview?.name ?? ''}
        onClose={() => setPreview(null)}
      />
      </div>
    </div>
  )
}
