import { Dialog, DialogContent } from '@/components/ui/dialog'

interface Props {
  open: boolean
  photo: string | null
  petName: string
  onClose: () => void
}

export function PhotoPreviewModal({ open, photo, petName, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-xs text-center">
        {photo && (
          <img
            src={photo}
            alt={petName}
            className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-brand-border"
          />
        )}
        <p className="font-serif text-xl mt-4 text-brand-ink">{petName}</p>
      </DialogContent>
    </Dialog>
  )
}
