import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { ProductVariant } from '../types';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Star,
  Check,
  Share2,
  ChevronRight,
  MapPin,
  Calendar,
  MessageSquare,
  AlertCircle,
  Plus
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    navigateTo,
    showToast,
    addReview,
    addQuestion,
    deliveryZones,
    reviews
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const defaultVariant: ProductVariant = {
    id: 'default',
    name: 'Standard',
    sku: 'STD',
    type: 'Material',
    stock: 5,
    priceDifference: 0
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product?.variants?.[0] || defaultVariant
  );

  React.useEffect(() => {
    if (product?.variants?.[0]) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(defaultVariant);
    }
    setActiveImageIndex(0);
  }, [product?.id]);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'provenance' | 'dimensions' | 'care' | 'delivery'>('provenance');

  // Delivery calculator suburb input
  const [calcSuburb, setCalcSuburb] = useState('Borrowdale, Harare');
  const [calcEstimate, setCalcEstimate] = useState<string | null>(
    'Complimentary Harare White-Glove delivery (2-3 business days)'
  );

  // Review modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [revAuthor, setRevAuthor] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revTitle, setRevTitle] = useState('');
  const [revComment, setRevComment] = useState('');

  // Question modal
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [qAuthor, setQAuthor] = useState('');
  const [qText, setQText] = useState('');

  // Back in stock waitlist modal
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');

  // Safely computed reviews & questions for this product
  const productReviews = useMemo(() => {
    if (Array.isArray(product?.reviews) && product.reviews.length > 0) {
      return product.reviews;
    }
    return (reviews || []).filter(
      (r) => r.productId === product?.id && (r.status === 'approved' || !r.status)
    );
  }, [reviews, product]);

  const productQuestions = useMemo(() => {
    if (Array.isArray(product?.questions) && product.questions.length > 0) {
      return product.questions;
    }
    if (Array.isArray(product?.qna) && product.qna.length > 0) {
      return product.qna.map((q) => ({
        id: q.id,
        question: q.question,
        askedBy: q.asker || 'Patron',
        date: q.date,
        answer: q.answer,
        answeredBy: q.answeredBy || 'Aesthetic Alley Atelier'
      }));
    }
    return [];
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p>Piece not found in collection.</p>
        <button onClick={() => navigateTo('shop')} className="mt-4 underline">
          Return to Catalog
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const currentPrice = selectedVariant?.priceDifference
    ? product.sellPrice + selectedVariant.priceDifference
    : (selectedVariant as any)?.price || product.sellPrice;
  const inStock = (selectedVariant?.stock ?? 1) > 0;

  // Frequently bought together bundle item
  const bundleProduct = products.find((p) => p.id !== product.id && p.categoryId === product.categoryId) || products[1];
  const bundleTotal = currentPrice + (bundleProduct ? bundleProduct.sellPrice : 0);
  const bundleDiscountedTotal = Math.round(bundleTotal * 0.9); // 10% bundle privilege

  const handleCalculateDelivery = () => {
    const lower = calcSuburb.toLowerCase();
    if (lower.includes('bulawayo')) {
      setCalcEstimate('Specialized Bulawayo regional transit ($28, 4-6 business days)');
    } else if (lower.includes('uk') || lower.includes('london') || lower.includes('diaspora') || lower.includes('usa')) {
      setCalcEstimate('DHL Express insured air freight ($85, 5-8 business days to UK/US/EU)');
    } else {
      setCalcEstimate('Complimentary Harare White-Glove room delivery (2-3 business days)');
    }
  };

  const handleAddBundle = () => {
    addToCart(product, selectedVariant, 1);
    if (bundleProduct) {
      const bundleVar = bundleProduct.variants?.[0] || {
        id: 'default',
        name: 'Standard',
        sku: 'STD',
        type: 'Material' as const,
        stock: 5,
        priceDifference: 0
      };
      addToCart(bundleProduct, bundleVar, 1);
    }
    showToast(
      'Atmospheric Ensemble Added',
      `Added ${product.name} and ${bundleProduct?.name} with 10% bundle courtesy.`,
      'luxury'
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this bespoke piece from Aesthetic Alley: ${product.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Private gallery link copied to your clipboard.', 'info');
    }
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revAuthor || !revComment) return;
    addReview(product.id, {
      author: revAuthor,
      location: 'Harare, Zimbabwe',
      rating: revRating,
      title: revTitle || 'Exquisite craftsmanship',
      comment: revComment,
      verifiedBuyer: true
    });
    setIsReviewModalOpen(false);
    setRevAuthor('');
    setRevTitle('');
    setRevComment('');
  };

  const submitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qAuthor || !qText) return;
    addQuestion(product.id, qAuthor, qText);
    setIsQuestionModalOpen(false);
    setQAuthor('');
    setQText('');
  };

  const submitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    showToast(
      'Added to Priority Waitlist',
      `We will notify ${waitlistEmail} as soon as the kiln or workshop completes the next casting.`,
      'luxury'
    );
    setIsWaitlistModalOpen(false);
    setWaitlistEmail('');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.categoryId === product.categoryId || p.room === product.room))
    .slice(0, 4);

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-[#1A1918]">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E8E2D9] text-xs text-stone-500">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => navigateTo('home')} className="hover:text-[#B85D38]">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <button onClick={() => navigateTo('shop')} className="hover:text-[#B85D38]">
            Catalog
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <button
            onClick={() => navigateTo('shop', { categorySlug: product.categoryId })}
            className="hover:text-[#B85D38] capitalize"
          >
            {product.categoryId.replace('cat-', '').replace('-', ' ')}
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-800 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-[#F4EFEB] border border-[#E8E2D9] shadow-xs">
              <img
                src={(product.images && product.images[activeImageIndex]) || product.heroImage}
                alt={(product.imageAlts && product.imageAlts[activeImageIndex]) || product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.isNew && (
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#1A1918] text-[#FAF8F5]">
                    New Season Addition
                  </span>
                )}
                {product.isLimited && (
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#B85D38] text-white">
                    Atelier Edition (Limited)
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button
                id="btn-pdp-wishlist"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-all ${
                  isFavorited
                    ? 'bg-[#B85D38] text-white'
                    : 'bg-white/80 text-stone-700 hover:text-[#B85D38]'
                }`}
                aria-label="Save piece to wishlist"
              >
                <Heart className="w-5 h-5" fill={isFavorited ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {(product.images?.length || 0) > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {(product.images || []).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#B85D38] ring-2 ring-[#B85D38]/20'
                        : 'border-[#E8E2D9] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail perspective ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Material Provenance Highlight Box */}
            <div className="p-6 bg-white rounded-2xl border border-[#E8E2D9] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
                <Sparkles className="w-4 h-4 text-[#C49B45]" />
                <span>Zimbabwean Material Provenance</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                {product.provenance}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-[11px] text-stone-500 border-t border-stone-100">
                <span>
                  <strong>Workshop:</strong> {product.artisan}
                </span>
                <span>
                  <strong>Materials:</strong> {product.materials}
                </span>
                <span>
                  <strong>Atmosphere:</strong> {product.room}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing & Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold">
                  {product.room}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-xs text-stone-500 hover:text-[#1A1918]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1A1918] mt-1">
                {product.name}
              </h1>

              {/* Rating & Review quick anchor */}
              <div className="flex items-center gap-3 mt-2.5">
                <div className="flex items-center gap-1 text-[#C49B45]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-800">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-stone-400 text-xs">•</span>
                <a href="#reviews-section" className="text-xs text-stone-500 hover:underline">
                  {product.reviewCount ?? productReviews.length} Patron Reviews
                </a>
              </div>
            </div>

            {/* Price section */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8E2D9] space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-2xl sm:text-3xl font-bold text-[#1A1918]">
                  {formatPrice(currentPrice)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > currentPrice && (
                  <span className="font-sans text-base text-stone-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                Inclusive of Zimbabwean VAT. Dual-currency display toggle available in top bar.
              </p>
            </div>

            {/* Variants Selector */}
            {(product.variants?.length || 0) > 1 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold uppercase tracking-wider text-stone-700">
                    Select Specification:
                  </span>
                  <span className="text-stone-500">{selectedVariant.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {(product.variants || []).map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        selectedVariant.id === v.id
                          ? 'border-[#1A1918] bg-[#1A1918] text-[#FAF8F5]'
                          : 'border-[#E8E2D9] bg-white text-stone-800 hover:border-stone-400'
                      }`}
                    >
                      <div className="font-medium">{v.name}</div>
                      <div
                        className={`text-[11px] mt-0.5 ${
                          selectedVariant.id === v.id ? 'text-stone-300' : 'text-stone-500'
                        }`}
                      >
                        {formatPrice(v.price || (v.priceDifference ? product.sellPrice + v.priceDifference : product.sellPrice))} • {v.stock > 0 ? `${v.stock} ready` : 'Made to Order'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Availability indicator */}
            <div className="flex items-center gap-2 text-xs">
              {inStock ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-800 font-medium">
                    In Stock at Harare Atelier ({selectedVariant.stock} available for immediate dispatch)
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-amber-800 font-medium">
                    Hand-crafted on demand (Estimated 14 days lead time)
                  </span>
                </>
              )}
            </div>

            {/* Quantity and Add to Cart action */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8E2D9] rounded-xl bg-white px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-stone-500 hover:text-black px-2 py-1"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-stone-500 hover:text-black px-2 py-1"
                  >
                    +
                  </button>
                </div>

                {/* Main Add Button */}
                {inStock ? (
                  <button
                    id="btn-add-to-cart"
                    onClick={() => addToCart(product, selectedVariant, quantity)}
                    className="flex-1 flex items-center justify-center gap-2.5 rounded-xl bg-[#1A1918] hover:bg-[#B85D38] text-[#FAF8F5] py-4 text-xs uppercase tracking-widest font-semibold transition-all shadow-xl cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Acquire Piece • {formatPrice(currentPrice * quantity)}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsWaitlistModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-[#FAF8F5] py-4 text-xs uppercase tracking-widest font-semibold transition-all shadow-xl cursor-pointer"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Notify Me When Cast / Crafted</span>
                  </button>
                )}
              </div>

              {/* Harare & Diaspora Delivery Estimator widget */}
              <div className="p-4 bg-[#F4EFEB] rounded-2xl border border-[#E8E2D9] space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#B85D38]" />
                    <span>Estimate Delivery Time & Handling</span>
                  </span>
                  <span className="text-[10px] text-stone-500">Live Rates</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={calcSuburb}
                    onChange={(e) => setCalcSuburb(e.target.value)}
                    placeholder="Suburb or City (e.g. Borrowdale, Bulawayo, London)..."
                    className="flex-1 bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-xs text-[#1A1918] focus:outline-none focus:border-[#B85D38]"
                  />
                  <button
                    onClick={handleCalculateDelivery}
                    className="px-3 py-2 bg-stone-900 text-white rounded-lg font-semibold text-[11px] uppercase tracking-wider hover:bg-[#B85D38]"
                  >
                    Calculate
                  </button>
                </div>
                {calcEstimate && (
                  <div className="text-[11px] text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200">
                    <strong>Transit Estimate:</strong> {calcEstimate}
                  </div>
                )}
              </div>

              {/* Guarantees list */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-stone-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B85D38]" />
                  <span>Insured Transit & Packing</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#B85D38]" />
                  <span>30-Day Bespoke Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        {bundleProduct && (
          <div className="mt-16 p-8 bg-white rounded-3xl border border-[#E8E2D9] shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block mb-1">
              Atmospheric Pairings
            </span>
            <h3 className="font-serif text-2xl text-[#1A1918] font-light">
              Frequently Acquired Together
            </h3>
            <p className="text-xs text-stone-500 mt-1 mb-6">
              Our interior stylists curate complementary architectural accents with a 10% ensemble courtesy.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Item 1 */}
                <div className="flex items-center gap-3">
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-stone-200"
                  />
                  <div className="text-xs">
                    <span className="font-medium text-stone-900 block line-clamp-1">
                      {product.name}
                    </span>
                    <span className="text-stone-500">{formatPrice(currentPrice)}</span>
                  </div>
                </div>

                <div className="text-stone-400 font-serif text-xl">+</div>

                {/* Item 2 */}
                <div className="flex items-center gap-3">
                  <img
                    src={bundleProduct.heroImage}
                    alt={bundleProduct.name}
                    className="w-20 h-20 object-cover rounded-xl border border-stone-200"
                  />
                  <div className="text-xs">
                    <span className="font-medium text-stone-900 block line-clamp-1">
                      {bundleProduct.name}
                    </span>
                    <span className="text-stone-500">
                      {formatPrice(bundleProduct.sellPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bundle summary & CTA */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-stone-500 line-through">
                    {formatPrice(bundleTotal)}
                  </div>
                  <div className="text-lg font-bold text-[#1A1918]">
                    {formatPrice(bundleDiscountedTotal)}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    Save 10% on ensemble
                  </span>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="px-6 py-3 rounded-full bg-[#1A1918] hover:bg-[#B85D38] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Acquire Ensemble</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabbed Specifications & Care */}
        <div className="mt-16 bg-white rounded-3xl border border-[#E8E2D9] p-8">
          <div className="flex items-center gap-4 border-b border-[#E8E2D9] pb-4 overflow-x-auto text-xs uppercase tracking-wider font-semibold">
            {[
              { id: 'provenance', label: 'Materiality & Provenance' },
              { id: 'dimensions', label: 'Dimensions & Scale' },
              { id: 'care', label: 'Care & Preservation' },
              { id: 'delivery', label: 'Harare & Diaspora Delivery' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#B85D38] text-[#B85D38]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 text-xs sm:text-sm text-stone-700 leading-relaxed max-w-4xl space-y-4">
            {activeTab === 'provenance' && (
              <div className="space-y-3 font-sans">
                <h4 className="font-serif text-lg text-[#1A1918]">
                  Rooted in Zimbabwean Craft Heritage
                </h4>
                <p>{product.description}</p>
                <p>
                  <strong>Atelier Workshop:</strong> {product.artisan}
                </p>
                <p>
                  <strong>Raw Sourcing:</strong> {product.provenance}
                </p>
              </div>
            )}

            {activeTab === 'dimensions' && (
              <div className="space-y-3 font-sans">
                <h4 className="font-serif text-lg text-[#1A1918]">
                  Architectural Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200">
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                      Physical Dimensions
                    </span>
                    <span className="font-semibold text-stone-900 mt-1 block">
                      {product.dimensions}
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200">
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                      Weight (Crated for Transit)
                    </span>
                    <span className="font-semibold text-stone-900 mt-1 block">
                      {product.weightKg} kg (Heavy-duty shock mounting)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3 font-sans">
                <h4 className="font-serif text-lg text-[#1A1918]">
                  Preservation & Maintenance Ritual
                </h4>
                <p>{product.careInstructions}</p>
                <p className="text-stone-500 italic">
                  Note: Being organic materials, natural variations in timber grain and stone striation are hallmarks of authentic Zimbabwean slow craft.
                </p>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3 font-sans">
                <h4 className="font-serif text-lg text-[#1A1918]">
                  White-Glove Room Delivery & Diaspora Freight
                </h4>
                <p>
                  All Harare orders over $150 receive complimentary white-glove placement. Our team uncrates your piece, positions it exactly where requested, and removes all packing materials.
                </p>
                <p>
                  For diaspora clients in South Africa, UK, and USA, shipments are crated in phytosanitary-certified pine with full DHL tracking and export documentation provided.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section id="reviews-section" className="mt-16 bg-white rounded-3xl border border-[#E8E2D9] p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E8E2D9] gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold">
                Patron Appraisal
              </span>
              <h3 className="font-serif text-2xl text-[#1A1918] font-light">
                Verified Reviews ({productReviews.length})
              </h3>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-[#1A1918] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#B85D38] transition-colors"
            >
              Inscribe a Review
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {productReviews.length === 0 ? (
              <div className="text-center py-8 text-stone-500">
                <p className="font-serif text-base text-stone-700">No reviews inscribed for this piece yet.</p>
                <p className="text-xs mt-1">Be the first patron to share your experience with our master joiners and ceramists.</p>
              </div>
            ) : (
              productReviews.map((rev: any) => (
                <div
                  key={rev.id}
                  className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex text-[#C49B45]">
                        {[...Array(Math.max(1, Math.min(5, rev.rating || 5)))].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="font-serif text-sm font-medium text-[#1A1918]">
                        {rev.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs text-stone-500">
                    <span className="font-medium text-stone-800">
                      {rev.customerName || rev.author || 'Patron'} • <span className="text-stone-500">{rev.location || 'Harare, Zimbabwe'}</span>
                    </span>
                    {(rev.verifiedPurchase || rev.verifiedBuyer) && (
                      <span className="flex items-center gap-1 text-emerald-700 font-medium text-[11px]">
                        <Check className="w-3 h-3" />
                        Verified Acquisition
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Customer Questions & Answers */}
        <section className="mt-16 bg-white rounded-3xl border border-[#E8E2D9] p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E8E2D9] gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold">
                Inquiries & Answers
              </span>
              <h3 className="font-serif text-2xl text-[#1A1918] font-light">
                Questions from Discerning Patrons ({productQuestions.length})
              </h3>
            </div>
            <button
              onClick={() => setIsQuestionModalOpen(true)}
              className="px-6 py-2.5 rounded-full border border-stone-800 text-stone-800 text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 hover:text-white transition-colors"
            >
              Ask an Atelier Question
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {productQuestions.length === 0 ? (
              <div className="text-center py-8 text-stone-500">
                <p className="font-serif text-base text-stone-700">No patron inquiries for this piece yet.</p>
                <p className="text-xs mt-1">Have a question regarding dimensions, custom timber stains, or shipping to your suburb? Inquire above.</p>
              </div>
            ) : (
              productQuestions.map((q: any) => (
                <div
                  key={q.id}
                  className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3 text-xs"
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#B85D38]">Q:</span>
                    <div>
                      <span className="font-semibold text-stone-900">{q.question}</span>
                      <span className="text-stone-400 block text-[10px] mt-0.5">
                        Asked by {q.askedBy || q.asker || 'Patron'} on {q.date}
                      </span>
                    </div>
                  </div>

                  {q.answer && (
                    <div className="flex items-start gap-2 pl-4 border-l-2 border-[#B85D38]/40 pt-1">
                      <span className="font-bold text-stone-900">A:</span>
                      <div className="text-stone-700 leading-relaxed">
                        {q.answer}
                        <span className="text-[10px] text-[#C49B45] font-semibold block mt-1">
                          — Answered by {q.answeredBy || 'Aesthetic Alley Atelier Team'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* You May Also Like recommendation carousel */}
        <section className="mt-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block mb-1">
                Curated Recommendations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1918] font-light">
                You May Also Admire
              </h3>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs uppercase tracking-wider font-semibold text-[#B85D38] hover:underline"
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl p-6 border border-[#E8E2D9] shadow-2xl space-y-4">
            <h3 className="font-serif text-xl text-[#1A1918]">Inscribe Your Review</h3>
            <form onSubmit={submitReview} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  value={revAuthor}
                  onChange={(e) => setRevAuthor(e.target.value)}
                  placeholder="e.g. Tendai M."
                  className="w-full p-2.5 bg-white border border-[#E8E2D9] rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1 font-medium">Rating</label>
                <select
                  value={revRating}
                  onChange={(e) => setRevRating(Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-[#E8E2D9] rounded-xl"
                >
                  <option value={5}>5 Stars — Transcendent Piece</option>
                  <option value={4}>4 Stars — Very Pleased</option>
                  <option value={3}>3 Stars — Satisfactory</option>
                  <option value={2}>2 Stars — Needs Refinement</option>
                  <option value={1}>1 Star — Disappointed</option>
                </select>
              </div>
              <div>
                <label className="block text-stone-600 mb-1 font-medium">Headline</label>
                <input
                  type="text"
                  value={revTitle}
                  onChange={(e) => setRevTitle(e.target.value)}
                  placeholder="Summary of your impression..."
                  className="w-full p-2.5 bg-white border border-[#E8E2D9] rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1 font-medium">Review Appraisal</label>
                <textarea
                  rows={3}
                  required
                  value={revComment}
                  onChange={(e) => setRevComment(e.target.value)}
                  placeholder="Describe the grain, presence, and room placement..."
                  className="w-full p-2.5 bg-white border border-[#E8E2D9] rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1A1918] text-white font-semibold uppercase tracking-wider hover:bg-[#B85D38]"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl p-6 border border-[#E8E2D9] shadow-2xl space-y-4">
            <h3 className="font-serif text-xl text-[#1A1918]">Ask our Atelier</h3>
            <form onSubmit={submitQuestion} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  value={qAuthor}
                  onChange={(e) => setQAuthor(e.target.value)}
                  placeholder="e.g. Farai C."
                  className="w-full p-2.5 bg-white border border-[#E8E2D9] rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1 font-medium">Your Inquiry</label>
                <textarea
                  rows={3}
                  required
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="Ask about dimensions, seasoning, custom sizes, or delivery..."
                  className="w-full p-2.5 bg-white border border-[#E8E2D9] rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1A1918] text-white font-semibold uppercase tracking-wider hover:bg-[#B85D38]"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Out of Stock Waitlist Modal */}
      {isWaitlistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl p-6 border border-[#E8E2D9] shadow-2xl space-y-4">
            <h3 className="font-serif text-xl text-[#1A1918]">Join Kiln & Atelier Waitlist</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Because every piece is seasoned slowly and shaped by hand, our production runs are strictly limited. Enter your email to be privately alerted when this piece is restocked.
            </p>
            <form onSubmit={submitWaitlist} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="patron@example.com"
                  className="w-full p-2.5 bg-white border border-[#E8E2D9] rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWaitlistModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1A1918] text-white font-semibold uppercase tracking-wider hover:bg-[#B85D38]"
                >
                  Join Waitlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
