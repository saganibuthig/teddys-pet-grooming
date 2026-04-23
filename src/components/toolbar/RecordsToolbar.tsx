import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import type { DateFilter } from '@/types'

interface Props {
  search: string
  onSearchChange: (v: string) => void
  dateFilter: DateFilter
  onDateFilterChange: (v: DateFilter) => void
}

export function RecordsToolbar({ search, onSearchChange, dateFilter, onDateFilterChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink3" />
        <Input
          className="pl-9"
          placeholder="Search by name, owner, email…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={dateFilter} onValueChange={(v) => onDateFilterChange(v as DateFilter)}>
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue placeholder="All time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All time</SelectItem>
          <SelectItem value="1">Present day</SelectItem>
          <SelectItem value="2">Last 2 days</SelectItem>
          <SelectItem value="3">Last 3 days</SelectItem>
          <SelectItem value="4">Last 4 days</SelectItem>
          <SelectItem value="5">Last 5 days</SelectItem>
          <SelectItem value="6">Last 6 days</SelectItem>
          <SelectItem value="7">Last 7 days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
