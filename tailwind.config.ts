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
        // Light theme colors — calm, trustworthy developer-utility look
        background: '#f8f8fb',
        foreground: '#1e1b2e',
        primary: {
          DEFAULT: '#6366f1', // Indigo
          hover: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#ffffff',
          hover: '#f3f2f8',
        },
        accent: {
          DEFAULT: '#16a34a', // Green for success
          warning: '#b45309',
          danger: '#dc2626',
        },
        muted: {
          DEFAULT: '#6b7280',
          foreground: '#525268',
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
