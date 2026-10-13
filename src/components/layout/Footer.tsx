import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Check
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast(
      'Welcome to the Inner Circle',
      'Use code SAVANNAH10 for 10% off your initial acquisition.',
      'luxury'
    );
  };

  return (
    <footer className="bg-[#1A1918] text-[#FAF8F5] pt-16 pb-12 border-t border-stone-800 font-sans">
      {/* Brand Trust Signals Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-full bg-stone-900 text-[#C49B45] border border-stone-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base tracking-tight text-[#FAF8F5]">
                White-Glove Delivery
              </h4>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                Harare & Bulawayo complimentary room placement over $150. Tracked worldwide air freight for diaspora patrons.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-full bg-stone-900 text-[#B85D38] border border-stone-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base tracking-tight text-[#FAF8F5]">
                Archival Provenance
              </h4>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                Salvaged Zambezi teak, indigenous Binga palm, and signed Shona springstone sculptures with authenticity credentials.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-full bg-stone-900 text-[#C49B45] border border-stone-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base tracking-tight text-[#FAF8F5]">
                Protected Zimbabwean Escrow
              </h4>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                Encrypted mobile money checkout via EcoCash, OneMoney, Paynow, and 3D-Secure International cards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-full bg-stone-900 text-[#B85D38] border border-stone-800">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base tracking-tight text-[#FAF8F5]">
                30-Day Bespoke Guarantee
              </h4>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                Effortless returns or artisan exchange if a piece does not harmonize perfectly within your sanctuary.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-serif text-2xl tracking-tight font-medium text-[#FAF8F5]">
                AESTHETIC ALLEY
              </span>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#C49B45] mt-1 font-sans">
                Quiet Luxury for Discerning Sanctuaries
              </p>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed font-sans max-w-md">
              A curated boutique connecting Zimbabwean craftsmanship with contemporary interior architecture. Serving private estates in Borrowdale, highlands villas, and collectors in London, Johannesburg, and New York.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-widest font-semibold text-stone-200 mb-2">
                Join the Private Salon
              </h5>
              <p className="text-xs text-stone-400 mb-3">
                Receive private invitations to limited kiln releases, artisan studio tours, and 10% welcome privilege.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-stone-900 rounded-xl border border-stone-700 text-xs text-[#C49B45]">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the salon. Use code <strong>SAVANNAH10</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 bg-stone-900 border border-stone-700 rounded-l-full px-4 py-2.5 text-xs text-[#FAF8F5] placeholder-stone-500 focus:outline-none focus:border-[#B85D38]"
                  />
                  <button
                    type="submit"
                    className="bg-[#B85D38] hover:bg-[#A6522E] text-white px-5 rounded-r-full text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links Column 1: Collections */}
          <div className="lg:col-span-2 space-y-4 text-xs">
            <h5 className="uppercase tracking-widest font-semibold text-stone-200">
              Collections
            </h5>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('shop', { categorySlug: 'zambezi-teak-furniture' })}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Zambezi Teak Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { categorySlug: 'artisanal-lighting' })}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Artisanal Lighting
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { categorySlug: 'handloomed-textiles' })}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Handloomed Textiles
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { categorySlug: 'sculptural-accents' })}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Shona Stone Sculpture
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { categorySlug: 'tableware-entertaining' })}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Entertaining & Tableware
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('giftcards')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Digital Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Client Care */}
          <div className="lg:col-span-2 space-y-4 text-xs">
            <h5 className="uppercase tracking-widest font-semibold text-stone-200">
              Concierge Care
            </h5>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('tracking')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Track Order / Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shipping')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Shipping & Delivery Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('returns')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Returns & Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Alley Privileges Loyalty
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-[#C49B45] transition-colors"
                >
                  Staff / Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Contact */}
          <div className="lg:col-span-3 space-y-4 text-xs">
            <h5 className="uppercase tracking-widest font-semibold text-stone-200">
              Harare Atelier & Gallery
            </h5>
            <div className="space-y-3 text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B85D38] flex-shrink-0 mt-0.5" />
                <span>
                  12 Kingsmead Road, Borrowdale, Harare, Zimbabwe<br />
                  <span className="text-stone-300">Showroom visits by private appointment</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B85D38] flex-shrink-0" />
                <span>+263 77 240 9100 / +263 (0) 242 884019</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B85D38] flex-shrink-0" />
                <span>concierge@aestheticalley.co.zw</span>
              </div>
            </div>

            {/* Zimbabwean Payment Badges */}
            <div className="pt-4 border-t border-stone-800">
              <span className="text-[10px] uppercase tracking-wider text-stone-300 block mb-2 font-medium">
                Accepted Payment Channels
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-stone-900 border border-stone-700 rounded text-[10px] font-semibold text-sky-400">
                  EcoCash
                </span>
                <span className="px-2.5 py-1 bg-stone-900 border border-stone-700 rounded text-[10px] font-semibold text-orange-400">
                  OneMoney
                </span>
                <span className="px-2.5 py-1 bg-stone-900 border border-stone-700 rounded text-[10px] font-semibold text-emerald-400">
                  Paynow
                </span>
                <span className="px-2.5 py-1 bg-stone-900 border border-stone-700 rounded text-[10px] font-semibold text-white">
                  Visa
                </span>
                <span className="px-2.5 py-1 bg-stone-900 border border-stone-700 rounded text-[10px] font-semibold text-amber-300">
                  Mastercard
                </span>
                <span className="px-2.5 py-1 bg-stone-900 border border-stone-700 rounded text-[10px] font-semibold text-stone-300">
                  Bank EFT (USD / ZiG)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-300 gap-4">
        <div>
          © {new Date().getFullYear()} Aesthetic Alley Private Limited. Registered in Zimbabwe. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => navigateTo('terms')} className="hover:text-stone-300">
            Terms of Service
          </button>
          <button onClick={() => navigateTo('terms')} className="hover:text-stone-300">
            Privacy Policy
          </button>
          <button onClick={() => navigateTo('shipping')} className="hover:text-stone-300">
            Phytosanitary & Export Customs
          </button>
        </div>
      </div>
    </footer>
  );
};
