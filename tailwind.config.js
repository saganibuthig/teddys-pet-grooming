/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans:  ['var(--font-sans)'],
        mono:  ['var(--font-mono)'],
      },
      colors: {
        brand: {
          bg:     'var(--background)',
          card:   'var(--card)',
          ink:    'var(--foreground)',
          ink2:   'var(--muted-foreground)',
          ink3:   'var(--secondary-foreground)',
          accent: 'var(--primary)',
          gold:   'var(--ring)',
          border: 'var(--border)',
          green:  '#2A7A4A',
          hover:  'var(--accent)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
