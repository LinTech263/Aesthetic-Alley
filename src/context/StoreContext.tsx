import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Review,
  CartItem,
  Order,
  Customer,
  DiscountCode,
  DeliveryZone,
  JournalPost,
  AuditLog,
  SiteContent,
  CurrencyCode,
  WaitlistEntry,
  CustomerAddress,
  ProductVariant,
  ProductQnA
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_REVIEWS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMER,
  INITIAL_DISCOUNTS,
  DELIVERY_ZONES,
  INITIAL_JOURNAL_POSTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_SITE_CONTENT,
  INITIAL_CURRENCY_RATES
} from '../data/initialData';

export type ViewType =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'tracking'
  | 'wishlist'
  | 'about'
  | 'journal'
  | 'journal-post'
  | 'faq'
  | 'shipping'
  | 'returns'
  | 'terms'
  | 'admin'
  | 'giftcards';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'luxury';
}

interface StoreContextType {
  // Navigation
  currentView: ViewType;
  selectedProductId: string | null;
  selectedJournalSlug: string | null;
  selectedCategorySlug: string | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  navigateTo: (
    view: ViewType,
    opts?: {
      productId?: string;
      categorySlug?: string;
      journalSlug?: string;
      trackingOrderId?: string;
    }
  ) => void;

  // Catalog
  products: Product[];
  categories: Category[];
  reviews: Review[];
  journalPosts: JournalPost[];
  siteContent: SiteContent;
  discounts: DiscountCode[];
  deliveryZones: DeliveryZone[];
  activeDeliveryZone: DeliveryZone;
  setActiveDeliveryZone: (zone: DeliveryZone) => void;

  // Currency
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  toggleCurrency: () => void;
  formatPrice: (amountInUsd?: number | null | string) => string;
  convertPrice: (amountInUsd?: number | null | string) => number;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    variant?: ProductVariant,
    quantity?: number,
    giftWrap?: boolean,
    giftMessage?: string
  ) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  toggleGiftWrap: (itemId: string, message?: string) => void;
  clearCart: () => void;
  appliedPromo: DiscountCode | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (order: Order) => void;
  placeOrder: (orderData: any) => Order;
  getOrderById: (id: string) => Order | undefined;
  trackingOrderId: string;
  setTrackingOrderId: (id: string) => void;

  // Customer / Auth
  customer: Customer | null;
  isLoggedIn: boolean;
  login: (emailOrPhone: string) => void;
  logout: () => void;
  loginCustomer: (emailOrPhone: string, password?: string) => void;
  logoutCustomer: () => void;
  updateCustomerProfile: (updates: Partial<Customer>) => void;
  addCustomerAddress: (address: Omit<CustomerAddress, 'id'>) => void;
  removeCustomerAddress: (addressId: string) => void;
  redeemLoyaltyPoints: (points: number) => { success: boolean; promoCode?: string; message: string };

  // Waitlist
  waitlist: WaitlistEntry[];
  joinWaitlist: (
    productId: string,
    productName: string,
    variantName: string | undefined,
    email: string,
    phone?: string
  ) => void;

  // Admin
  isAdminAuthenticated: boolean;
  adminUser: { name: string; email: string; role: 'Owner' | 'Staff' } | null;
  adminLogin: (role?: 'Owner' | 'Staff') => void;
  adminLogout: () => void;
  loginAdmin: (email?: string, password?: string) => void;
  logoutAdmin: () => void;
  auditLogs: AuditLog[];
  addProduct: (product: Product) => void;
  updateProduct: (idOrProduct: string | Product, updates?: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (idOrCat: string | Category, updates?: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateOrderStatus: (
    orderId: string,
    status: Order['status'],
    note?: string
  ) => void;
  addReview: (productIdOrReview: any, maybeReviewData?: any) => void;
  updateReviewStatus: (
    reviewId: string,
    status: 'approved' | 'rejected',
    staffResponse?: string
  ) => void;
  addQuestion: (productId: string, askerOrAuthor: string, questionText: string) => void;
  answerQuestion: (productId: string, questionId: string, answer: string) => void;
  updateSiteContent: (content: Partial<SiteContent>) => void;
  discountCodes: DiscountCode[];
  addDiscountCode: (discount: DiscountCode | any) => void;
  deleteDiscountCode: (code: string) => void;
  addAuditEntry: (action: string, targetType: AuditLog['targetType'], targetId: string, details: string) => void;

  // UI state
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'luxury') => void;
  removeToast: (id: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  recentlyViewedIds: string[];
  trackRecentlyViewed: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedJournalSlug, setSelectedJournalSlug] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingOrderId, setTrackingOrderId] = useState('AA-8924');

  // Persistence keys
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const stored = localStorage.getItem(`aa_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveStored = <T,>(key: string, value: T) => {
    try {
      localStorage.setItem(`aa_${key}`, JSON.stringify(value));
    } catch {
      // ignore
    }
  };

  // State
  const [products, setProducts] = useState<Product[]>(() =>
    loadStored('products', INITIAL_PRODUCTS)
  );
  const [categories, setCategories] = useState<Category[]>(() =>
    loadStored('categories', INITIAL_CATEGORIES)
  );
  const [reviews, setReviews] = useState<Review[]>(() =>
    loadStored('reviews', INITIAL_REVIEWS)
  );

  const normalizeOrder = (ord: any): Order => {
    const customerName = ord.customerName || ord.customer?.name || 'Valued Patron';
    const customerEmail = ord.customerEmail || ord.customer?.email || 'patron@aestheticalley.co.zw';
    const customerPhone = ord.customerPhone || ord.customer?.phone || '+263 77 412 8990';
    const city = ord.shippingAddress?.city || ord.delivery?.city || 'Harare';
    const line1 = ord.shippingAddress?.line1 || ord.delivery?.addressLine || '14 Crowhill Road';
    const country = ord.shippingAddress?.country || ord.delivery?.country || 'Zimbabwe';
    const landmarkNotes = ord.shippingAddress?.landmarkNotes || ord.delivery?.landmarkInstructions || '';
    const totalAmount = ord.totalAmount ?? ord.pricing?.total ?? 0;
    const subtotal = ord.subtotal ?? ord.pricing?.subtotal ?? totalAmount;
    const deliveryFee = ord.deliveryFee ?? ord.pricing?.deliveryFee ?? 0;
    const discount = ord.discount ?? ord.pricing?.discount ?? 0;
    const paymentMethod = ord.paymentMethod || ord.payment?.method || 'ecocash';
    const createdAt = ord.createdAt || ord.date || new Date().toLocaleDateString();

    return {
      ...ord,
      id: ord.id || 'AA-' + Math.floor(10000 + Math.random() * 90000),
      createdAt,
      date: ord.date || createdAt,
      status: ord.status || 'Placed',
      customerName,
      customerEmail,
      customerPhone,
      customer: ord.customer || {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        isGuest: false
      },
      shippingAddress: ord.shippingAddress || {
        line1,
        city,
        country,
        landmarkNotes
      },
      delivery: ord.delivery || {
        addressLine: line1,
        suburb: city,
        city,
        country,
        gateCode: ord.delivery?.gateCode || '',
        landmarkInstructions: landmarkNotes,
        callAhead: true,
        zoneId: ord.deliveryZone?.id || 'harare-metro',
        zoneName: ord.deliveryZone?.name || 'Harare & Surrounds (Metro)',
        trackingCode: 'ZIM-' + Math.floor(10000 + Math.random() * 90000),
        estimatedDeliveryDate: '1-2 Days'
      },
      deliveryZone: ord.deliveryZone || {
        id: 'harare-metro',
        name: 'Harare & Surrounds (Metro)',
        feeUsd: 0,
        estimatedDays: '1-2 Days'
      },
      paymentMethod,
      payment: ord.payment || {
        method: paymentMethod,
        status: 'paid',
        transactionRef: 'TX-' + Date.now(),
        details: 'Settled via ' + paymentMethod,
        paidAt: createdAt
      },
      subtotal,
      discount,
      deliveryFee,
      totalAmount,
      pricing: ord.pricing || {
        subtotal,
        deliveryFee,
        discount,
        tax: 0,
        total: totalAmount,
        currency: 'USD',
        currencyRate: 1
      },
      items: ord.items || [],
      statusHistory: ord.statusHistory || [
        { status: ord.status || 'Placed', timestamp: createdAt, note: 'Order authenticated' }
      ]
    };
  };

  const [orders, setOrders] = useState<Order[]>(() =>
    loadStored('orders', INITIAL_ORDERS).map(normalizeOrder)
  );
  const [customer, setCustomer] = useState<Customer | null>(() =>
    loadStored('customer', INITIAL_CUSTOMER)
  );
  const [discounts, setDiscounts] = useState<DiscountCode[]>(() =>
    loadStored('discounts', INITIAL_DISCOUNTS)
  );
  const [journalPosts] = useState<JournalPost[]>(INITIAL_JOURNAL_POSTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() =>
    loadStored('auditLogs', INITIAL_AUDIT_LOGS)
  );
  const [siteContent, setSiteContentState] = useState<SiteContent>(() =>
    loadStored('siteContent', INITIAL_SITE_CONTENT)
  );
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(() =>
    loadStored('waitlist', [
      {
        id: 'wl-1',
        productId: 'prod-teak-console',
        productName: 'The Zambezi Fluted Teak Console',
        variantName: '160cm Standard / Smoked Charcoal Teak',
        customerEmail: 'farai.z@diaspora.org',
        phone: '+44 7911 123456',
        date: '2026-09-13',
        status: 'waiting'
      }
    ])
  );

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => loadStored('cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() =>
    loadStored('wishlist', ['prod-teak-console', 'prod-mopane-terracotta-lamp'])
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<DiscountCode | null>(null);
  const [activeDeliveryZone, setActiveDeliveryZone] = useState<DeliveryZone>(DELIVERY_ZONES[0]);

  // Currency
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<{
    name: string;
    email: string;
    role: 'Owner' | 'Staff';
  } | null>(null);

  // Recently Viewed
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() =>
    loadStored('recent', ['prod-teak-console', 'prod-mopane-terracotta-lamp'])
  );

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sync to local storage
  useEffect(() => saveStored('products', products), [products]);
  useEffect(() => saveStored('categories', categories), [categories]);
  useEffect(() => saveStored('reviews', reviews), [reviews]);
  useEffect(() => saveStored('orders', orders), [orders]);
  useEffect(() => saveStored('customer', customer), [customer]);
  useEffect(() => saveStored('discounts', discounts), [discounts]);
  useEffect(() => saveStored('cart', cart), [cart]);
  useEffect(() => saveStored('wishlist', wishlist), [wishlist]);
  useEffect(() => saveStored('auditLogs', auditLogs), [auditLogs]);
  useEffect(() => saveStored('siteContent', siteContent), [siteContent]);
  useEffect(() => saveStored('waitlist', waitlist), [waitlist]);
  useEffect(() => saveStored('recent', recentlyViewedIds), [recentlyViewedIds]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'luxury' = 'luxury') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Currency conversion
  const convertPrice = (usd?: number | null | string) => {
    const num = typeof usd === 'number' ? usd : (Number(usd) || 0);
    if (isNaN(num)) return 0;
    if (currency === 'ZiG') {
      return Math.round(num * INITIAL_CURRENCY_RATES.ZiG);
    }
    return num;
  };

  const formatPrice = (usd?: number | null | string) => {
    const num = typeof usd === 'number' ? usd : (Number(usd) || 0);
    if (isNaN(num) || usd === undefined || usd === null) {
      return currency === 'ZiG' ? 'ZiG 0' : '$0';
    }
    if (currency === 'ZiG') {
      const zig = Math.round(num * INITIAL_CURRENCY_RATES.ZiG);
      return `ZiG ${(zig || 0).toLocaleString()}`;
    }
    return `$${(num || 0).toLocaleString()}`;
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'ZiG' : 'USD'));
    showToast(
      'Currency Updated',
      currency === 'USD'
        ? 'Displaying in Zimbabwean Gold (ZiG) at benchmark conversion rate'
        : 'Displaying in United States Dollars (USD)',
      'info'
    );
  };

  // Navigation
  const navigateTo = (
    view: ViewType,
    opts?: {
      productId?: string;
      categorySlug?: string;
      journalSlug?: string;
      trackingOrderId?: string;
    }
  ) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (opts?.productId) {
      setSelectedProductId(opts.productId);
      trackRecentlyViewed(opts.productId);
    }
    if (opts?.categorySlug) setSelectedCategorySlug(opts.categorySlug);
    if (opts?.journalSlug) setSelectedJournalSlug(opts.journalSlug);
    if (opts?.trackingOrderId) setTrackingOrderId(opts.trackingOrderId);

    setCurrentView(view);
  };

  // Cart operations
  const addToCart = (
    product: Product,
    variant?: ProductVariant,
    quantity = 1,
    giftWrap = false,
    giftMessage?: string
  ) => {
    const unitPrice = variant ? product.sellPrice + variant.priceDifference : product.sellPrice;
    const itemId = `${product.id}_${variant?.id || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          variant,
          quantity,
          unitPrice,
          giftWrap,
          giftMessage
        }
      ];
    });

    setIsCartOpen(true);
    showToast(
      'Added to Curated Bag',
      `${product.name} ${variant ? `(${variant.name})` : ''} has been added.`,
      'luxury'
    );
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item Removed', 'The item was removed from your bag.', 'info');
  };

  const toggleGiftWrap = (itemId: string, message?: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              giftWrap: !item.giftWrap,
              giftMessage: message || item.giftMessage
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Cart financial calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity + (item.giftWrap ? 5 * item.quantity : 0),
    0
  );

  const cartDeliveryFee =
    cartSubtotal === 0
      ? 0
      : cartSubtotal >= 150 && activeDeliveryZone.id === 'harare-metro'
      ? 0
      : activeDeliveryZone.feeUsd;

  let cartDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      cartDiscount = (cartSubtotal * appliedPromo.value) / 100;
    } else {
      cartDiscount = appliedPromo.value;
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee);

  const applyPromoCode = (codeStr: string) => {
    const trimmed = codeStr.trim().toUpperCase();
    const promo = discounts.find((d) => d.code.toUpperCase() === trimmed && d.active);

    if (!promo) {
      return { success: false, message: 'Invalid or expired promotional code.' };
    }
    if (cartSubtotal < promo.minOrder) {
      return {
        success: false,
        message: `This privilege requires a minimum order of $${promo.minOrder}.`
      };
    }

    setAppliedPromo(promo);
    showToast('Privilege Applied', `${promo.description} has been applied.`, 'luxury');
    return { success: true, message: promo.description };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Code Removed', 'Promotional code has been detached.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const prod = products.find((p) => p.id === productId);
      if (exists) {
        showToast('Removed from Wishlist', `${prod?.name || 'Item'} removed.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', `${prod?.name || 'Item'} saved to your private collection.`, 'luxury');
        return [...prev, productId];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
    showToast('Removed from Wishlist', 'Item removed from your collection.', 'info');
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Recently viewed
  const trackRecentlyViewed = (productId: string) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 6);
    });
  };

  // Orders
  const createOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // update customer spend & loyalty
    if (customer) {
      const pointsEarned = Math.floor(newOrder.pricing.total * 0.5); // 1 pt per $2
      const updatedCustomer: Customer = {
        ...customer,
        orderCount: customer.orderCount + 1,
        lifetimeSpend: customer.lifetimeSpend + newOrder.pricing.total,
        loyaltyPoints: customer.loyaltyPoints + pointsEarned
      };
      setCustomer(updatedCustomer);
    }
    clearCart();
    setTrackingOrderId(newOrder.id);
  };

  const placeOrder = (orderData: any): Order => {
    const newId = `AA-${Math.floor(10000 + Math.random() * 90000)}`;
    const order = normalizeOrder({
      ...orderData,
      id: newId,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      totalAmount: cartTotal,
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Placed'
    });
    createOrder(order);
    return order;
  };

  const getOrderById = (id: string) =>
    orders.find((o) => o.id.toLowerCase() === id.trim().toLowerCase());

  // Customer / Auth
  const login = (emailOrPhone: string) => {
    const loggedCustomer: Customer = customer || {
      id: 'cust-' + Date.now(),
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Valued Patron',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'patron@aestheticalley.co.zw',
      phone: emailOrPhone.includes('@') ? '+263 77 000 0000' : emailOrPhone,
      loyaltyPoints: 100,
      tier: 'Silver',
      orderCount: 0,
      lifetimeSpend: 0,
      twoFactorEnabled: false,
      savedAddresses: [],
      savedPaymentMethods: []
    };
    setCustomer(loggedCustomer);
    showToast('Welcome Back', `Signed in as ${loggedCustomer.name}.`, 'luxury');
  };

  const logout = () => {
    setCustomer(null);
    showToast('Signed Out', 'You have been logged out securely.', 'info');
  };

  const loginCustomer = (emailOrPhone: string, _password?: string) => {
    login(emailOrPhone);
  };

  const logoutCustomer = () => {
    logout();
  };

  const updateCustomerProfile = (updates: Partial<Customer>) => {
    if (!customer) return;
    setCustomer({ ...customer, ...updates });
    showToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  const addCustomerAddress = (addressData: Omit<CustomerAddress, 'id'>) => {
    if (!customer) return;
    const newAddr: CustomerAddress = {
      ...addressData,
      id: 'addr-' + Date.now()
    };
    const updated = customer.savedAddresses.map((a) =>
      addressData.isDefault ? { ...a, isDefault: false } : a
    );
    setCustomer({
      ...customer,
      savedAddresses: [...updated, newAddr]
    });
    showToast('Address Saved', `${newAddr.title} added to your account.`, 'success');
  };

  const removeCustomerAddress = (addressId: string) => {
    if (!customer) return;
    setCustomer({
      ...customer,
      savedAddresses: customer.savedAddresses.filter((a) => a.id !== addressId)
    });
    showToast('Address Removed', 'Address has been deleted.', 'info');
  };

  const redeemLoyaltyPoints = (points: number) => {
    if (!customer || customer.loyaltyPoints < points) {
      return { success: false, message: 'Insufficient Alley Privilege points.' };
    }
    const discountVal = Math.floor(points / 10); // 10 pts = $1
    const code = `PRIVILEGE-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newDiscount: DiscountCode = {
      code,
      type: 'fixed',
      value: discountVal,
      minOrder: discountVal * 2,
      usageLimit: 1,
      usedCount: 0,
      active: true,
      description: `Alley Privilege Voucher ($${discountVal} off)`
    };

    setDiscounts((prev) => [newDiscount, ...prev]);
    setCustomer({
      ...customer,
      loyaltyPoints: customer.loyaltyPoints - points
    });

    return {
      success: true,
      promoCode: code,
      message: `Redeemed ${points} points for $${discountVal} off. Use code: ${code}`
    };
  };

  // Waitlist
  const joinWaitlist = (
    productId: string,
    productName: string,
    variantName: string | undefined,
    email: string,
    phone?: string
  ) => {
    const entry: WaitlistEntry = {
      id: 'wl-' + Date.now(),
      productId,
      productName,
      variantName,
      customerEmail: email,
      phone,
      date: new Date().toISOString().split('T')[0],
      status: 'waiting'
    };
    setWaitlist((prev) => [entry, ...prev]);
    showToast(
      'Priority Waitlist Confirmed',
      `We will notify you immediately once ${productName} is back in our Harare atelier.`,
      'luxury'
    );
  };

  // Admin Auth
  const adminLogin = (role: 'Owner' | 'Staff' = 'Owner') => {
    setIsAdminAuthenticated(true);
    setAdminUser({
      name: role === 'Owner' ? 'Tendai Chidzero (Director)' : 'Rudo Nyathi (Staff)',
      email: role === 'Owner' ? 'tendai@aestheticalley.co.zw' : 'rudo@aestheticalley.co.zw',
      role
    });
    showToast('Admin Portal Authenticated', `Welcome, ${role} session active.`, 'luxury');
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    setCurrentView('home');
    showToast('Admin Session Terminated', 'Logged out of admin console.', 'info');
  };

  const loginAdmin = (_email?: string, _password?: string) => {
    adminLogin('Owner');
  };

  const logoutAdmin = () => {
    adminLogout();
  };

  const addAuditEntry = (
    action: string,
    targetType: AuditLog['targetType'],
    targetId: string,
    details: string
  ) => {
    const entry: AuditLog = {
      id: 'log-' + Date.now(),
      adminName: adminUser ? `${adminUser.role} (${adminUser.name})` : 'System',
      action,
      targetType,
      targetId,
      timestamp: new Date().toLocaleString(),
      details
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  // Admin CRUD
  const addProduct = (prod: Product) => {
    setProducts((prev) => [prod, ...prev]);
    addAuditEntry('Product Created', 'Product', prod.id, `Created ${prod.name} with price $${prod.sellPrice}`);
    showToast('Product Created', `${prod.name} has been published to the catalog.`, 'success');
  };

  const updateProduct = (
    idOrProduct: string | Product,
    updates?: Partial<Product>
  ) => {
    if (typeof idOrProduct === 'object') {
      const prod = idOrProduct;
      setProducts((prev) => prev.map((p) => (p.id === prod.id ? prod : p)));
      addAuditEntry('Product Updated', 'Product', prod.id, `Updated ${prod.name}`);
      showToast('Product Updated', 'Product changes saved successfully.', 'success');
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === idOrProduct ? { ...p, ...(updates || {}) } : p))
      );
      addAuditEntry('Product Updated', 'Product', idOrProduct, `Updated fields: ${Object.keys(updates || {}).join(', ')}`);
      showToast('Product Updated', 'Product changes saved successfully.', 'success');
    }
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addAuditEntry('Product Deleted', 'Product', id, `Deleted ${prod?.name || id}`);
    showToast('Product Deleted', 'Product removed from catalog.', 'info');
  };

  const addCategory = (cat: Category) => {
    setCategories((prev) => [...prev, cat]);
    addAuditEntry('Category Created', 'Category', cat.id, `Created ${cat.name}`);
    showToast('Category Created', `Category ${cat.name} added.`, 'success');
  };

  const updateCategory = (
    idOrCat: string | Category,
    updates?: Partial<Category>
  ) => {
    if (typeof idOrCat === 'object') {
      const cat = idOrCat;
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
      addAuditEntry('Category Updated', 'Category', cat.id, `Updated ${cat.name}`);
      showToast('Category Updated', 'Category changes saved.', 'success');
    } else {
      setCategories((prev) =>
        prev.map((c) => (c.id === idOrCat ? { ...c, ...(updates || {}) } : c))
      );
      addAuditEntry('Category Updated', 'Category', idOrCat, `Updated ${Object.keys(updates || {}).join(', ')}`);
      showToast('Category Updated', 'Category changes saved.', 'success');
    }
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addAuditEntry('Category Deleted', 'Category', id, `Deleted category ${id}`);
    showToast('Category Removed', 'Category has been deleted.', 'info');
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order['status'],
    note?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const newHistory = [
            ...o.statusHistory,
            {
              status,
              timestamp: new Date().toLocaleString(),
              note: note || `Order status updated to ${status} by admin.`
            }
          ];
          return { ...o, status, statusHistory: newHistory };
        }
        return o;
      })
    );
    addAuditEntry('Order Status Changed', 'Order', orderId, `Changed to ${status}. Note: ${note || 'None'}`);
    showToast('Order Status Updated', `Order ${orderId} is now ${status}.`, 'success');
  };

  const addReview = (
    productIdOrReview: any,
    maybeReviewData?: any
  ) => {
    let reviewObj: any = {};
    if (typeof productIdOrReview === 'string') {
      reviewObj = {
        ...maybeReviewData,
        productId: productIdOrReview,
        customerName: maybeReviewData?.customerName || maybeReviewData?.author || 'Anonymous Patron',
        verifiedPurchase: maybeReviewData?.verifiedPurchase ?? maybeReviewData?.verifiedBuyer ?? true
      };
    } else if (productIdOrReview && typeof productIdOrReview === 'object') {
      reviewObj = {
        ...productIdOrReview,
        customerName: productIdOrReview.customerName || productIdOrReview.author || 'Anonymous Patron',
        verifiedPurchase: productIdOrReview.verifiedPurchase ?? productIdOrReview.verifiedBuyer ?? true
      };
    }

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      productId: reviewObj.productId || '',
      customerName: reviewObj.customerName || 'Anonymous Patron',
      location: reviewObj.location || 'Harare, Zimbabwe',
      rating: Number(reviewObj.rating) || 5,
      title: reviewObj.title || 'Quiet Luxury Experience',
      comment: reviewObj.comment || '',
      verifiedPurchase: reviewObj.verifiedPurchase ?? true,
      photos: reviewObj.photos || [],
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      status: 'approved' // auto-approve for demonstrable smoothness
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Review Published', 'Thank you for sharing your quiet luxury experience.', 'luxury');
  };

  const updateReviewStatus = (
    reviewId: string,
    status: 'approved' | 'rejected',
    staffResponse?: string
  ) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              status,
              staffResponse: staffResponse !== undefined ? staffResponse : r.staffResponse
            }
          : r
      )
    );
    showToast('Review Moderated', `Review marked as ${status}.`, 'success');
  };

  const addQuestion = (productId: string, askerOrAuthor: string, questionText: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newQ: ProductQnA = {
            id: 'q-' + Date.now(),
            question: questionText,
            asker: askerOrAuthor || 'Discerning Patron',
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            answer: '',
            answeredBy: ''
          };
          const currentQna = p.qna || [];
          const currentQuestions = (p as any).questions || [];
          return {
            ...p,
            qna: [newQ, ...currentQna],
            questions: [
              {
                id: newQ.id,
                question: newQ.question,
                askedBy: newQ.asker,
                asker: newQ.asker,
                date: newQ.date,
                answer: ''
              },
              ...currentQuestions
            ]
          };
        }
        return p;
      })
    );
    showToast('Inquiry Submitted', 'The atelier curators will provide guidance shortly.', 'success');
  };

  const answerQuestion = (productId: string, questionId: string, answer: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const currentQna = p.qna || [];
          const updatedQna = currentQna.map((q) =>
            q.id === questionId
              ? { ...q, answer, answeredBy: 'Aesthetic Alley Atelier Team' }
              : q
          );
          const currentQuestions = ((p as any).questions || []).map((q: any) =>
            q.id === questionId
              ? { ...q, answer, answeredBy: 'Aesthetic Alley Atelier Team' }
              : q
          );
          return {
            ...p,
            qna: updatedQna,
            questions: currentQuestions
          };
        }
        return p;
      })
    );
    showToast('Official Reply Published', 'Atelier response published to piece Q&A.', 'success');
  };

  const updateSiteContent = (updates: Partial<SiteContent>) => {
    setSiteContentState((prev) => ({ ...prev, ...updates }));
    addAuditEntry('Site Content Updated', 'Content', 'homepage', `Updated site content`);
    showToast('Site Content Published', 'Live storefront updated.', 'success');
  };

  const addDiscountCode = (disc: DiscountCode | any) => {
    const fullDiscount: DiscountCode = {
      code: disc.code.toUpperCase(),
      type: disc.type || 'percentage',
      value: Number(disc.value) || 10,
      minOrder: disc.minOrder ?? disc.minSpend ?? 50,
      minSpend: disc.minSpend ?? disc.minOrder ?? 50,
      usageLimit: disc.usageLimit ?? 100,
      usedCount: disc.usedCount ?? 0,
      active: disc.active !== undefined ? disc.active : true,
      description: disc.description || `${disc.value}${disc.type === 'percentage' ? '%' : '$'} Off Privilege Code`
    };
    setDiscounts((prev) => [fullDiscount, ...prev]);
    addAuditEntry('Discount Created', 'Discount', fullDiscount.code, `Created code ${fullDiscount.code}`);
    showToast('Privilege Code Created', `Code ${fullDiscount.code} is now active.`, 'success');
  };

  const deleteDiscountCode = (code: string) => {
    setDiscounts((prev) => prev.filter((d) => d.code !== code));
    addAuditEntry('Discount Deleted', 'Discount', code, `Removed code ${code}`);
    showToast('Code Removed', `Discount code ${code} deleted.`, 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        selectedProductId,
        selectedJournalSlug,
        selectedCategorySlug,
        searchQuery,
        setSearchQuery,
        navigateTo,

        products,
        categories,
        reviews,
        journalPosts,
        siteContent,
        discounts,
        discountCodes: discounts,
        deliveryZones: DELIVERY_ZONES,
        activeDeliveryZone,
        setActiveDeliveryZone,

        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,
        convertPrice,

        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleGiftWrap,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartTotal,

        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,

        orders,
        createOrder,
        placeOrder,
        getOrderById,
        trackingOrderId,
        setTrackingOrderId,

        customer,
        isLoggedIn: !!customer,
        login,
        logout,
        loginCustomer,
        logoutCustomer,
        updateCustomerProfile,
        addCustomerAddress,
        removeCustomerAddress,
        redeemLoyaltyPoints,

        waitlist,
        joinWaitlist,

        isAdminAuthenticated,
        adminUser,
        adminLogin,
        adminLogout,
        loginAdmin,
        logoutAdmin,
        auditLogs,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateOrderStatus,
        addReview,
        updateReviewStatus,
        addQuestion,
        answerQuestion,
        updateSiteContent,
        addDiscountCode,
        deleteDiscountCode,
        addAuditEntry,

        toasts,
        showToast,
        removeToast,
        isChatOpen,
        setIsChatOpen,
        recentlyViewedIds,
        trackRecentlyViewed
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
