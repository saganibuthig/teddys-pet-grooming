export function AppHeader() {
  return (
    <header className="sticky lg:relative top-0 z-50 bg-brand-ink h-14 flex items-center justify-between px-4 sm:px-8">
      <div className="font-serif text-lg sm:text-xl text-white">
        Teddy's <span className="italic text-brand-gold">Pet Grooming</span>
      </div>
      <div className="font-mono text-xs text-brand-ink3 border border-brand-ink3/40 rounded-full px-3 py-1 hidden sm:block">
        Daily Log v2.0
      </div>
    </header>
  )
}
