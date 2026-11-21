/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"SF Pro"', '"Inter"', 'system-ui', 'sans-serif'],
      mono: ['"SF Mono"', 'Monaco', 'Menlo', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    extend: {
      colors: {
        slate: {
          850: '#111c38',
          900: '#0f172a',
          950: '#080d1a',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          electric: '#06b6d4',
          glow: 'rgba(6, 182, 212, 0.4)'
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          glow: 'rgba(16, 185, 129, 0.4)'
        },
        nothing: {
          black: '#0b1120',
          dark: '#0f172a',
          panel: '#1e293b',
          card: 'rgba(30, 41, 59, 0.5)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(6, 182, 212, 0.35)',
          red: '#D71920',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"SF Pro"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', 'Menlo', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        sf: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"SF Pro"', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(6, 182, 212, 0.25)',
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.25)',
        'card-subtle': '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
