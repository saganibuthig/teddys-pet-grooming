import type { ServiceKey } from '@/types'

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  bathing: 'Bathing',
  styling: 'Styling',
  nail:    'Nail Trimming',
  ear:     'Ear Cleaning',
  teeth:   'Teeth Brushing',
}

export const SERVICE_BADGE_CLASSES: Record<ServiceKey, string> = {
  bathing: 'bg-blue-100   text-blue-700',
  styling: 'bg-orange-100 text-orange-700',
  nail:    'bg-green-100  text-green-700',
  ear:     'bg-purple-100 text-purple-700',
  teeth:   'bg-yellow-100 text-yellow-700',
}

export const AVATAR_COLORS = [
  '#C8451A', '#1A5FA0', '#2A7A4A', '#806010', '#6020A0',
]

export const SERVICE_KEYS: ServiceKey[] = [
  'bathing', 'styling', 'nail', 'ear', 'teeth',
]

export const SERVICE_PRICE = 100
