import type { Config } from 'tailwindcss';

/**
 * "Concept A Minimal Security" design tokens.
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
        background: '#09090B', // page ground
        deep: '#07070A', // footer
        band: '#0E0E12', // alternate section band
        surface: '#15151B', // cards, inputs container
        raised: '#1C1C25', // hovered / highlighted surfaces
        foreground: '#F5F5F7', // primary text
        heading: '#FAFAFC', // display headings
        line: 'rgba(185, 190, 215, 0.13)', // hairline borders
        'line-strong': 'rgba(185, 190, 215, 0.23)',
        primary: {
          DEFAULT: '#A9B5FF', // accent: buttons, links, highlights (indigo-300)
          hover: '#CBD3FF',
          strong: '#8B9CF8', // logo indigo, decorative only
          foreground: '#09090B', // text on primary buttons
        },
        // Legacy token name kept so existing pages map onto the dark theme.
        secondary: {
          DEFAULT: '#15151B',
          hover: '#1C1C25',
        },
        accent: {
          DEFAULT: '#4ADE80', // success
          warning: '#FBBF24',
          danger: '#F87171',
        },
        muted: {
          DEFAULT: '#9393A6', // tertiary text (5.9:1)
          foreground: '#ABABBA', // secondary text (8.4:1)
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
