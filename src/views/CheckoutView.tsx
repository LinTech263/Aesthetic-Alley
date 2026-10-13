import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Check,
  Truck,
  ArrowRight,
  Lock,
  ChevronLeft,
  CreditCard,
  Smartphone,
  Building,
  Printer,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Order } from '../types';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    appliedPromo,
    activeDeliveryZone,
    setActiveDeliveryZone,
    deliveryZones,
    formatPrice,
    placeOrder,
    navigateTo,
    customer,
    clearCart
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1 & 2: Contact & Address
  const [contactEmail, setContactEmail] = useState(customer?.email || 'patron@example.co.zw');
  const [contactPhone, setContactPhone] = useState(customer?.phone || '+263 77 240 9100');
  const [fullName, setFullName] = useState(customer?.name || 'Tinashe Mariga');
  const [addressLine, setAddressLine] = useState('14 Pendennis Road, Mt Pleasant');
  const [city, setCity] = useState('Harare');
  const [landmark, setLandmark] = useState('Near Arundel Village Shopping Centre');
  const [gateCode, setGateCode] = useState('Code: #4821');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Please call 15 minutes before arrival for estate gate access.');

  // Step 4: Payment
  const [paymentMethod, setPaymentMethod] = useState<'ecocash' | 'onemoney' | 'paynow' | 'card' | 'bank_transfer'>('ecocash');
  const [ecocashNumber, setEcocashNumber] = useState('0772409100');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if ((!cart || cart.length === 0) && !completedOrder) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 font-sans">
        <h2 className="font-serif text-2xl text-[#1A1918]">Your bag is currently empty</h2>
        <p className="text-xs text-stone-500 mt-2">
          Select pieces from our catalog before proceeding to bespoke checkout.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 px-6 py-2.5 rounded-full bg-[#1A1918] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#B85D38]"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  const handleCompleteOrder = async () => {
    setIsProcessingPayment(true);

    // Simulate EcoCash push USSD or Card gateway
    setTimeout(() => {
      const newOrder = placeOrder({
        customerName: fullName,
        customerEmail: contactEmail,
        customerPhone: contactPhone,
        shippingAddress: {
          line1: addressLine,
          city: city,
          country: 'Zimbabwe',
          landmarkNotes: `${landmark}. Gate: ${gateCode}. ${deliveryInstructions}`
        },
        deliveryZone: activeDeliveryZone,
        paymentMethod: paymentMethod,
        promoCode: appliedPromo?.code
      });

      setCompletedOrder(newOrder);
      setIsProcessingPayment(false);
      setStep(5);
    }, 1800);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-[#1A1918] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb / Progress */}
        <div className="mb-10 text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block">
            Aesthetic Alley • Private Concierge Checkout
          </span>
          <h1 className="font-serif text-3xl font-light text-[#1A1918]">
            {step === 5 ? 'Order Confirmed & Placed' : 'Secure Bespoke Acquisition'}
          </h1>

          {step < 5 && (
            <div className="flex items-center justify-center gap-2 pt-4 text-xs font-medium">
              <span className={step >= 1 ? 'text-[#B85D38] font-bold' : 'text-stone-400'}>
                1. Contact
              </span>
              <span className="text-stone-300">→</span>
              <span className={step >= 2 ? 'text-[#B85D38] font-bold' : 'text-stone-400'}>
                2. Harare Address
              </span>
              <span className="text-stone-300">→</span>
              <span className={step >= 3 ? 'text-[#B85D38] font-bold' : 'text-stone-400'}>
                3. Delivery Zone
              </span>
              <span className="text-stone-300">→</span>
              <span className={step >= 4 ? 'text-[#B85D38] font-bold' : 'text-stone-400'}>
                4. Payment
              </span>
            </div>
          )}
        </div>

        {/* Step 5: Order Confirmation View */}
        {step === 5 && completedOrder ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <Check className="w-7 h-7" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#B85D38] font-semibold block">
                Acquisition Confirmed
              </span>
              <h2 className="font-serif text-3xl font-light text-[#1A1918]">
                Thank You, {completedOrder.customerName}
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
                Your order <strong>#{completedOrder.id}</strong> has been logged into our Harare atelier workshop. A formal tax receipt and driver tracking link have been dispatched to <strong>{completedOrder.customerEmail}</strong>.
              </p>
            </div>

            {/* Order snapshot */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Order Reference:</span>
                <span className="font-mono font-bold text-stone-900">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Destination:</span>
                <span className="font-medium text-stone-900">{completedOrder.shippingAddress?.line1 || completedOrder.delivery?.addressLine || 'Harare'}, {completedOrder.shippingAddress?.city || completedOrder.delivery?.city || 'Zimbabwe'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Delivery Tier:</span>
                <span className="font-medium text-stone-900">{completedOrder.deliveryZone?.name || completedOrder.delivery?.zoneName || 'Harare Metro White-Glove'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Total Settled:</span>
                <span className="font-serif text-base font-bold text-[#1A1918]">{formatPrice(completedOrder.totalAmount ?? completedOrder.pricing?.total ?? 0)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl border border-stone-300 text-stone-800 text-xs uppercase tracking-wider font-semibold hover:bg-stone-100 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Tax Invoice / Slip</span>
              </button>
              <button
                onClick={() => navigateTo('tracking')}
                className="flex-1 py-3 rounded-xl bg-[#1A1918] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#B85D38] flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Track Delivery Courier</span>
              </button>
            </div>
          </div>
        ) : (
          /* Multi-step checkout layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Steps Panel */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xs space-y-8">
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <h3 className="font-serif text-xl text-[#1A1918]">1. Contact & Patron Identification</h3>
                    <span className="text-xs text-stone-400">Step 1 of 4</span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Email Address (For Tax Receipt & Certificate)</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Mobile Phone (For Driver Call-Ahead)</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        required
                        className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
                      />
                      <span className="text-[10px] text-stone-400 mt-1 block">Zimbabwe local format (+263 7X XXX XXXX) or International number</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-full bg-[#1A1918] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B85D38] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Address</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Address Information */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <h3 className="font-serif text-xl text-[#1A1918]">2. Zimbabwean Delivery Address</h3>
                    <span className="text-xs text-stone-400">Step 2 of 4</span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Street Address / Stand / Estate Name</label>
                      <input
                        type="text"
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        placeholder="e.g. Stand 45, Borrowdale Brooke Estate"
                        className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">City / Town</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">Gate / Intercom Code</label>
                        <input
                          type="text"
                          value={gateCode}
                          onChange={(e) => setGateCode(e.target.value)}
                          placeholder="e.g. #3049"
                          className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Prominent Landmark (Crucial for Harare couriers)</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="e.g. Opposite Sam Levy's Village, past the roundabout"
                        className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Special Room Placement Notes</label>
                      <textarea
                        rows={2}
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        placeholder="e.g. Place console in first-floor gallery, take packing crating away..."
                        className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Contact</span>
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-full bg-[#1A1918] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B85D38] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Delivery Tier</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Delivery Tier */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <h3 className="font-serif text-xl text-[#1A1918]">3. Select Delivery Handling Tier</h3>
                    <span className="text-xs text-stone-400">Step 3 of 4</span>
                  </div>

                  <div className="space-y-3">
                    {deliveryZones.map((zone) => (
                      <div
                        key={zone.id}
                        onClick={() => setActiveDeliveryZone(zone)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between gap-4 ${
                          activeDeliveryZone.id === zone.id
                            ? 'border-[#B85D38] bg-[#F4EFEB]/50'
                            : 'border-stone-200 hover:border-stone-400 bg-white'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-sm font-medium text-stone-900">
                              {zone.name}
                            </span>
                            {zone.freeThreshold && cartSubtotal >= zone.freeThreshold && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                                Complimentary
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {zone.description}
                          </p>
                          <span className="text-[11px] text-stone-400 block font-medium">
                            Estimated Transit: {zone.estimatedDays}
                          </span>
                        </div>

                        <div className="font-semibold text-xs text-stone-900">
                          {zone.freeThreshold && cartSubtotal >= zone.freeThreshold
                            ? 'Free'
                            : formatPrice(zone.feeUsd)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Address</span>
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="px-6 py-3 rounded-full bg-[#1A1918] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B85D38] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <h3 className="font-serif text-xl text-[#1A1918]">4. Select Payment Channel</h3>
                    <span className="text-xs text-stone-400">Step 4 of 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* EcoCash */}
                    <div
                      onClick={() => setPaymentMethod('ecocash')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'ecocash'
                          ? 'border-[#B85D38] bg-[#F4EFEB]/50'
                          : 'border-stone-200 bg-white hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-stone-900">
                        <Smartphone className="w-4 h-4 text-sky-600" />
                        <span>EcoCash Mobile Money</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Instant USSD prompt pushed directly to your registered handset.
                      </p>
                    </div>

                    {/* Paynow */}
                    <div
                      onClick={() => setPaymentMethod('paynow')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'paynow'
                          ? 'border-[#B85D38] bg-[#F4EFEB]/50'
                          : 'border-stone-200 bg-white hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-stone-900">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Paynow Gateway</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        OneMoney, Zimswitch, and local Zimbabwean bank cards.
                      </p>
                    </div>

                    {/* International Card */}
                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#B85D38] bg-[#F4EFEB]/50'
                          : 'border-stone-200 bg-white hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-stone-900">
                        <CreditCard className="w-4 h-4 text-stone-800" />
                        <span>International Card (Visa / MC)</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Secure 3D-Authentication for diaspora and foreign cards.
                      </p>
                    </div>

                    {/* Bank EFT */}
                    <div
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'bank_transfer'
                          ? 'border-[#B85D38] bg-[#F4EFEB]/50'
                          : 'border-stone-200 bg-white hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-stone-900">
                        <Building className="w-4 h-4 text-amber-700" />
                        <span>Direct Bank Wire (EFT)</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Stanbic or CABS USD Nostro account wire settlement.
                      </p>
                    </div>
                  </div>

                  {/* Payment Inputs */}
                  {paymentMethod === 'ecocash' && (
                    <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200 space-y-2 text-xs">
                      <label className="block font-semibold text-stone-800">
                        Enter Registered EcoCash Handset Number
                      </label>
                      <input
                        type="tel"
                        value={ecocashNumber}
                        onChange={(e) => setEcocashNumber(e.target.value)}
                        placeholder="077XXXXXXX"
                        className="w-full p-3 rounded-xl bg-white border border-stone-300 text-stone-900"
                      />
                      <p className="text-[11px] text-stone-500">
                        After tapping complete, check your screen to enter your EcoCash PIN and authenticate {formatPrice(cartTotal)}.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'bank_transfer' && (
                    <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200 space-y-2 text-xs">
                      <h4 className="font-semibold text-stone-800">Zimbabwean Nostro Account Details</h4>
                      <p className="text-stone-600">
                        <strong>Bank:</strong> Stanbic Bank Zimbabwe<br />
                        <strong>Branch:</strong> Borrowdale<br />
                        <strong>Account Name:</strong> Aesthetic Alley Private Limited<br />
                        <strong>USD Nostro Acc:</strong> 9140003849182<br />
                        <strong>Reference:</strong> AA-{fullName.split(' ')[0]}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(3)}
                      className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Delivery</span>
                    </button>
                    <button
                      id="btn-confirm-and-pay"
                      disabled={isProcessingPayment}
                      onClick={handleCompleteOrder}
                      className="px-8 py-4 rounded-full bg-[#1A1918] hover:bg-[#B85D38] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-xl flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Simulating Escrow Settlement...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Authenticate & Settle • {formatPrice(cartTotal)}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Order Summary Column */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E8E2D9] shadow-xs space-y-6 h-fit">
              <h3 className="font-serif text-lg text-[#1A1918] border-b border-stone-200 pb-3">
                Acquisition Summary
              </h3>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.heroImage}
                      alt={item.product.name}
                      className="w-14 h-16 object-cover rounded-lg bg-stone-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-medium text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-stone-500 block">
                        Qty: {item.quantity} {item.variant ? `(${item.variant.name})` : ''}
                      </span>
                    </div>
                    <span className="font-semibold text-stone-900">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Privilege Courtesy ({appliedPromo?.code})</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Handling & Delivery</span>
                  <span className="font-semibold text-stone-900">
                    {cartDeliveryFee === 0 ? 'Complimentary' : formatPrice(cartDeliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1A1918] pt-2 border-t border-stone-200">
                  <span>Total Due</span>
                  <span className="font-serif text-xl">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                  <ShieldCheck className="w-4 h-4 text-[#B85D38]" />
                  <span>Aesthetic Alley Authenticity Escrow</span>
                </div>
                <p>
                  Funds are secured until delivery inspection in Harare or diaspora customs release.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
