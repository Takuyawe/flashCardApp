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
        'base-dark': '#050023',
      },
    },
  },
  plugins: [],
} satisfies Config;
