import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors from Figma
        primary: {
          DEFAULT: '#8B1D1D',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        // Secondary/Accent colors
        accent: {
          DEFAULT: '#EAB308',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Neutral colors
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['72px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'heading-1': ['36px', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'heading-2': ['30px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-3': ['24px', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        'heading-4': ['18px', { lineHeight: '1.55', letterSpacing: '0' }],
        'body-lg': ['18px', { lineHeight: '1.62', letterSpacing: '0' }],
        'body': ['16px', { lineHeight: '1.5', letterSpacing: '0' }],
        'body-sm': ['14px', { lineHeight: '1.43', letterSpacing: '0' }],
        'caption': ['12px', { lineHeight: '1.33', letterSpacing: '0.01em' }],
        'overline': ['10px', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },
      boxShadow: {
        'card': '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        'card-hover': '0px 4px 12px 0px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};

export default config;