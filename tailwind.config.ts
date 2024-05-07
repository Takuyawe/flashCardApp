import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      height: {
        body: 'calc(100dvh - 6rem)',
      },
      colors: {
        'bright-purple': '#F14DFF',
        'bright-green': '#4F8A10',
        'bright-red': '#cc0000',
        'base-dark': '#050023',
        'light-dark': '#35343D',
        'smoke-light': 'rgba(0, 0, 0, 0.5)',
        'bright-blue': '#78C6FF',
        'light-blue': '#90EBFF',
        facebook: '#2c64f6',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
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
        'slide-in-top': {
          '0%': {
            transform: 'translateY(-1000px)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-in':
          'fade-in 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both',
        'fade-out': 'fade-out 0.5s linear   both',
        'slide-in-top':
          'slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
