import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  User,
  Package,
  Heart,
  CreditCard,
  Award,
  Lock,
  LogOut,
  MapPin,
  Check,
  Sparkles,
  ShoppingBag,
  Trash2,
  Printer
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    customer,
    isLoggedIn,
    loginCustomer,
    logoutCustomer,
    orders,
    wishlist,
    products,
    addToCart,
    removeFromWishlist,
    formatPrice,
    navigateTo,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'loyalty' | 'addresses' | 'security'>('orders');

  // Auth form states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('tinashe@mariga.co.zw');
  const [authPass, setAuthPass] = useState('••••••••');
  const [authName, setAuthName] = useState('Tinashe Mariga');

  // Loyalty voucher state
  const [redeemedVoucher, setRedeemedVoucher] = useState<string | null>(null);

  if (!isLoggedIn) {
    return (
      <div className="bg-[#FAF8F5] min-h-[75vh] py-16 px-4 sm:px-6 font-sans text-[#1A1918]">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block">
              Private Patron Salon
            </span>
            <h2 className="font-serif text-2xl font-light text-[#1A1918]">
              {authMode === 'login' ? 'Sign In to Aesthetic Alley' : 'Inaugurate Patron Account'}
            </h2>
            <p className="text-xs text-stone-500">
              Access your bespoke acquisitions, white-glove delivery tracking, and Alley Privileges.
            </p>
          </div>

          <div className="flex border-b border-stone-200 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 pb-3 text-center transition-colors cursor-pointer ${
                authMode === 'login' ? 'border-b-2 border-[#B85D38] text-[#B85D38]' : 'text-stone-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 pb-3 text-center transition-colors cursor-pointer ${
                authMode === 'register' ? 'border-b-2 border-[#B85D38] text-[#B85D38]' : 'text-stone-400'
              }`}
            >
              Create Account
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginCustomer(authEmail, authPass);
            }}
            className="space-y-4 text-xs"
          >
            {authMode === 'register' && (
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200"
                />
              </div>
            )}
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Email or Phone</label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Password</label>
              <input
                type="password"
                required
                value={authPass}
                onChange={(e) => setAuthPass(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#1A1918] hover:bg-[#B85D38] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              {authMode === 'login' ? 'Enter Patron Sanctuary' : 'Register Account'}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => loginCustomer('tinashe@mariga.co.zw', 'demo')}
              className="text-xs text-[#B85D38] hover:underline"
            >
              (Quick Demo Sign In as Tinashe Mariga)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Wishlist products
  const wishlistProducts = (products || []).filter((p) => (wishlist || []).includes(p.id));

  const handleRedeemPoints = (points: number, amountOff: number) => {
    const code = `PRIVILEGE-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setRedeemedVoucher(code);
    showToast(
      'Loyalty Privilege Generated',
      `Voucher code ${code} for $${amountOff} off created and ready to apply at checkout.`,
      'luxury'
    );
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1918]">
      <div className="max-w-7xl mx-auto">
        {/* Header Profile Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1A1918] text-[#C49B45] font-serif text-2xl flex items-center justify-center border border-stone-800">
              {customer?.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1918] font-medium">
                  {customer?.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#C49B45]/20 text-[#9B772A]">
                  Alley Inner Circle
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                {customer?.email} • {customer?.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-stone-200 pt-4 sm:pt-0 sm:pl-8 text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">
                Privilege Points
              </span>
              <span className="font-serif text-2xl font-semibold text-[#1A1918]">
                {customer?.loyaltyPoints}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">
                Acquisitions
              </span>
              <span className="font-serif text-2xl font-semibold text-[#1A1918]">
                {(orders || []).length}
              </span>
            </div>
            <button
              onClick={logoutCustomer}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-900"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Account Nav Tabs */}
        <div className="flex border-b border-[#E8E2D9] gap-4 overflow-x-auto text-xs uppercase tracking-wider font-semibold mb-8">
          {[
            { id: 'orders', label: 'Order Acquisitions', icon: Package },
            { id: 'wishlist', label: `Curated Wishlist (${(wishlist || []).length})`, icon: Heart },
            { id: 'loyalty', label: 'Alley Privileges Tier', icon: Award },
            { id: 'addresses', label: 'Saved Harare Addresses', icon: MapPin },
            { id: 'security', label: 'Security & 2FA', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-3 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#B85D38] text-[#B85D38]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {(!orders || orders.length === 0) ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D9] p-8 space-y-3">
                <Package className="w-8 h-8 text-stone-400 mx-auto" />
                <h3 className="font-serif text-xl text-[#1A1918]">No acquisitions yet</h3>
                <p className="text-xs text-stone-500">Your orders will appear here with live courier tracking.</p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-6 py-2.5 rounded-full bg-[#1A1918] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              (orders || []).map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl p-6 border border-[#E8E2D9] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2 text-xs">
                    <div>
                      <span className="font-mono font-bold text-stone-900 text-sm">#{ord.id}</span>
                      <span className="text-stone-500 ml-2">Placed on {ord.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800">
                        Status: {ord.status.toUpperCase()}
                      </span>
                      <button
                        onClick={() => window.print()}
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-black"
                        title="Print invoice"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(ord.items || []).map((item) => (
                      <div key={item.id} className="flex items-center gap-4 text-xs">
                        <img
                          src={item.product?.heroImage || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80'}
                          alt={item.product?.name || 'Aesthetic piece'}
                          className="w-16 h-16 object-cover rounded-xl bg-stone-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-medium text-stone-900 truncate">
                            {item.product?.name || 'Curated Piece'}
                          </h4>
                          <span className="text-[11px] text-stone-500">
                            Qty: {item.quantity} • {formatPrice(item.unitPrice)}
                          </span>
                        </div>
                        <span className="font-semibold text-stone-900">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                    <div className="text-stone-500">
                      Destination: {ord.shippingAddress?.line1 || ord.delivery?.addressLine || 'Harare'}, {ord.shippingAddress?.city || ord.delivery?.city || 'Zimbabwe'}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-stone-500">Total Settled:</span>
                      <span className="font-serif text-base font-bold text-[#1A1918]">
                        {formatPrice(ord.totalAmount ?? ord.pricing?.total ?? 0)}
                      </span>
                      <button
                        onClick={() => navigateTo('tracking')}
                        className="px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-stone-300 text-[#1A1918] font-semibold text-[11px] hover:bg-[#1A1918] hover:text-white"
                      >
                        Live Tracking →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D9] p-8 space-y-3">
                <Heart className="w-8 h-8 text-stone-400 mx-auto" />
                <h3 className="font-serif text-xl text-[#1A1918]">Your wishlist is uncurated</h3>
                <p className="text-xs text-stone-500">Tap the heart icon on any piece to save it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl p-4 border border-[#E8E2D9] flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={p.heroImage}
                        alt={p.name}
                        className="w-full h-56 object-cover rounded-xl"
                      />
                      <h4 className="font-serif text-base font-medium text-stone-900 mt-3 truncate">
                        {p.name}
                      </h4>
                      <p className="text-xs font-semibold text-stone-800 mt-1">
                        {formatPrice(p.sellPrice)}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => {
                          const variant = p.variants?.[0] || {
                            id: 'default',
                            name: 'Standard',
                            sku: 'STD',
                            type: 'Material' as const,
                            stock: 5,
                            priceDifference: 0
                          };
                          addToCart(p, variant);
                        }}
                        className="flex-1 py-2 rounded-xl bg-[#1A1918] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#B85D38] flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                      <button
                        onClick={() => removeFromWishlist(p.id)}
                        className="p-2 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Loyalty Alley Privileges */}
        {activeTab === 'loyalty' && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C49B45] font-semibold block">
                The Inner Circle
              </span>
              <h3 className="font-serif text-2xl text-[#1A1918]">Alley Privileges & Rewards</h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
                Every acquisition earns 1 privilege point per $1 USD spent. Redeem points for bespoke atelier discounts, private showroom previews, and complimentary timber wax rituals.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                  Current Privilege Balance
                </span>
                <div className="font-serif text-4xl font-bold text-[#1A1918] mt-1">
                  {customer?.loyaltyPoints} Points
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Equivalent to approx. $40 in private vouchers.
                </p>
              </div>

              {redeemedVoucher ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <span className="text-xs text-emerald-800 font-semibold block">Active Voucher</span>
                  <span className="font-mono text-lg font-bold text-emerald-900 block my-1">
                    {redeemedVoucher}
                  </span>
                  <span className="text-[10px] text-emerald-700">Apply at checkout for $40 discount</span>
                </div>
              ) : (
                <button
                  onClick={() => handleRedeemPoints(500, 40)}
                  className="px-6 py-3 rounded-full bg-[#1A1918] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B85D38] transition-colors"
                >
                  Redeem 500 Points ($40 Voucher)
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Addresses */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] space-y-6">
            <h3 className="font-serif text-xl text-[#1A1918]">Saved Zimbabwean Addresses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border-2 border-[#B85D38] bg-[#F4EFEB]/50 space-y-2 text-xs">
                <div className="flex justify-between font-semibold text-stone-900">
                  <span>Primary Residence (Borrowdale)</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#B85D38]">Default</span>
                </div>
                <p className="text-stone-600">
                  14 Pendennis Road, Mount Pleasant / Borrowdale border<br />
                  Harare, Zimbabwe<br />
                  <span className="text-stone-400">Gate Code: #4821 • Near Arundel Village</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Security */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] space-y-6 text-xs max-w-xl">
            <h3 className="font-serif text-xl text-[#1A1918]">Account Security</h3>
            <div className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200">
              <div>
                <span className="font-semibold text-stone-900 block">Two-Factor Authentication (2FA)</span>
                <span className="text-stone-500">Require an SMS code to +263 77 240 9100 on login</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-[#B85D38]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
