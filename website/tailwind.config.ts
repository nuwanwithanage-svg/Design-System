import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2dd4bf',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        zinc: {
          925: '#111113',
          950: '#09090b',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      typography: (theme: (arg: string) => string) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.zinc.300'),
            '--tw-prose-headings': theme('colors.zinc.50'),
            '--tw-prose-links': '#2dd4bf',
            '--tw-prose-code': theme('colors.zinc.200'),
            '--tw-prose-pre-bg': theme('colors.zinc.900'),
            '--tw-prose-pre-code': theme('colors.zinc.200'),
            '--tw-prose-borders': theme('colors.zinc.700'),
            '--tw-prose-bullets': theme('colors.zinc.500'),
            '--tw-prose-quotes': theme('colors.zinc.400'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
