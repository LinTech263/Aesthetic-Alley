import React, { useState, useEffect } from 'react';
import { X, Sparkles, Copy, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ExitIntentModal: React.FC = () => {
  const { showToast } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem('aa_exit_dismissed');
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('aa_exit_dismissed', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SAVANNAH10');
    setCopied(true);
    showToast('Privilege Code Copied', 'Use SAVANNAH10 at checkout for 10% off.', 'luxury');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E2D9] overflow-hidden text-[#1A1918]">
        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image header */}
        <div className="relative h-44 w-full overflow-hidden bg-stone-900">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
            alt="Aesthetic Alley interior"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-black/30" />
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1918]/80 text-[#FAF8F5] text-[10px] uppercase tracking-widest font-semibold backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-[#C49B45]" />
            <span>Private Invitation</span>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 pt-2 text-center space-y-4 font-sans">
          <h3 className="font-serif text-2xl tracking-tight text-[#1A1918] font-medium">
            Before You Depart
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
            Take 10% off your initial bespoke acquisition. Valid across our hand-carved Zambezi teak, sculptural lighting, and Shona stone collections.
          </p>

          {/* Code box */}
          <div className="flex items-center justify-between p-3.5 bg-[#F4EFEB] rounded-xl border border-[#E8E2D9] max-w-xs mx-auto">
            <span className="font-mono text-sm font-bold tracking-widest text-[#1A1918]">
              SAVANNAH10
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-xs font-semibold text-[#B85D38] hover:underline"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full rounded-full bg-[#1A1918] py-3 text-xs font-semibold uppercase tracking-widest text-[#FAF8F5] hover:bg-[#B85D38] transition-colors"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
