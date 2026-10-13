import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/layout/SearchModal';
import { LiveChatDrawer } from './components/layout/LiveChatDrawer';
import { ExitIntentModal } from './components/layout/ExitIntentModal';
import { ToastContainer } from './components/common/ToastContainer';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { SEOHead } from './components/common/SEOHead';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { AccountView } from './views/AccountView';
import { AdminView } from './views/AdminView';
import { AboutView } from './views/AboutView';
import { JournalView } from './views/JournalView';
import { JournalPostView } from './views/JournalPostView';
import { TrackingView } from './views/TrackingView';
import { CustomerCareView } from './views/CustomerCareView';
import { GiftCardsView } from './views/GiftCardsView';

const MainContent: React.FC = () => {
  const { currentView } = useStore();

  // Scroll to top upon view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1A1918]">
      <SEOHead />
      <OfflineIndicator />
      <ToastContainer />
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'product' && <ProductDetailView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'admin' && <AdminView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'journal' && <JournalView />}
        {currentView === 'journal-post' && <JournalPostView />}
        {currentView === 'tracking' && <TrackingView />}
        {currentView === 'faq' && <CustomerCareView initialSection="faq" />}
        {currentView === 'shipping' && <CustomerCareView initialSection="shipping" />}
        {currentView === 'returns' && <CustomerCareView initialSection="returns" />}
        {currentView === 'gift-cards' && <GiftCardsView />}
      </main>

      <Footer />

      {/* Global Slide-overs and Interactive Modals */}
      <CartDrawer />
      <SearchModal />
      <LiveChatDrawer />
      <ExitIntentModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
