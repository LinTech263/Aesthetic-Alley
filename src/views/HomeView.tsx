import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
  Compass,
  Layers,
  ChevronRight
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    siteContent,
    products,
    categories,
    navigateTo,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'living' | 'dining' | 'lighting' | 'art'>('all');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Filtered products for curated tab
  const tabProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'living') return p.room === 'Living Room';
    if (activeTab === 'dining') return p.room === 'Dining Room';
    if (activeTab === 'lighting') return p.categoryId === 'cat-lighting';
    if (activeTab === 'art') return p.categoryId === 'cat-sculpture' || p.categoryId === 'cat-textiles';
    return true;
  });

  // Shop the room interactive hotspots data
  const roomHotspots = [
    {
      id: 'hotspot-console',
      top: '64%',
      left: '42%',
      productId: 'prod-teak-console',
      productName: 'Zambezi Fluted Teak Console',
      price: 690,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'hotspot-lamp',
      top: '46%',
      left: '32%',
      productId: 'prod-mopane-terracotta-lamp',
      productName: 'Mopane Terracotta Table Lamp',
      price: 220,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'hotspot-stone',
      top: '55%',
      left: '52%',
      productId: 'prod-serpentine-vessel',
      productName: 'Chitungwiza Serpentine Vessel',
      price: 340,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="font-sans text-[#1A1918]">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <img
          src={siteContent.heroImage}
          alt="Aesthetic Alley luxury interior sanctuary"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918] via-[#1A1918]/40 to-black/40" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-[#FAF8F5] space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/10 backdrop-blur-md border border-[#FAF8F5]/20 text-xs font-medium uppercase tracking-[0.2em] text-[#FAF8F5]">
            <Sparkles className="w-3.5 h-3.5 text-[#C49B45]" />
            <span>Autumn 2026 Atelier Collection</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-[#FAF8F5] max-w-4xl mx-auto">
            {siteContent.heroHeadline}
          </h1>

          <p className="font-sans text-sm sm:text-base text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            {siteContent.heroSubheadline}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="btn-hero-primary"
              onClick={() => navigateTo('shop', { categorySlug: 'zambezi-teak-furniture' })}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF8F5] text-[#1A1918] text-xs uppercase tracking-widest font-semibold hover:bg-[#B85D38] hover:text-white transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{siteContent.heroCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('about')}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-transparent text-[#FAF8F5] border border-[#FAF8F5]/40 text-xs uppercase tracking-widest font-semibold hover:bg-[#FAF8F5]/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Our Provenance</span>
            </button>
          </div>

          {/* Social proof trust bar */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-[11px] uppercase tracking-wider text-stone-400 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B85D38]" />
              <span>Harare White-Glove Unpacking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49B45]" />
              <span>Certified Sustainable Teak</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Worldwide Diaspora Dispatch</span>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Categories Bar */}
      <section className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block mb-1">
                Curated Architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-light tracking-tight">
                Shop by Spatial Atmosphere
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A1918] hover:text-[#B85D38] transition-colors"
            >
              <span>Explore All Categories</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => navigateTo('shop', { categorySlug: category.slug })}
                className="group relative h-80 rounded-2xl overflow-hidden bg-stone-900 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={category.heroImage}
                  alt={category.name}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-5 text-[#FAF8F5] space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-[#C49B45] font-semibold">
                    {category.roomType}
                  </span>
                  <h3 className="font-serif text-lg font-medium tracking-tight text-[#FAF8F5] leading-snug group-hover:text-[#FAF8F5] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Shop The Room" Interactive Hotspot Experience */}
      <section className="py-24 bg-[#F4EFEB] border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold">
              Interactive Living Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-light tracking-tight">
              The Borrowdale Residence Edit
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Touch the illuminated markers to explore individual artisanal pieces styled within a contemporary Harare private salon.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8E2D9] max-w-5xl mx-auto bg-stone-900">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="Borrowdale luxury living room styled with Aesthetic Alley furniture"
              className="w-full h-[540px] sm:h-[620px] object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Clickable Hotspots */}
            {roomHotspots.map((spot) => (
              <div
                key={spot.id}
                className="absolute z-20"
                style={{ top: spot.top, left: spot.left }}
              >
                <button
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                  className="relative group p-2 rounded-full focus:outline-none cursor-pointer"
                  aria-label={`Inspect ${spot.productName}`}
                >
                  <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping" />
                  <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#FAF8F5] text-[#1A1918] shadow-xl border border-stone-800 text-xs font-bold hover:bg-[#B85D38] hover:text-white transition-colors">
                    +
                  </span>
                </button>

                {/* Hotspot Card Overlay */}
                {activeHotspot === spot.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#E8E2D9] text-[#1A1918] z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex gap-3 items-center">
                      <img
                        src={spot.image}
                        alt={spot.productName}
                        className="w-14 h-14 object-cover rounded-lg bg-stone-200 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-medium text-[#1A1918] line-clamp-1">
                          {spot.productName}
                        </h4>
                        <p className="text-xs font-semibold text-stone-900 mt-0.5">
                          {formatPrice(spot.price)}
                        </p>
                        <button
                          onClick={() => navigateTo('product', { productId: spot.productId })}
                          className="mt-1 text-[10px] uppercase tracking-wider font-semibold text-[#B85D38] hover:underline block"
                        >
                          View Piece →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-[#1A1918]/90 backdrop-blur-md p-4 rounded-2xl border border-stone-700 text-[#FAF8F5]">
              <span className="text-[10px] uppercase tracking-widest text-[#C49B45] font-semibold block">
                Spatial Concept
              </span>
              <p className="font-serif text-sm mt-0.5 leading-snug">
                "Grounding high-ceilinged modern plasterwork with deep Zambezi teak and Zimbabwean black springstone."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pieces & Best Sellers Tabs */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block mb-1">
                The Curated Edit
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-light tracking-tight">
                Artisanal Signatures
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All Signatures' },
                { id: 'living', label: 'Living Salon' },
                { id: 'dining', label: 'Dining & Feast' },
                { id: 'lighting', label: 'Ambient Lighting' },
                { id: 'art', label: 'Sculpture & Textiles' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-full uppercase tracking-wider text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#1A1918] text-[#FAF8F5]'
                      : 'bg-[#F4EFEB] text-stone-600 hover:bg-[#E8E2D9]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tabProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#1A1918] text-[#1A1918] hover:bg-[#1A1918] hover:text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold transition-all"
            >
              <span>Explore Complete Atelier Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Brand Heritage Teaser */}
      <section className="py-24 bg-[#1A1918] text-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C49B45] font-semibold">
                Provenance & Materiality
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-[1.15]">
                Rooted in 150-Year Salvaged Timber and Ancient Granite Masonry.
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                {siteContent.brandStoryTeaser}
              </p>
              <div className="pt-2 grid grid-cols-2 gap-6 border-t border-stone-800 text-xs">
                <div>
                  <h4 className="font-serif text-2xl text-[#FAF8F5] font-normal">36 Months</h4>
                  <p className="text-stone-400 mt-1">Natural shade timber seasoning for maximum stability.</p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-[#FAF8F5] font-normal">Zero Clear-Cut</h4>
                  <p className="text-stone-400 mt-1">100% deadfall and certified salvage forestry.</p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#C49B45] hover:text-white transition-colors"
              >
                <span>Read The Full Heritage Chronicle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80"
                alt="Woodworking joinery in Harare atelier"
                className="rounded-2xl w-full h-80 object-cover shadow-2xl"
              />
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80"
                alt="Chitungwiza stone sculpture carving"
                className="rounded-2xl w-full h-80 object-cover mt-8 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-24 bg-[#FAF8F5] border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold">
              Patron Chronicles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-light tracking-tight">
              Words From Our Discerning Homes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'The fluted Zambezi console transformed our Borrowdale entrance into something serene and museum-grade. The white-glove team delivered it with white cotton gloves and took away every scrap of wrapping.',
                name: 'Chipo & Farai R.',
                location: 'Borrowdale Brooke, Harare',
                piece: 'The Zambezi Fluted Teak Console'
              },
              {
                quote:
                  'Ordering from London, I was nervous about DHL freight for such dense Shona springstone. It arrived in bespoke wooden crating, flawless. It brings the deep warmth and soul of Zimbabwe right into our Kensington flat.',
                name: 'Dr. Tatenda G.',
                location: 'Kensington, London (Diaspora)',
                piece: 'Chitungwiza Black Serpentine Vessel'
              },
              {
                quote:
                  'We furnished our entire Highlands dining room with the Kariba Sand stoneware and beaten brass feast servers. Every family dinner feels like an elevated slow ceremony.',
                name: 'Marcus V.',
                location: 'Highlands, Harare',
                piece: 'Kariba Sand Stoneware Dinner Set'
              }
            ].map((test, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-2xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#C49B45]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-base text-stone-800 leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-col text-xs">
                  <span className="font-semibold text-[#1A1918]">{test.name}</span>
                  <span className="text-stone-500">{test.location}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#B85D38] font-medium mt-1">
                    Acquired: {test.piece}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shoppable Instagram / UGC Gallery */}
      <section className="py-20 bg-[#F4EFEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block mb-1">
                #AestheticAlleyLiving
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1918] font-light">
                Styled in Your Sanctuaries
              </h2>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold uppercase tracking-wider text-[#1A1918] hover:text-[#B85D38]"
            >
              Follow @aestheticalley.zw →
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',
                label: 'Serpentine Vessel in Highlands Salon',
                productId: 'prod-serpentine-vessel'
              },
              {
                img: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80',
                label: 'Pierced Brass Pendant over Dining Table',
                productId: 'prod-pierced-brass-pendant'
              },
              {
                img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
                label: 'Binga Woven Cushion on Boucle Armchair',
                productId: 'prod-binga-palm-cushion'
              },
              {
                img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80',
                label: 'Matobo Teak Low Plinth Table',
                productId: 'prod-teak-low-plinth'
              }
            ].map((ugc, i) => (
              <div
                key={i}
                onClick={() => navigateTo('product', { productId: ugc.productId })}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-stone-900"
              >
                <img
                  src={ugc.img}
                  alt={ugc.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                  <span className="text-xs font-serif text-white">{ugc.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
