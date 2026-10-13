import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Search,
  Package
} from 'lucide-react';

export const TrackingView: React.FC = () => {
  const { orders, formatPrice } = useStore();
  const [orderQuery, setOrderQuery] = useState(orders[0]?.id || 'AA-84920');
  const [searchedOrder, setSearchedOrder] = useState(orders[0] || null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) => o.id.toLowerCase() === orderQuery.trim().toLowerCase()
    );
    if (found) {
      setSearchedOrder(found);
    } else {
      // Create mockup view for queried ID
      setSearchedOrder({
        id: orderQuery.toUpperCase(),
        customerName: 'Patron',
        customerEmail: 'patron@example.co.zw',
        customerPhone: '+263 77 240 9100',
        items: orders[0]?.items || [],
        shippingAddress: {
          line1: '12 Kingsmead Road, Borrowdale',
          city: 'Harare',
          country: 'Zimbabwe'
        },
        deliveryZone: {
          id: 'z1',
          name: 'Harare Metro White-Glove',
          feeUsd: 0,
          estimatedDays: '1-2 Days'
        },
        paymentMethod: 'ecocash',
        subtotal: 690,
        discount: 0,
        deliveryFee: 0,
        totalAmount: 690,
        status: 'out_for_delivery',
        createdAt: 'Today'
      });
    }
  };

  const steps = [
    { label: 'Acquisition Placed', desc: 'Logged & authenticated', done: true },
    { label: 'Atelier Preparation', desc: 'Beeswax hand-buffing & shock-packing', done: true },
    { label: 'Quality Certification', desc: 'Harare master craftsman sign-off', done: true },
    { label: 'Out for Delivery', desc: 'White-glove room transit underway', done: true, current: true },
    { label: 'Delivered & Placed', desc: 'Unpacked & packaging removed', done: false }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1918]">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block">
            Aesthetic Alley Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1918]">
            White-Glove Delivery Radar
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Track your bespoke furniture and curated accents in real time across Harare, Bulawayo, or international air freight.
          </p>

          {/* Search box */}
          <form onSubmit={handleSearch} className="flex max-w-md mx-auto pt-4">
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. AA-84920)..."
              className="flex-1 bg-white border border-[#E8E2D9] rounded-l-full px-5 py-3 text-xs text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#1A1918] hover:bg-[#B85D38] text-white text-xs uppercase tracking-wider font-semibold rounded-r-full transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>
        </div>

        {searchedOrder && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xl space-y-8 animate-in fade-in duration-300">
            {/* Order status card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B85D38] font-semibold">
                  Live Dispatch Status
                </span>
                <h3 className="font-serif text-2xl text-[#1A1918] mt-0.5">
                  Order #{searchedOrder.id}
                </h3>
                <p className="text-xs text-stone-500">
                  Destination: {searchedOrder.shippingAddress.line1}, {searchedOrder.shippingAddress.city}
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-semibold">
                <Truck className="w-4 h-4 animate-bounce" />
                <span>Out for White-Glove Placement Today</span>
              </div>
            </div>

            {/* Visual Tracking Pipeline */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
                Handling Pipeline
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
                {steps.map((st, i) => (
                  <div key={i} className="relative flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                        st.current
                          ? 'bg-[#B85D38] text-white ring-4 ring-[#B85D38]/20'
                          : st.done
                          ? 'bg-[#1A1918] text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {st.done ? '✓' : i + 1}
                    </div>
                    <span className="font-serif text-sm text-stone-900 font-medium">
                      {st.label}
                    </span>
                    <span className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                      {st.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Courier Driver Details */}
            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1918] text-white font-serif text-lg flex items-center justify-center">
                  FC
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                    Assigned Atelier Courier Driver
                  </span>
                  <div className="font-semibold text-sm text-stone-900">
                    Farai Chigumba • White-Glove Team Lead
                  </div>
                  <div className="text-xs text-stone-500">
                    Vehicle: Mercedes Sprinter Van (AA-04-ZW)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="tel:+263772409100"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-100"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Courier Driver</span>
                </a>
              </div>
            </div>

            {/* Item manifest */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
                Enclosed Pieces
              </h4>
              <div className="space-y-2">
                {searchedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.heroImage}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <span className="font-serif font-medium text-stone-900 block">
                          {item.product.name}
                        </span>
                        <span className="text-stone-500 text-[11px]">
                          Qty: {item.quantity} {item.variant ? `(${item.variant.name})` : ''}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold text-stone-900">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
