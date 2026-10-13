import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Gift,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Check
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    toggleGiftWrap,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    navigateTo,
    activeDeliveryZone,
    setActiveDeliveryZone,
    deliveryZones
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [giftNoteModalId, setGiftNoteModalId] = useState<string | null>(null);
  const [tempGiftMessage, setTempGiftMessage] = useState('');

  if (!isCartOpen) return null;

  // Free shipping threshold for Harare metro is $150
  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput('');
  };

  const openGiftMessageModal = (itemId: string, existingMessage?: string) => {
    setGiftNoteModalId(itemId);
    setTempGiftMessage(existingMessage || '');
  };

  const saveGiftMessage = () => {
    if (giftNoteModalId) {
      toggleGiftWrap(giftNoteModalId, tempGiftMessage);
      setGiftNoteModalId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl border-l border-[#E8E2D9] flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E2D9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#1A1918]" />
              <h2 className="font-serif text-xl tracking-tight text-[#1A1918]">
                Your Curated Bag
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F4EFEB] text-stone-700">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="px-5 py-3 bg-[#F4EFEB] border-b border-[#E8E2D9]">
            <div className="flex items-center justify-between text-xs text-stone-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#B85D38]" />
                {amountNeeded > 0 ? (
                  <span>
                    Add <strong>{formatPrice(amountNeeded)}</strong> for complimentary Harare delivery
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium">
                    Complimentary Harare White-Glove Delivery Unlocked
                  </span>
                )}
              </span>
              <span className="font-semibold text-stone-800">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#E8E2D9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B85D38] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {(!cart || cart.length === 0) ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4EFEB] flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg text-stone-800">
                  Your bag is currently uncurated
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our handcrafted teak plinths, architectural brass lighting, and tactile Shona stonework.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#B85D38] transition-colors"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              (cart || []).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white rounded-xl border border-[#E8E2D9] flex gap-3.5 relative"
                >
                  <img
                    src={item.product?.heroImage || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80'}
                    alt={item.product?.name || 'Curated Piece'}
                    className="w-20 h-24 object-cover rounded-lg bg-stone-100 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            if (item.product?.id) {
                              navigateTo('product', { productId: item.product.id });
                            }
                          }}
                          className="font-serif text-sm font-medium text-[#1A1918] hover:text-[#B85D38] cursor-pointer line-clamp-1"
                        >
                          {item.product?.name || 'Curated piece'}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 -mr-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.variant && (
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Variant: {item.variant.name}
                        </p>
                      )}

                      <p className="text-xs font-semibold text-stone-900 mt-1">
                        {formatPrice(item.unitPrice)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-[#FAF8F5]">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:text-[#1A1918]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#1A1918]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:text-[#1A1918]"
                        >
                          +
                        </button>
                      </div>

                      {/* Gift wrapping toggle */}
                      <button
                        onClick={() => openGiftMessageModal(item.id, item.giftMessage)}
                        className={`text-[11px] flex items-center gap-1 font-medium transition-colors ${
                          item.giftWrap
                            ? 'text-[#B85D38] font-semibold'
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>{item.giftWrap ? 'Gift Wrap ($5)' : 'Add Gift Wrap'}</span>
                      </button>
                    </div>

                    {item.giftWrap && item.giftMessage && (
                      <div className="mt-2 text-[10px] text-stone-500 italic bg-[#FAF8F5] p-1.5 rounded border border-stone-200 line-clamp-1">
                        "{item.giftMessage}"
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Delivery Region Selection */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-[#E8E2D9] bg-white space-y-2 text-xs">
              <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                Destination Zone:
              </label>
              <select
                value={activeDeliveryZone.id}
                onChange={(e) => {
                  const found = deliveryZones.find((z) => z.id === e.target.value);
                  if (found) setActiveDeliveryZone(found);
                }}
                className="w-full bg-[#F4EFEB] border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
              >
                {deliveryZones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} ({formatPrice(z.feeUsd)}) — {z.estimatedDays}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Promo code field */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-[#E8E2D9] bg-[#FAF8F5]">
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>
                      Privilege <strong>{appliedPromo.code}</strong> applied (-
                      {formatPrice(cartDiscount)})
                    </span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-stone-400 hover:text-stone-700 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter privilege code (e.g. SAVANNAH10)..."
                    className="flex-1 bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#1A1918] placeholder-stone-400 focus:outline-none focus:border-[#B85D38]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-900 hover:bg-[#B85D38] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Financial Breakdown & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8E2D9] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Courtesy</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({activeDeliveryZone.name.split(' ')[0]})</span>
                  <span className="font-semibold text-stone-900">
                    {cartDeliveryFee === 0 ? 'Complimentary' : formatPrice(cartDeliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1A1918] pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-serif text-lg text-[#1A1918]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              <button
                id="btn-cart-checkout"
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#1A1918] hover:bg-[#B85D38] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold transition-all shadow-lg cursor-pointer"
              >
                <span>Proceed to Bespoke Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B85D38]" />
                <span>Encrypted EcoCash, Paynow & International Card Escrow</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gift Message Modal */}
      {giftNoteModalId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8E2D9] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg text-[#1A1918]">Bespoke Gift Wrapping</h3>
              <button
                onClick={() => setGiftNoteModalId(null)}
                className="text-stone-400 hover:text-stone-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Wrapped in unbleached archival linen cloth, secured with hand-twisted wild sisal twine and a calligraphy note card.
            </p>
            <textarea
              rows={3}
              value={tempGiftMessage}
              onChange={(e) => setTempGiftMessage(e.target.value)}
              placeholder="Inscribe your personal message to recipient..."
              className="w-full bg-white border border-[#E8E2D9] rounded-xl p-3 text-xs text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setGiftNoteModalId(null)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-200"
              >
                Cancel
              </button>
              <button
                onClick={saveGiftMessage}
                className="px-4 py-2 rounded-lg bg-[#1A1918] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#B85D38]"
              >
                Confirm ($5)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
