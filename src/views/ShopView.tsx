import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  ChevronDown,
  RotateCcw
} from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategorySlug,
    navigateTo,
    formatPrice
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    selectedCategorySlug || 'all'
  );
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [priceBracket, setPriceBracket] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Sync if selectedCategorySlug prop changes
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setSelectedCategory(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  // Distinct rooms and materials from product dataset
  const rooms = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.room));
    return Array.from(set);
  }, [products]);

  const materialsList = [
    'Zambezi Teak',
    'Black Serpentine Stone',
    'Terracotta',
    'Pierced Brass',
    'Binga Wild Palm',
    'Stoneware',
    'Wild Olive Wood'
  ];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat) {
        list = list.filter((p) => p.categoryId === cat.id);
      }
    }

    // Room filter
    if (selectedRoom !== 'all') {
      list = list.filter((p) => p.room === selectedRoom);
    }

    // Material filter
    if (selectedMaterial !== 'all') {
      list = list.filter((p) => {
        const mats = Array.isArray(p.materials) ? p.materials.join(' ') : (p.materials || '');
        return mats.toLowerCase().includes(selectedMaterial.toLowerCase());
      });
    }

    // Price bracket
    if (priceBracket === 'under100') {
      list = list.filter((p) => p.sellPrice < 100);
    } else if (priceBracket === '100to300') {
      list = list.filter((p) => p.sellPrice >= 100 && p.sellPrice <= 300);
    } else if (priceBracket === '300to600') {
      list = list.filter((p) => p.sellPrice > 300 && p.sellPrice <= 600);
    } else if (priceBracket === 'over600') {
      list = list.filter((p) => p.sellPrice > 600);
    }

    // In-stock toggle
    if (inStockOnly) {
      list = list.filter((p) => p.inStock && ((p.stockCount ?? (p as any).stockQuantity ?? 1) > 0));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.sellPrice - b.sellPrice);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.sellPrice - a.sellPrice);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }, [
    products,
    categories,
    selectedCategory,
    selectedRoom,
    selectedMaterial,
    priceBracket,
    inStockOnly,
    sortBy
  ]);

  const activeCategoryObject = categories.find((c) => c.slug === selectedCategory);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedRoom('all');
    setSelectedMaterial('all');
    setPriceBracket('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedRoom !== 'all' ||
    selectedMaterial !== 'all' ||
    priceBracket !== 'all' ||
    inStockOnly;

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-[#1A1918]">
      {/* Editorial Header */}
      <div className="bg-[#F4EFEB] border-b border-[#E8E2D9] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block">
            {activeCategoryObject ? activeCategoryObject.roomType : 'The Complete Curation'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#1A1918]">
            {activeCategoryObject ? activeCategoryObject.name : 'Bespoke Zimbabwean Home Decor'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
            {activeCategoryObject
              ? activeCategoryObject.description
              : 'Every piece is crafted in limited numbers between Harare and the Zambezi basin. Seasoned indigenous hardwoods, tactile stoneware, and stone sculptures with verified provenance.'}
          </p>
        </div>
      </div>

      {/* Main Catalog View with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Control Bar: Total count, Mobile filter button, Sorting dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E8E2D9] gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8E2D9] text-xs font-semibold text-[#1A1918]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B85D38]" />
              <span>Filter Catalog</span>
            </button>
            <span className="text-xs text-stone-500 font-medium">
              Showing <strong>{filteredProducts.length}</strong> bespoke pieces
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-stone-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1A1918] focus:outline-none focus:border-[#B85D38] font-medium"
            >
              <option value="featured">Atelier Curation</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Patron Rating</option>
              <option value="newest">Newest Additions</option>
            </select>
          </div>
        </div>

        {/* Active Filters Pill Bar */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap py-4 border-b border-[#E8E2D9] text-xs">
            <span className="text-stone-400 font-medium">Active Filters:</span>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800">
                Category: {activeCategoryObject?.name}
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedRoom !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800">
                Room: {selectedRoom}
                <button onClick={() => setSelectedRoom('all')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedMaterial !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800">
                Material: {selectedMaterial}
                <button onClick={() => setSelectedMaterial('all')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {priceBracket !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800">
                Price: {priceBracket}
                <button onClick={() => setPriceBracket('all')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800">
                Ready to Dispatch Only
                <button onClick={() => setInStockOnly(false)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1 text-xs text-[#B85D38] hover:underline ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-8 pr-6 border-r border-[#E8E2D9]">
            {/* Categories */}
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold mb-3">
                Collections
              </h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#1A1918] text-[#FAF8F5] font-semibold'
                      : 'text-stone-700 hover:bg-[#F4EFEB]'
                  }`}
                >
                  All Collections
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      selectedCategory === c.slug
                        ? 'bg-[#1A1918] text-[#FAF8F5] font-semibold'
                        : 'text-stone-700 hover:bg-[#F4EFEB]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Filters */}
            <div className="pt-6 border-t border-[#E8E2D9]">
              <h4 className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold mb-3">
                Atmosphere & Room
              </h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedRoom('all')}
                  className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                    selectedRoom === 'all'
                      ? 'bg-[#1A1918] text-[#FAF8F5] font-semibold'
                      : 'text-stone-700 hover:bg-[#F4EFEB]'
                  }`}
                >
                  All Rooms
                </button>
                {rooms.map((room) => (
                  <button
                    key={room}
                    onClick={() => setSelectedRoom(room)}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      selectedRoom === room
                        ? 'bg-[#1A1918] text-[#FAF8F5] font-semibold'
                        : 'text-stone-700 hover:bg-[#F4EFEB]'
                    }`}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>

            {/* Indigenous Materials */}
            <div className="pt-6 border-t border-[#E8E2D9]">
              <h4 className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold mb-3">
                Materiality & Craft
              </h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedMaterial('all')}
                  className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                    selectedMaterial === 'all'
                      ? 'bg-[#1A1918] text-[#FAF8F5] font-semibold'
                      : 'text-stone-700 hover:bg-[#F4EFEB]'
                  }`}
                >
                  All Natural Materials
                </button>
                {materialsList.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMaterial(m)}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      selectedMaterial === m
                        ? 'bg-[#1A1918] text-[#FAF8F5] font-semibold'
                        : 'text-stone-700 hover:bg-[#F4EFEB]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Brackets */}
            <div className="pt-6 border-t border-[#E8E2D9]">
              <h4 className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold mb-3">
                Acquisition Value
              </h4>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Values' },
                  { id: 'under100', label: 'Under $100' },
                  { id: '100to300', label: '$100 to $300' },
                  { id: '300to600', label: '$300 to $600' },
                  { id: 'over600', label: 'Over $600' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriceBracket(p.id)}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
                      priceBracket === p.id
                        ? 'bg-[#1A1918] text-[#FAF8F5] font-semibold'
                        : 'text-stone-700 hover:bg-[#F4EFEB]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock toggle */}
            <div className="pt-6 border-t border-[#E8E2D9]">
              <label className="flex items-center gap-3 cursor-pointer text-xs text-stone-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#B85D38] focus:ring-[#B85D38] w-4 h-4 border-stone-300"
                />
                <span className="font-medium">Ready to Dispatch Only</span>
              </label>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {(!filteredProducts || filteredProducts.length === 0) ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E8E2D9] p-8 space-y-4">
                <Sparkles className="w-8 h-8 text-stone-400 mx-auto" />
                <h3 className="font-serif text-xl text-[#1A1918]">
                  No pieces match your selected filters
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try clearing some filter criteria to discover other items in our Harare salon catalog.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 rounded-full bg-[#1A1918] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#B85D38]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
                <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                  Filter Pieces
                </h3>
                <button onClick={() => setIsMobileFiltersOpen(false)}>
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <div className="py-4 space-y-6 text-xs">
                {/* Collection */}
                <div>
                  <span className="font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Collection
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 bg-white border border-[#E8E2D9] rounded-lg"
                  >
                    <option value="all">All Collections</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Room */}
                <div>
                  <span className="font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Room
                  </span>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full p-2 bg-white border border-[#E8E2D9] rounded-lg"
                  >
                    <option value="all">All Rooms</option>
                    {rooms.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Material */}
                <div>
                  <span className="font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Material
                  </span>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full p-2 bg-white border border-[#E8E2D9] rounded-lg"
                  >
                    <option value="all">All Materials</option>
                    {materialsList.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* In stock */}
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded text-[#B85D38]"
                    />
                    <span>Ready to Dispatch Only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D9] flex gap-2">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2.5 rounded-lg border border-stone-300 text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 py-2.5 rounded-lg bg-[#1A1918] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
