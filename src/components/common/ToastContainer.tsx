import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-[#1A1918] text-[#FAF8F5] rounded-xl shadow-2xl border border-stone-800 transition-all transform translate-y-0"
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === 'luxury' && (
              <Sparkles className="w-4 h-4 text-[#C49B45]" />
            )}
            {toast.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-[#B85D38]" />
            )}
            {toast.type === 'info' && (
              <Info className="w-4 h-4 text-stone-300" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              {toast.title}
            </h4>
            <p className="mt-1 text-xs text-stone-300 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-stone-400 hover:text-[#FAF8F5] p-1 -mr-1 -mt-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
