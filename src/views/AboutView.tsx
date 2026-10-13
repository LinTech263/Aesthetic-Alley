import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, ShieldCheck, MapPin, Compass } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-[#1A1918]">
      {/* Editorial Hero */}
      <section className="relative h-[65vh] flex items-center justify-center bg-stone-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
          alt="Harare interior architecture"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-black/40" />

        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C49B45] font-semibold">
            Provenance & Atelier Creed
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight">
            Slow Craft Between the Zambezi and Harare
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl mx-auto font-light leading-relaxed">
            Quiet luxury for discerning sanctuaries. Honoring Zimbabwe's geological antiquity, indigenous hardwood stewardship, and generationally handed sculptural mastery.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Section 1: The Material Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold">
              01 / The Hardwood Legacy
            </span>
            <h2 className="font-serif text-3xl font-light tracking-tight text-[#1A1918]">
              36 Months in Shade: Zambezi Teak Seasoning
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              Indigenous Zambezi Teak (Baikiaea plurijuga) is one of the densest, most dimensionally stable timbers on the African continent. We strictly reject fast kiln-drying. Every beam used in our consoles, credenzas, and plinths is air-seasoned under protective shade for three full years in the Zambezi basin.
            </p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              Our forestry policy is simple and unyielding: 100% deadfall and certified salvaged timber. Not a single living tree is felled for Aesthetic Alley.
            </p>
          </div>
          <div className="lg:col-span-6">
            <img
              src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
              alt="Timber craftsman in Harare workshop"
              className="rounded-3xl shadow-xl w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Section 2: Shona Stonework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-last lg:order-first">
            <img
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
              alt="Chitungwiza black serpentine stone carving"
              className="rounded-3xl shadow-xl w-full h-96 object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold">
              02 / The Geological Soul
            </span>
            <h2 className="font-serif text-3xl font-light tracking-tight text-[#1A1918]">
              Black Springstone & The Shona Sculptural Lineage
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              Zimbabwe takes its very name from 'Dzimba-dza-mabwe' — Houses of Stone. Our sculptural vessels and plinths are carved from mineral-dense black serpentine quarried near Guruve and Chitungwiza.
            </p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              Each vessel requires between forty and sixty hours of manual rasping, water-sanding with progressively finer grits, and firing over open coals before hot beeswax is rubbed into the stone to reveal its deep obsidian finish.
            </p>
          </div>
        </div>

        {/* Harare Atelier & Showroom Visits */}
        <div className="p-10 bg-white rounded-3xl border border-[#E8E2D9] shadow-xs text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#1A1918] text-[#C49B45] flex items-center justify-center mx-auto">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold">
            Private Salon Appointments
          </span>
          <h3 className="font-serif text-3xl font-light text-[#1A1918]">
            Experience The Collection in Borrowdale
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Our Harare gallery is situated at 12 Kingsmead Road, Borrowdale. Private visits allow patrons and interior architects to inspect timber grain, custom stone commissions, and tactile handloomed textiles in person.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 rounded-full bg-[#1A1918] hover:bg-[#B85D38] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Explore Current Available Works
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
