interface Props { total: number; active: number; today: string }

export function StatsRow({ total, active, today }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
      {[
        { value: total, label: 'Total', color: 'text-brand-ink' },
        { value: active, label: 'Active', color: 'text-brand-green' },
        { value: today, label: 'Today is', color: 'text-brand-ink' },
      ].map(({ value, label, color }) => (
        <div key={label} className="bg-brand-card border border-brand-border rounded-2xl p-3 sm:p-4">
          <div className={`font-serif text-xl sm:text-3xl font-semibold ${color}`}>{value}</div>
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-ink3 mt-1">{label}</div>
        </div>
      ))}
    </div>
  )
}
