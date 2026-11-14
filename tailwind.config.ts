import type { Config } from 'tailwindcss';

/**
 * "Midnight Fragment" design tokens.
 * Near-black navy ground, the logo's indigo as the single accent,
 * editorial serif display, Inter body, JetBrains Mono for technical text.
 * All text colours below pass WCAG AA (4.5:1) on `background` and `surface`.
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#070A13', // page ground
        deep: '#05070E', // footer
        band: '#0A0E1A', // alternate section band
        surface: '#0D1220', // cards, inputs container
        raised: '#121A2E', // hovered / highlighted surfaces
        foreground: '#E8EAF6', // primary text
        heading: '#F3F4FB', // display headings
        line: 'rgba(165, 180, 252, 0.14)', // hairline borders
        'line-strong': 'rgba(165, 180, 252, 0.24)',
        primary: {
          DEFAULT: '#A5B4FC', // accent: buttons, links, highlights (indigo-300)
          hover: '#C7D2FE',
          strong: '#818CF8', // logo indigo, decorative only
          foreground: '#070A13', // text on primary buttons
        },
        // Legacy token name kept so existing pages map onto the dark theme.
        secondary: {
          DEFAULT: '#0D1220',
          hover: '#121A2E',
        },
        accent: {
          DEFAULT: '#4ADE80', // success
          warning: '#FBBF24',
          danger: '#F87171',
        },
        muted: {
          DEFAULT: '#8C93B5', // tertiary text (5.9:1)
          foreground: '#A3A9C7', // secondary text (8.4:1)
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
