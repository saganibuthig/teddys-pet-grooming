import { Checkbox } from '@/components/ui/checkbox'
import { SERVICE_KEYS, SERVICE_LABELS, SERVICE_PRICE } from '@/lib/constants'
import type { ServiceKey } from '@/types'

interface Props {
  value: ServiceKey[]
  onChange: (v: ServiceKey[]) => void
}

export function ServiceCheckboxes({ value, onChange }: Props) {
  const toggle = (key: ServiceKey) => {
    onChange(value.includes(key) ? value.filter((k) => k !== key) : [...value, key])
  }

  return (
    <div className="flex flex-col gap-2.5">
      {SERVICE_KEYS.map((key) => (
        <label key={key} className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            id={key}
            checked={value.includes(key)}
            onCheckedChange={() => toggle(key)}
          />
          <span className="text-sm text-brand-ink flex-1">{SERVICE_LABELS[key]}</span>
          <span className="font-mono text-xs text-brand-ink3">₱{SERVICE_PRICE}</span>
        </label>
      ))}
    </div>
  )
}
