import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Lock,
  ChevronDown
} from 'lucide-react';
import { PWAInstallButton } from '../common/PWAInstallButton';

export const Header: React.FC<{ onOpenSearch?: () => void }> = ({ onOpenSearch = () => {} }) => {
  const {
    currentView,
    navigateTo,
    cart,
    wishlist,
    setIsCartOpen,
    categories,
    isLoggedIn,
    customer,
    currency,
    toggleCurrency,
    isAdminAuthenticated
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 font-sans ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#E8E2D9]'
          : 'bg-[#FAF8F5] border-b border-[#E8E2D9]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="btn-mobile-menu"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-[#1A1918] hover:text-[#B85D38] transition-colors"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 ml-1 text-[#1A1918] hover:text-[#B85D38] transition-colors"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Left Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest text-[#1A1918] font-medium">
            <button
              onClick={() => navigateTo('shop')}
              className={`hover:text-[#B85D38] transition-colors ${
                currentView === 'shop' ? 'text-[#B85D38] font-semibold' : ''
              }`}
            >
              Catalog
            </button>

            {/* Categories dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
              onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('shop')}
                className="flex items-center gap-1 hover:text-[#B85D38] transition-colors"
              >
                <span>Collections</span>
                <ChevronDown className="w-3 h-3 text-stone-500" />
              </button>

              {isCategoriesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#FAF8F5] rounded-xl shadow-xl border border-[#E8E2D9] py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="px-4 py-1 text-[10px] uppercase tracking-wider text-stone-600 font-semibold">
                    Curated Categories
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setIsCategoriesDropdownOpen(false);
                        navigateTo('shop', { categorySlug: cat.slug });
                      }}
                      className="w-full text-left px-4 py-2 text-xs normal-case text-stone-800 hover:bg-[#F4EFEB] hover:text-[#B85D38] transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-[10px] text-stone-600 uppercase tracking-widest">{cat.roomType}</span>
                    </button>
                  ))}
                  <div className="border-t border-[#E8E2D9] my-2 pt-1">
                    <button
                      onClick={() => {
                        setIsCategoriesDropdownOpen(false);
                        navigateTo('journal');
                      }}
                      className="w-full text-left px-4 py-2 text-xs normal-case text-stone-600 hover:text-[#B85D38]"
                    >
                      Read The Atelier Journal →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-[#B85D38] transition-colors ${
                currentView === 'about' ? 'text-[#B85D38] font-semibold' : ''
              }`}
            >
              Provenance
            </button>

            <button
              onClick={() => navigateTo('journal')}
              className={`hover:text-[#B85D38] transition-colors ${
                currentView === 'journal' ? 'text-[#B85D38] font-semibold' : ''
              }`}
            >
              Journal
            </button>
          </nav>

          {/* Center Brand Logo */}
          <div className="flex flex-col items-center cursor-pointer text-center" onClick={() => navigateTo('home')}>
            <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#1A1918] font-medium leading-none">
              AESTHETIC ALLEY
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-stone-500 mt-1">
              Harare • Zimbabwe
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 text-xs text-stone-500 hover:text-[#1A1918] px-3 py-1.5 rounded-full border border-stone-200 hover:border-stone-400 transition-all cursor-pointer"
              title="Search furniture, lighting, and decor"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-stone-400">Search pieces...</span>
            </button>

            {/* Currency toggle button */}
            <button
              onClick={toggleCurrency}
              className="hidden sm:inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F4EFEB] text-stone-700 hover:bg-[#E8E2D9] transition-colors border border-[#E8E2D9]"
              title="Toggle currency display"
            >
              {currency}
            </button>

            {/* PWA install prompt in header */}
            <div className="hidden md:block">
              <PWAInstallButton compact />
            </div>

            {/* Wishlist */}
            <button
              id="btn-nav-wishlist"
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 text-[#1A1918] hover:text-[#B85D38] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {(wishlist?.length || 0) > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B85D38] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              id="btn-nav-account"
              onClick={() => navigateTo('account')}
              className="p-2 text-[#1A1918] hover:text-[#B85D38] transition-colors flex items-center gap-1.5"
              aria-label="Account"
              title={isLoggedIn ? `Account (${customer?.name})` : 'Sign in to your account'}
            >
              <User className="w-5 h-5" />
              {isLoggedIn && (
                <span className="hidden xl:inline-block text-xs font-medium max-w-[80px] truncate">
                  {customer?.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              id="btn-nav-cart"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#1A1918] hover:text-[#B85D38] transition-colors"
              aria-label="Shopping Cart Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1A1918] text-[#FAF8F5] text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Discreet Admin Portal Link */}
            <button
              onClick={() => navigateTo('admin')}
              className={`p-2 rounded-full transition-colors ${
                isAdminAuthenticated
                  ? 'text-[#B85D38] bg-[#B85D38]/10'
                  : 'text-stone-400 hover:text-stone-800'
              }`}
              title="Aesthetic Alley Admin Console"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between p-6 border-r border-[#E8E2D9]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D9]">
                <div>
                  <div className="font-serif text-xl font-medium tracking-tight text-[#1A1918]">
                    Aesthetic Alley
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-stone-500">
                    Quiet Luxury for the Home
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-[#1A1918]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between py-2 border-b border-stone-200 text-xs">
                  <span className="text-stone-500">Current Currency:</span>
                  <button
                    onClick={toggleCurrency}
                    className="font-semibold text-[#1A1918] underline"
                  >
                    {currency} (Tap to Switch)
                  </button>
                </div>
              </div>

              <nav className="mt-6 space-y-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('home');
                  }}
                  className="block w-full text-left font-serif text-lg text-[#1A1918] hover:text-[#B85D38]"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('shop');
                  }}
                  className="block w-full text-left font-serif text-lg text-[#1A1918] hover:text-[#B85D38]"
                >
                  Shop Full Catalog
                </button>

                <div className="pl-3 border-l-2 border-[#B85D38]/30 space-y-2.5 py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigateTo('shop', { categorySlug: cat.slug });
                      }}
                      className="block w-full text-left text-xs font-sans uppercase tracking-wider text-stone-600 hover:text-[#B85D38]"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('tracking');
                  }}
                  className="block w-full text-left font-serif text-lg text-[#1A1918] hover:text-[#B85D38]"
                >
                  Track Order / Delivery
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('about');
                  }}
                  className="block w-full text-left font-serif text-lg text-[#1A1918] hover:text-[#B85D38]"
                >
                  Our Provenance & Story
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('journal');
                  }}
                  className="block w-full text-left font-serif text-lg text-[#1A1918] hover:text-[#B85D38]"
                >
                  Atelier Journal
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('giftcards');
                  }}
                  className="block w-full text-left font-serif text-lg text-[#1A1918] hover:text-[#B85D38]"
                >
                  Digital Gift Cards
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('admin');
                  }}
                  className="block w-full text-left text-xs font-sans uppercase tracking-wider text-stone-500 hover:text-[#B85D38] pt-2"
                >
                  Admin Management Portal
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8E2D9] space-y-3">
              <PWAInstallButton />
              <p className="text-[11px] text-stone-500 text-center">
                Borrowdale • Highlands • Bulawayo • Diaspora
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
