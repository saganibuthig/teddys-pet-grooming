import { useRef } from 'react'
import { Upload, Camera, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  value: string | null
  onChange: (v: string | null) => void
  onOpenCamera: () => void
}

export function PhotoUpload({ value, onChange, onOpenCamera }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <div className="mb-2 flex justify-center">
        {value ? (
          <img src={value} alt="pet" className="w-1/2 h-32 object-contain rounded-xl border-2 border-brand-border block" />
        ) : (
          <div className="w-full rounded-xl border-2 border-dashed border-brand-border h-32 flex flex-col items-center justify-center gap-2 text-brand-ink3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
            <span className="font-serif text-base font-semibold text-brand-ink">Add Pet Photo</span>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" className="flex-1" onClick={() => fileRef.current?.click()}>
          <Upload className="w-3.5 h-3.5" /> Upload
        </Button>
        <Button type="button" variant="outline" size="sm" className="flex-1" onClick={onOpenCamera}>
          <Camera className="w-3.5 h-3.5" /> Camera
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => { onChange(null); if (fileRef.current) fileRef.current.value = '' }}>
            <X className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  )
}
