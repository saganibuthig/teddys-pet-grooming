import { useRef, useState, useEffect } from 'react'
import { Camera, RotateCcw } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Props {
  open: boolean
  onClose: () => void
  onCapture: (base64: string) => void
}

export function CameraModal({ open, onClose, onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [phase, setPhase] = useState<'live' | 'preview'>('live')
  const [captured, setCaptured] = useState<string | null>(null)
  const [error, setError] = useState('')

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }

  useEffect(() => {
    if (!open) { stopCamera(); setPhase('live'); setCaptured(null); setError(''); return }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then((stream) => { streamRef.current = stream; if (videoRef.current) videoRef.current.srcObject = stream })
      .catch(() => setError('Camera access denied or unavailable.'))
    return stopCamera
  }, [open])

  const snap = () => {
    const v = videoRef.current; const c = canvasRef.current
    if (!v || !c) return
    c.width = v.videoWidth || v.clientWidth
    c.height = v.videoHeight || v.clientHeight
    c.getContext('2d')?.drawImage(v, 0, 0, c.width, c.height)
    const frame = c.toDataURL('image/jpeg', 0.88)
    setCaptured(frame); setPhase('preview')
  }

  const retake = () => { setCaptured(null); setPhase('live') }

  const usePhoto = () => {
    if (captured) { onCapture(captured); onClose() }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Take Photo</DialogTitle>
        </DialogHeader>
        <div className="relative bg-black rounded-xl overflow-hidden aspect-[4/3] mb-4">
          <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${phase === 'preview' ? 'hidden' : ''}`} />
          <canvas ref={canvasRef} className={`w-full h-full object-cover ${phase === 'live' ? 'hidden' : ''}`} />
        </div>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <div className="flex gap-2">
          {phase === 'live' ? (
            <Button className="flex-1" onClick={snap} disabled={!!error}>
              <Camera className="w-4 h-4" /> Capture
            </Button>
          ) : (
            <>
              <Button variant="outline" className="flex-1" onClick={retake}>
                <RotateCcw className="w-4 h-4" /> Retake
              </Button>
              <Button className="flex-1" onClick={usePhoto}>Use Photo</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
