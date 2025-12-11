// src/components/MicrosoftClarity.tsx
// Purpose: Microsoft Clarity analytics integration for user behavior tracking

import { useEffect } from 'react';

interface WindowWithClarity extends Window {
  clarity?: (...args: unknown[]) => void;
}

interface MicrosoftClarityProps {
  projectId?: string;
}

const MicrosoftClarity: React.FC<MicrosoftClarityProps> = ({
  projectId = 'ugt3vmzw48'
}) => {
  useEffect(() => {
    // Only load in production or if explicitly enabled
    if (typeof window === 'undefined') return;

    const win = window as WindowWithClarity;

    // Check if Clarity is already loaded
    if (win.clarity) return;

    // Initialize Clarity
    (function(c: WindowWithClarity, l: Document, a: 'clarity', r: 'script', i: string) {
      type ClarityFunction = {
        (...args: unknown[]): void;
        q?: unknown[];
      };

      (c[a] as ClarityFunction) = (c[a] as ClarityFunction) || function(...args: unknown[]) {
        ((c[a] as ClarityFunction).q = (c[a] as ClarityFunction).q || []).push(args);
      };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode?.insertBefore(t, y);
    })(window as WindowWithClarity, document, "clarity", "script", projectId);

  }, [projectId]);

  return null;
};

export default MicrosoftClarity;
