import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(var(--primary) / <alpha-value>)',
        'primary-dark': 'rgb(var(--primary-dark) / <alpha-value>)',
        'secondary': 'rgb(var(--secondary) / <alpha-value>)',
        'accent': 'rgb(var(--accent) / <alpha-value>)',
        'light': 'rgb(var(--light) / <alpha-value>)',
        'dark': 'rgb(var(--dark) / <alpha-value>)',
        'success': 'rgb(var(--success) / <alpha-value>)',
        'warning': 'rgb(var(--warning) / <alpha-value>)',
        'danger': 'rgb(var(--danger) / <alpha-value>)',
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config