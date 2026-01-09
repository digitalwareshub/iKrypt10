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
        // Dark theme colors
        background: '#0a0a0a',
        foreground: '#fafafa',
        primary: {
          DEFAULT: '#6366f1', // Indigo
          hover: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#1f1f1f',
          hover: '#2a2a2a',
        },
        accent: {
          DEFAULT: '#22c55e', // Green for success
          warning: '#f59e0b',
          danger: '#ef4444',
        },
        muted: {
          DEFAULT: '#71717a',
          foreground: '#a1a1aa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
