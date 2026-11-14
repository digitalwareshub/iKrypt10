/**
 * Static, decorative network mesh. Faint, confined to the upper edges, no
 * animation. Rendered below the header so lines never cross navigation.
 */
export default function Mesh({ variant = 'full' }: { variant?: 'full' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMin slice"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] w-full opacity-90"
    >
      <g stroke="#818CF8" strokeOpacity="0.14" strokeWidth="1" fill="none">
        {variant === 'full' && (
          <>
            <path d="M40 120 L180 60 L300 170 L190 260 L40 120 Z" />
            <path d="M180 60 L360 40 L300 170" />
            <path d="M190 260 L120 400 L260 470 L300 170" />
            <path d="M120 400 L30 520" />
          </>
        )}
        <path d="M1100 50 L1240 130 L1380 70 L1420 210 L1280 280 L1240 130" />
        <path d="M1280 280 L1160 360 L1100 50" />
        <path d="M1160 360 L1330 430 L1420 210" />
        <path d="M1330 430 L1400 580 L1220 560 L1160 360" />
        <path d="M980 20 L1100 50" />
      </g>
      <g fill="#A5B4FC">
        {variant === 'full' && (
          <>
            <circle cx="40" cy="120" r="2.5" fillOpacity="0.45" />
            <circle cx="180" cy="60" r="3" fillOpacity="0.6" />
            <circle cx="300" cy="170" r="2.5" fillOpacity="0.45" />
            <circle cx="190" cy="260" r="2" fillOpacity="0.35" />
            <circle cx="360" cy="40" r="2" fillOpacity="0.35" />
            <circle cx="120" cy="400" r="2.5" fillOpacity="0.4" />
            <circle cx="260" cy="470" r="2" fillOpacity="0.3" />
          </>
        )}
        <circle cx="1100" cy="50" r="2.5" fillOpacity="0.45" />
        <circle cx="1240" cy="130" r="3.5" fillOpacity="0.7" />
        <circle cx="1380" cy="70" r="2" fillOpacity="0.35" />
        <circle cx="1420" cy="210" r="2.5" fillOpacity="0.4" />
        <circle cx="1280" cy="280" r="2.5" fillOpacity="0.5" />
        <circle cx="1160" cy="360" r="2" fillOpacity="0.35" />
        <circle cx="1330" cy="430" r="3" fillOpacity="0.55" />
        <circle cx="1220" cy="560" r="2" fillOpacity="0.3" />
        <circle cx="1400" cy="580" r="2" fillOpacity="0.3" />
      </g>
    </svg>
  );
}
