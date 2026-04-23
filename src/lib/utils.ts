import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AVATAR_COLORS } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

export function getAvatarColor(id: number): string {
  return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length]
}

export function formatSignIn(value: string | null): string {
  if (!value) return '—'
  return new Date(value).toLocaleString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
