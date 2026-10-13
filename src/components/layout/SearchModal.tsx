import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { products, categories, navigateTo, formatPrice } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingProducts = trimmed
    ? (products || []).filter(
        (p) =>
          p.name?.toLowerCase().includes(trimmed) ||
          p.description?.toLowerCase().includes(trimmed) ||
          (Array.isArray(p.materials) ? p.materials.join(' ') : (p.materials || '')).toLowerCase().includes(trimmed) ||
          p.room?.toLowerCase().includes(trimmed) ||
          p.seo?.keywords?.some((k) => k?.toLowerCase().includes(trimmed))
      )
    : (products || []).slice(0, 4); // show trending/featured if query empty

  const matchingCategories = trimmed
    ? (categories || []).filter(
        (c) =>
          c.name?.toLowerCase().includes(trimmed) ||
          c.description?.toLowerCase().includes(trimmed)
      )
    : (categories || []);

  const popularSearches = [
    'Zambezi Teak',
    'Black Serpentine',
    'Terracotta Table Lamp',
    'Binga Palm Cushion',
    'Salad Servers Brass',
    'Dinner Set'
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full bg-[#FAF8F5] border-b border-[#E8E2D9] shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          {/* Header & input */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-stone-400 absolute left-4" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by material, room, or artisanal piece..."
                className="w-full bg-[#F4EFEB] text-[#1A1918] placeholder-stone-400 pl-12 pr-10 py-3.5 rounded-full text-base font-sans border border-[#E8E2D9] focus:outline-none focus:border-[#B85D38] transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-[#1A1918] text-sm uppercase tracking-wider font-semibold"
            >
              Cancel
            </button>
          </div>

          {/* Quick tags */}
          <div className="mt-4 flex items-center gap-2 flex-wrap text-xs text-stone-500">
            <span className="flex items-center gap-1 font-medium text-stone-700">
              <Sparkles className="w-3 h-3 text-[#C49B45]" />
              Trending:
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-full bg-[#F4EFEB] hover:bg-[#E8E2D9] text-stone-700 hover:text-[#1A1918] transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results panel */}
      <div
        className="flex-1 overflow-y-auto max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="bg-[#FAF8F5] rounded-2xl p-6 shadow-xl border border-[#E8E2D9]">
          {/* Categories matches */}
          {matchingCategories.length > 0 && (
            <div className="mb-6 pb-6 border-b border-[#E8E2D9]">
              <h4 className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-3">
                Collections & Edits
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchingCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onClose();
                      navigateTo('shop', { categorySlug: cat.slug });
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E8E2D9] bg-white hover:border-[#B85D38] hover:text-[#B85D38] transition-all text-xs"
                  >
                    <span className="font-medium text-[#1A1918]">{cat.name}</span>
                    <ArrowRight className="w-3 h-3 text-stone-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold">
                {trimmed ? `Pieces matching "${query}" (${matchingProducts.length})` : 'Curated Highlights'}
              </h4>
              {matchingProducts.length > 0 && (
                <button
                  onClick={() => {
                    onClose();
                    navigateTo('shop');
                  }}
                  className="text-xs text-[#B85D38] hover:underline"
                >
                  View all in catalog →
                </button>
              )}
            </div>

            {matchingProducts.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                <p className="font-serif text-lg text-stone-700">No bespoke pieces match your inquiry.</p>
                <p className="text-xs mt-1">Try exploring "teak", "brass", "lighting", or "cushion".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchingProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onClose();
                      navigateTo('product', { productId: product.id });
                    }}
                    className="flex items-center gap-3.5 p-3 rounded-xl border border-[#E8E2D9] hover:border-[#B85D38] bg-white hover:bg-[#F4EFEB]/50 transition-all cursor-pointer group"
                  >
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-stone-100"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block">
                        {product.room}
                      </span>
                      <h5 className="font-serif text-sm text-[#1A1918] font-medium group-hover:text-[#B85D38] transition-colors truncate">
                        {product.name}
                      </h5>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-semibold text-stone-800">
                          {formatPrice(product.sellPrice)}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          ★ {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
