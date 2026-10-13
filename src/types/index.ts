export type CurrencyCode = 'USD' | 'ZiG';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  exchangeRateToUsd: number; // 1 USD = rate ZiG
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'Size' | 'Material' | 'Finish' | 'Color';
  stock: number;
  priceDifference: number; // in USD
  sku: string;
}

export interface ProductQnA {
  id: string;
  question: string;
  asker: string;
  answer: string;
  answeredBy: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  sensoryDetails?: string;
  categoryId: string;
  room: 'Living Room' | 'Dining Room' | 'Bedroom' | 'Patio & Veranda' | 'Art & Accent' | string;
  baseCost: number; // Private admin cost price
  costPrice?: number;
  markupPercent?: number;
  sellPrice: number; // In USD
  compareAtPrice?: number; // Previous price if on sale
  markupRule?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  isSaleActive?: boolean;
  saleStartDate?: string;
  saleEndDate?: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isLimited?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockCount: number;
  dimensions: string;
  materials: string;
  craftsmanshipProvenance?: string;
  provenance?: string;
  artisan?: string;
  weightKg?: number;
  careInstructions: string;
  estimatedHarareDelivery?: string;
  heroImage: string;
  images: string[];
  imageAlts?: string[];
  variants: ProductVariant[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  frequentlyBoughtWithIds?: string[];
  qna?: ProductQnA[];
  questions?: Array<{
    id: string;
    question: string;
    askedBy?: string;
    asker?: string;
    answer?: string;
    date: string;
  }>;
  reviews?: any[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  roomType: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  date: string;
  helpfulCount: number;
  photos: string[];
  status: 'approved' | 'pending' | 'rejected';
  staffResponse?: string;
}

export interface CartItem {
  id: string; // unique item id (composite of productId and variantId)
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  giftWrap: boolean;
  giftMessage?: string;
}

export interface DeliveryZone {
  id: 'harare-metro' | 'bulawayo-metro' | 'other-zim' | 'diaspora-express';
  name: string;
  feeUsd: number;
  estimatedDays: string;
  description: string;
  harareSameDayAvailable?: boolean;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  isGuest: boolean;
}

export interface OrderDelivery {
  addressLine: string;
  suburb: string;
  city: string;
  country: string;
  postalCode?: string;
  gateCode?: string;
  landmarkInstructions?: string;
  callAhead: boolean;
  zoneId: DeliveryZone['id'];
  zoneName: string;
  trackingCode: string;
  estimatedDeliveryDate: string;
}

export interface OrderPricing {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  currency: CurrencyCode;
  currencyRate: number;
  promoCodeApplied?: string;
}

export interface OrderPayment {
  method: 'ecocash' | 'onemoney' | 'paynow' | 'card' | 'transfer';
  status: 'paid' | 'pending' | 'failed';
  transactionRef: string;
  details: string;
  paidAt?: string;
}

export interface OrderStatusHistoryItem {
  status: 'Placed' | 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Refunded';
  timestamp: string;
  note: string;
}

export interface Order {
  id: string; // e.g. AA-9482
  date: string;
  createdAt?: string;
  status: 'Placed' | 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Refunded' | string;
  customer: OrderCustomer;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  delivery: OrderDelivery;
  shippingAddress?: {
    line1: string;
    city: string;
    country: string;
    landmarkNotes?: string;
  };
  deliveryZone?: any;
  items: CartItem[];
  pricing: OrderPricing;
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  totalAmount?: number;
  payment: OrderPayment;
  paymentMethod?: string;
  statusHistory: OrderStatusHistoryItem[];
  notes?: string;
}

export interface CustomerAddress {
  id: string;
  title: string; // e.g. "Primary Home", "Avondale Studio"
  recipientName: string;
  phone: string;
  addressLine: string;
  suburb: string;
  city: string;
  country: string;
  gateCode?: string;
  landmarkInstructions?: string;
  isDefault: boolean;
}

export interface CustomerPaymentMethod {
  id: string;
  type: 'ecocash' | 'card';
  title: string; // e.g. "EcoCash 077***492" or "Visa ending in 4920"
  expiry?: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  tier: 'Silver' | 'Gold' | 'Obsidian';
  savedAddresses: CustomerAddress[];
  savedPaymentMethods: CustomerPaymentMethod[];
  orderCount: number;
  lifetimeSpend: number;
  twoFactorEnabled?: boolean;
}

export interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // percentage (e.g. 10 for 10%) or dollar amount (e.g. 25 for $25)
  minOrder?: number;
  minSpend?: number;
  usageLimit?: number;
  usedCount?: number;
  active: boolean;
  expiresAt?: string;
  description?: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  action: string;
  targetType: 'Product' | 'Order' | 'Category' | 'Pricing' | 'Discount' | 'Content';
  targetId: string;
  timestamp: string;
  details: string;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  excerpt: string;
  heroImage: string;
  contentMarkdown: string;
  shoppableProductIds: string[];
}

export interface WaitlistEntry {
  id: string;
  productId: string;
  productName: string;
  variantName?: string;
  customerEmail: string;
  phone?: string;
  date: string;
  status: 'waiting' | 'notified';
}

export interface SiteContent {
  announcementText: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroImage: string;
  brandStoryTeaser: string;
}
