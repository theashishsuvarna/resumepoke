/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fefdf9',
          100: '#fdf9ee',
          200: '#faf2dc',
          300: '#f5e8c3',
          400: '#efd9a8',
          500: '#e6c98a',
        },
        poke: {
          red: '#ee1515',
          redDark: '#c41010',
          redLight: '#ff5a3c',
          yellow: '#ffcb05',
          yellowDark: '#e6a800',
          blue: '#3b82f6',
          green: '#5fba7d',
        },
        ink: {
          900: '#0a0a0a',
          800: '#161616',
          700: '#222222',
          600: '#333333',
          500: '#555555',
          400: '#777777',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-med': 'float 4s ease-in-out infinite',
        'blink': 'blink 4s infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'sway': 'sway 5s ease-in-out infinite',
        'drift': 'drift 30s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blink: {
          '0%, 90%, 100%': { transform: 'scaleY(1)' },
          '93%': { transform: 'scaleY(0.1)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        drift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        },
      },
    },
  },
  plugins: [],
};
