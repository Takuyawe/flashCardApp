import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // TODO: settings for breakpoints
      height: {
        body: "calc(100dvh - 6rem)",
      },
      colors: {
        "bright-purple": "#F14DFF",
        "bright-green": "#4F8A10",
        "bright-red": "#cc0000",
        "base-dark": "#050023",
        "smoke-light": "rgba(0, 0, 0, 0.5)",
        "bright-blue": "#78C6FF",
        "light-blue": "#90EBFF",
        facebook: "#2c64f6",
      },
      animation: {
        "fade-in":
          "fade-in 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "fade-out": "fade-out 0.5s linear   both",
        "slide-in-top":
          "slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
        "slide-in-top": {
          "0%": {
            transform: "translateY(-1000px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
