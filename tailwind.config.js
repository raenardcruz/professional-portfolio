/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#090D16',
        'canvas-elevated': '#0F1624',
        heading: '#F8FAFC',
        body: '#94A3B8',
        subtle: '#64748B',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        bento: '1.5rem',
        'bento-lg': '2rem',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(2, 6, 23, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'glow-indigo': '0 0 40px -10px rgba(99, 102, 241, 0.45)',
        'glow-cyan': '0 0 40px -10px rgba(34, 211, 238, 0.35)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
