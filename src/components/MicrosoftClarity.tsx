// src/components/MicrosoftClarity.tsx
// Purpose: Microsoft Clarity analytics integration for user behavior tracking

import { useEffect } from 'react';

interface MicrosoftClarityProps {
  projectId?: string;
}

const MicrosoftClarity: React.FC<MicrosoftClarityProps> = ({ 
  projectId = 'ugt3vmzw48' 
}) => {
  useEffect(() => {
    // Only load in production or if explicitly enabled
    if (typeof window === 'undefined') return;

    // Check if Clarity is already loaded
    if ((window as any).clarity) return;

    // Initialize Clarity
    (function(c: any, l: Document, a: string, r: string, i: string, t?: any, y?: any) {
      c[a] = c[a] || function() {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", projectId);

  }, [projectId]);

  return null;
};

export default MicrosoftClarity;
