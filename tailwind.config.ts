import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-dark': '#050023',
      },
    },
  },
  plugins: [],
} satisfies Config;
