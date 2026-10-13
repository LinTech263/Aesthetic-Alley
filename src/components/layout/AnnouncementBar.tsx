import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Globe, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { siteContent, currency, toggleCurrency } = useStore();

  return (
    <div className="bg-[#1A1918] text-[#FAF8F5] text-[11px] uppercase tracking-widest py-2 px-4 border-b border-stone-800 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-stone-300">
          <Sparkles className="w-3 h-3 text-[#C49B45] flex-shrink-0" />
          <span className="truncate">{siteContent.announcementText}</span>
        </div>

        <div className="flex items-center gap-4 text-stone-400">
          <div className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#B85D38]" />
            <span className="normal-case text-stone-300">Zimbabwean Escrow Protected</span>
          </div>

          <button
            onClick={toggleCurrency}
            className="flex items-center gap-1 text-[#FAF8F5] hover:text-[#C49B45] transition-colors cursor-pointer"
            title="Toggle between USD and Zimbabwean Gold (ZiG)"
          >
            <Globe className="w-3 h-3" />
            <span>Currency: <strong>{currency}</strong></span>
          </button>
        </div>
      </div>
    </div>
  );
};
