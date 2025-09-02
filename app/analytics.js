// analytics.js
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-33P087QFW1', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
