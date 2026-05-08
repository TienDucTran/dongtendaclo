import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '40rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem',
        '2xl': '96rem',
      },
    },
    extend: {
      colors: {
        // Primary colors from Figma - Maroon/Burgundy
        primary: {
          DEFAULT: '#8B1D1D',
          foreground: '#FFFFFF',
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
        // Accent/Secondary - Orange from Figma
        accent: {
          DEFAULT: '#FB923C',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Gold color - Used for highlights and accents
        gold: {
          DEFAULT: '#D9A520',
          50: '#FFFDF0',
          100: '#FEF7D0',
          200: '#FDEDA1',
          300: '#FBDE71',
          400: '#F9CC42',
          500: '#D9A520',
          600: '#B8891A',
          700: '#966814',
          800: '#754F10',
          900: '#53380B',
        },
        // Slate colors from Figma
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        // Custom colors from Figma
        'card-bg': '#FBF8FC',
        'card-border': '#F1F5F9',
      },
      fontFamily: {
        // Be Vietnam Pro is the primary font (sans-serif)
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
        // Lora is the serif font
        serif: ['Lora', 'Georgia', 'serif'],
      },
      fontSize: {
        // Figma font sizes
        'display': ['72px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'heading-1': ['48px', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'heading-2': ['36px', { lineHeight: '1.11', letterSpacing: '0' }],
        'heading-3': ['24px', { lineHeight: '1.33', letterSpacing: '0' }],
        'heading-4': ['18px', { lineHeight: '1.55', letterSpacing: '0' }],
        'body-lg': ['20px', { lineHeight: '1.4', letterSpacing: '0' }],
        'body': ['16px', { lineHeight: '1.5', letterSpacing: '0' }],
        'body-sm': ['14px', { lineHeight: '1.62', letterSpacing: '0' }],
        'caption': ['12px', { lineHeight: '1.33', letterSpacing: '0.05em' }],
        'overline': ['10px', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },
      boxShadow: {
        'card': '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        'card-hover': '0px 4px 12px 0px rgba(0, 0, 0, 0.1)',
        'button': '0px 4px 6px -4px rgba(127, 29, 29, 0.2), 0px 10px 15px -3px rgba(127, 29, 29, 0.2)',
        'header': '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8B1D1D 0%, #7F1D1D 100%)',
        'gradient-card': 'linear-gradient(180deg, #FEF2F2 0%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
};

export default config;