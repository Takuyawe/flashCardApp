import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // TODO: settings for breakpoints
      height: {
        body: 'calc(100dvh - 8rem)',
      },
      colors: {
        'bright-green': '#4F8A10',
        'bright-red': '#cc0000',
        'base-dark': '#050023',
        'smoke-light': 'rgba(0, 0, 0, 0.5)',
        'bright-blue': '#78C6FF',
        'light-blue': '#90EBFF',
        facebook: '#2c64f6',
      },
      animation: {
        'fade-in':
          'fade-in 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both',
        'fade-out': 'fade-out 0.5s linear   both',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
