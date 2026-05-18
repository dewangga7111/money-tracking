import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px',
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--heroui-primary) / <alpha-value>)',
          50:  'rgb(var(--heroui-primary-50) / <alpha-value>)',
          100: 'rgb(var(--heroui-primary-100) / <alpha-value>)',
          200: 'rgb(var(--heroui-primary-200) / <alpha-value>)',
          300: 'rgb(var(--heroui-primary-300) / <alpha-value>)',
          400: 'rgb(var(--heroui-primary-400) / <alpha-value>)',
          500: 'rgb(var(--heroui-primary-500) / <alpha-value>)',
          600: 'rgb(var(--heroui-primary-600) / <alpha-value>)',
          700: 'rgb(var(--heroui-primary-700) / <alpha-value>)',
          800: 'rgb(var(--heroui-primary-800) / <alpha-value>)',
          900: 'rgb(var(--heroui-primary-900) / <alpha-value>)',
        },
      },
    },
  },
  darkMode: "class",
};

export default config;
