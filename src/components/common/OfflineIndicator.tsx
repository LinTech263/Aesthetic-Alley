import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-full bg-[#1A1918] px-4 py-2 text-xs font-sans tracking-wide text-[#FAF8F5] shadow-xl border border-stone-700">
      <WifiOff className="w-3.5 h-3.5 text-[#B85D38] animate-pulse" />
      <span>Offline Mode — Cached boutique catalog active.</span>
    </div>
  );
};
