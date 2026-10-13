import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed in standalone mode, hide
  if (isInstalled) {
    return null;
  }

  // Desktop / Android flow
  if (isInstallable) {
    return (
      <button
        id="btn-pwa-install"
        onClick={install}
        className={`inline-flex items-center gap-2 rounded-full border border-[#1A1918]/20 bg-transparent text-[#1A1918] hover:bg-[#1A1918] hover:text-[#FAF8F5] transition-all font-sans text-xs tracking-wider uppercase ${
          compact ? 'px-3 py-1.5' : 'px-4 py-2'
        }`}
        title="Install Aesthetic Alley on your device"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="btn-pwa-ios-guide"
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-2 rounded-full border border-[#1A1918]/20 bg-transparent text-[#1A1918] hover:bg-[#1A1918] hover:text-[#FAF8F5] transition-all font-sans text-xs tracking-wider uppercase ${
            compact ? 'px-3 py-1.5' : 'px-4 py-2'
          }`}
          title="Install on iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Add to Home</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-[#FAF8F5] p-6 shadow-2xl border border-[#E8E2D9] text-[#1A1918]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                <h3 className="font-serif text-xl tracking-tight text-[#1A1918]">Install on iPhone / iPad</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-stone-500 hover:text-stone-900 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm text-stone-600 font-sans">
                <p>Enjoy our bespoke shopping experience as an installable app:</p>
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1A1918] text-white text-xs flex items-center justify-center font-medium">
                    1
                  </span>
                  <span>Tap the <strong>Share</strong> icon in the Safari navigation bar at the bottom.</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1A1918] text-white text-xs flex items-center justify-center font-medium">
                    2
                  </span>
                  <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-full bg-[#1A1918] py-2.5 text-xs font-medium uppercase tracking-widest text-[#FAF8F5] hover:bg-[#B85D38] transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
