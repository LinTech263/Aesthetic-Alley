import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Category, Order, DiscountCode } from '../types';
import {
  Lock,
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Tag,
  FileText,
  MessageSquare,
  Shield,
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  Save,
  DollarSign,
  Printer
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    isAdminAuthenticated,
    adminUser,
    loginAdmin,
    logoutAdmin,
    products,
    categories,
    orders,
    discountCodes,
    siteContent,
    updateSiteContent,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateOrderStatus,
    addDiscountCode,
    deleteDiscountCode,
    answerQuestion,
    auditLogs,
    formatPrice,
    currency
  } = useStore();

  const [adminEmail, setAdminEmail] = useState('admin@aestheticalley.co.zw');
  const [adminPass, setAdminPass] = useState('atelier2026');

  const [activeTab, setActiveTab] = useState<
    'analytics' | 'products' | 'categories' | 'orders' | 'customers' | 'discounts' | 'content' | 'moderation' | 'audit'
  >('analytics');

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // Category edit modal state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  // New promo state
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoType, setNewPromoType] = useState<'percentage' | 'fixed'>('percentage');
  const [newPromoVal, setNewPromoVal] = useState(15);
  const [newPromoMin, setNewPromoMin] = useState(100);

  // Content form state
  const [contentHeroTitle, setContentHeroTitle] = useState(siteContent.heroHeadline);
  const [contentHeroSub, setContentHeroSub] = useState(siteContent.heroSubheadline);
  const [contentAnnounce, setContentAnnounce] = useState(siteContent.announcementText);
  const [contentStory, setContentStory] = useState(siteContent.brandStoryTeaser);

  if (!isAdminAuthenticated) {
    return (
      <div className="bg-[#FAF8F5] min-h-[80vh] flex items-center justify-center p-4 font-sans text-[#1A1918]">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#1A1918] text-[#C49B45] flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl text-[#1A1918]">Aesthetic Alley Atelier Console</h2>
            <p className="text-xs text-stone-500">
              Staff & Operations Portal • Harare Workshop Administration
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAdmin(adminEmail, adminPass);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Staff Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Atelier Key</label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-200"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#1A1918] hover:bg-[#B85D38] text-white text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              Authenticate Access
            </button>
          </form>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 text-[11px] text-stone-600 text-center">
            Demo Credentials preloaded: <strong>admin@aestheticalley.co.zw</strong> / <strong>atelier2026</strong>
          </div>
        </div>
      </div>
    );
  }

  // Analytics Metrics
  const totalGrossRevenue = (orders || []).reduce((sum, o) => sum + (o.totalAmount ?? o.pricing?.total ?? 0), 0);
  const averageOrderValue = (orders?.length || 0) > 0 ? totalGrossRevenue / orders.length : 0;
  const lowStockCount = (products || []).filter((p) => (p.stockCount ?? p.stockQuantity ?? 0) <= 3).length;

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent({
      heroHeadline: contentHeroTitle,
      heroSubheadline: contentHeroSub,
      announcementText: contentAnnounce,
      brandStoryTeaser: contentStory
    });
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode) return;
    addDiscountCode({
      code: newPromoCode.toUpperCase(),
      type: newPromoType,
      value: newPromoVal,
      minSpend: newPromoMin,
      active: true
    });
    setNewPromoCode('');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-[#1A1918] pb-16">
      {/* Top Admin Navigation Header */}
      <div className="bg-[#1A1918] text-[#FAF8F5] px-4 sm:px-8 py-4 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stone-800 text-[#C49B45] flex items-center justify-center font-serif text-sm">
            AA
          </div>
          <div>
            <h1 className="font-serif text-lg text-white font-medium leading-none">
              Aesthetic Alley Atelier OS
            </h1>
            <span className="text-[10px] text-stone-400">
              Authenticated: {adminUser?.name} ({adminUser?.role.toUpperCase()})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-stone-400">
            Current Currency Base: <strong>{currency}</strong>
          </span>
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Tab switcher */}
        <div className="flex border-b border-[#E8E2D9] gap-2 overflow-x-auto text-xs uppercase tracking-wider font-semibold pb-1 mb-8">
          {[
            { id: 'analytics', label: 'Analytics & KPIs', icon: LayoutDashboard },
            { id: 'products', label: `Catalog (${products.length})`, icon: Package },
            { id: 'categories', label: `Categories (${categories.length})`, icon: FolderTree },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'customers', label: 'Patrons & CRM', icon: Users },
            { id: 'discounts', label: 'Privileges & Promos', icon: Tag },
            { id: 'content', label: 'Storefront CMS', icon: FileText },
            { id: 'moderation', label: 'Reviews & Q&A', icon: MessageSquare },
            { id: 'audit', label: 'Audit Trail', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#B85D38] text-[#B85D38]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Analytics & KPIs */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-[#E8E2D9] shadow-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                  Gross Realized Revenue
                </span>
                <div className="font-serif text-3xl font-semibold text-[#1A1918]">
                  {formatPrice(totalGrossRevenue)}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 pt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+24.6% vs previous month</span>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-[#E8E2D9] shadow-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                  Total Orders Placed
                </span>
                <div className="font-serif text-3xl font-semibold text-[#1A1918]">
                  {orders.length} Orders
                </div>
                <span className="text-[11px] text-stone-500 block pt-1">
                  100% fulfilled via white-glove
                </span>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-[#E8E2D9] shadow-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                  Average Order Value (AOV)
                </span>
                <div className="font-serif text-3xl font-semibold text-[#1A1918]">
                  {formatPrice(averageOrderValue)}
                </div>
                <span className="text-[11px] text-stone-500 block pt-1">
                  Elevated luxury basket benchmark
                </span>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-[#E8E2D9] shadow-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                  Low Stock Warnings
                </span>
                <div className="font-serif text-3xl font-semibold text-amber-600">
                  {lowStockCount} Pieces
                </div>
                <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1 pt-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Workshop seasoning needed</span>
                </span>
              </div>
            </div>

            {/* Sales performance table & Top Pieces */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E8E2D9] shadow-xs space-y-4">
                <h3 className="font-serif text-lg text-[#1A1918]">Recent High-Value Dispatches</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                        <th className="py-2">Order ID</th>
                        <th>Patron</th>
                        <th>Suburbs</th>
                        <th>Amount</th>
                        <th>Channel</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-50">
                          <td className="py-3 font-mono font-semibold text-stone-900">{ord.id}</td>
                          <td className="font-medium text-stone-800">{ord.customerName || ord.customer?.name}</td>
                          <td className="text-stone-500">{ord.shippingAddress?.city || ord.delivery?.city || 'Harare'}</td>
                          <td className="font-semibold text-stone-900">{formatPrice(ord.totalAmount ?? ord.pricing?.total ?? 0)}</td>
                          <td className="uppercase text-[10px] text-stone-500">{ord.paymentMethod || ord.payment?.method}</td>
                          <td>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-amber-100 text-amber-800">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E8E2D9] shadow-xs space-y-4">
                <h3 className="font-serif text-lg text-[#1A1918]">Atelier Best Sellers</h3>
                <div className="space-y-3">
                  {products.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={p.heroImage}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-stone-900 truncate block">
                          {p.name}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {formatPrice(p.sellPrice)} • {p.stockCount} in stock
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Products Catalog CRUD */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-2xl text-[#1A1918]">Pieces Catalog Management</h3>
              <button
                onClick={() => {
                  setEditingProduct({
                    id: 'prod-' + Date.now(),
                    name: 'New Bespoke Piece',
                    slug: 'new-piece',
                    categoryId: categories[0]?.id || 'cat-furniture',
                    room: 'Living Room',
                    description: 'Handcrafted in Zimbabwe using seasoned organic materials.',
                    materials: 'Zambezi Teak',
                    dimensions: '100cm x 50cm x 75cm',
                    weightKg: 15,
                    artisan: 'Harare Central Wood Atelier',
                    provenance: 'Salvaged timber from certified sustainable forestry.',
                    careInstructions: 'Buff twice annually with natural beeswax.',
                    costPrice: 200,
                    markupPercent: 80,
                    sellPrice: 360,
                    inStock: true,
                    stockCount: 5,
                    heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
                    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'],
                    imageAlts: ['Bespoke furniture piece'],
                    variants: [
                      { id: 'v1', name: 'Standard', sku: 'STD-01', price: 360, stock: 5, attributes: {} }
                    ],
                    rating: 5,
                    reviewCount: 1,
                    reviews: [],
                    questions: [],
                    isNew: true,
                    seo: {
                      metaTitle: 'Bespoke Zimbabwe Home Decor Piece',
                      metaDescription: 'Handcrafted luxury interior piece from Aesthetic Alley.',
                      keywords: ['Zimbabwe', 'Home decor', 'Teak']
                    }
                  });
                  setIsCreatingProduct(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#1A1918] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#B85D38] flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Bespoke Piece</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#FAF8F5] text-stone-500 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Piece</th>
                    <th>Category</th>
                    <th>Cost / Markup</th>
                    <th>Sell Price</th>
                    <th>Stock</th>
                    <th className="text-right px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.heroImage}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-medium text-stone-900">{p.name}</div>
                          <span className="text-[10px] text-stone-400">{p.materials}</span>
                        </div>
                      </td>
                      <td className="text-stone-600">{p.room}</td>
                      <td className="text-stone-500">
                        {formatPrice(p.costPrice || p.baseCost || 0)} (+{p.markupPercent ?? (p.baseCost ? Math.round(((p.sellPrice - p.baseCost) / p.baseCost) * 100) : 50)}%)
                      </td>
                      <td className="font-semibold text-stone-900">{formatPrice(p.sellPrice)}</td>
                      <td>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            p.stockCount <= 3
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.stockCount} in workshop
                        </span>
                      </td>
                      <td className="text-right px-4 space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct({ ...p });
                            setIsCreatingProduct(false);
                          }}
                          className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-black"
                          title="Edit piece"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded-lg border border-stone-200 text-stone-400 hover:text-rose-600"
                          title="Delete piece"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Categories Management */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-2xl text-[#1A1918]">Collections & Rooms</h3>
              <button
                onClick={() => {
                  setEditingCategory({
                    id: 'cat-' + Date.now(),
                    name: 'New Collection',
                    slug: 'new-collection',
                    tagline: 'Refined artisanal sanctuary collection.',
                    description: 'Handcrafted homeware curated in Zimbabwe.',
                    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
                    roomType: 'Sanctuary'
                  });
                  setIsCreatingCategory(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#1A1918] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#B85D38] flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Collection</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl p-5 border border-[#E8E2D9] space-y-3">
                  <img
                    src={c.heroImage}
                    alt={c.name}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B85D38] font-semibold">
                      {c.roomType}
                    </span>
                    <h4 className="font-serif text-lg font-medium text-stone-900">{c.name}</h4>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">{c.description}</p>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                    <button
                      onClick={() => {
                        setEditingCategory({ ...c });
                        setIsCreatingCategory(false);
                      }}
                      className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-black"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="p-1.5 rounded-lg border border-stone-200 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-serif text-2xl text-[#1A1918]">Patron Order Dispatches</h3>

            <div className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#FAF8F5] text-stone-500 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Order Ref</th>
                    <th>Customer</th>
                    <th>Destination</th>
                    <th>Settlement</th>
                    <th>Status</th>
                    <th className="text-right px-4">Action Pipeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-mono font-bold text-stone-900">{ord.id}</td>
                      <td>
                        <div className="font-medium text-stone-800">{ord.customerName || ord.customer?.name}</div>
                        <span className="text-[10px] text-stone-400">{ord.customerPhone || ord.customer?.phone}</span>
                      </td>
                      <td className="text-stone-600">
                        {ord.shippingAddress?.line1 || ord.delivery?.addressLine || 'Harare'}, {ord.shippingAddress?.city || ord.delivery?.city || 'Zimbabwe'}
                      </td>
                      <td className="font-semibold text-stone-900">{formatPrice(ord.totalAmount ?? ord.pricing?.total ?? 0)}</td>
                      <td>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-[#FAF8F5] border border-stone-300 rounded-lg p-1.5 text-xs font-semibold uppercase"
                        >
                          <option value="paid">Paid & Authenticated</option>
                          <option value="processing">In Atelier Preparation</option>
                          <option value="out_for_delivery">Out for White-Glove Delivery</option>
                          <option value="delivered">Delivered to Room</option>
                          <option value="cancelled">Cancelled / Refunded</option>
                        </select>
                      </td>
                      <td className="text-right px-4">
                        <button
                          onClick={() => window.print()}
                          className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-black"
                          title="Print Packing Slip"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: Patrons CRM */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-serif text-2xl text-[#1A1918]">Patron Directory & Lifetime Value</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Tinashe Mariga',
                  email: 'tinashe@mariga.co.zw',
                  phone: '+263 77 240 9100',
                  suburb: 'Borrowdale, Harare',
                  ordersCount: 3,
                  ltv: 1450,
                  points: 850
                },
                {
                  name: 'Dr. Tatenda G.',
                  email: 'tatenda.g@kensington.uk',
                  phone: '+44 7700 900123',
                  suburb: 'London, UK (Diaspora)',
                  ordersCount: 2,
                  ltv: 980,
                  points: 400
                },
                {
                  name: 'Chipo & Farai R.',
                  email: 'farai.r@estate.co.zw',
                  phone: '+263 71 289 4010',
                  suburb: 'Borrowdale Brooke',
                  ordersCount: 4,
                  ltv: 2450,
                  points: 1200
                }
              ].map((c, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-[#E8E2D9] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg font-medium text-stone-900">{c.name}</h4>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#C49B45]/20 text-[#9B772A]">
                      VIP Patron
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    {c.email} • {c.phone}
                  </p>
                  <p className="text-xs text-stone-600">Location: {c.suburb}</p>
                  <div className="pt-2 border-t border-stone-100 flex justify-between text-xs">
                    <span>
                      Total Spent (LTV): <strong>{formatPrice(c.ltv)}</strong>
                    </span>
                    <span>
                      Privilege: <strong>{c.points} pts</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Privileges & Discounts */}
        {activeTab === 'discounts' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <h3 className="font-serif text-2xl text-[#1A1918]">Privilege Codes & Promos</h3>

            {/* Create Code Form */}
            <form
              onSubmit={handleCreatePromo}
              className="p-6 bg-white rounded-3xl border border-[#E8E2D9] space-y-4 max-w-xl text-xs"
            >
              <h4 className="font-serif text-lg text-stone-900">Generate New Privilege Voucher</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Privilege Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BORROWDALE15"
                    value={newPromoCode}
                    onChange={(e) => setNewPromoCode(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Type</label>
                  <select
                    value={newPromoType}
                    onChange={(e) => setNewPromoType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl"
                  >
                    <option value="percentage">Percentage Off (%)</option>
                    <option value="fixed">Fixed Dollar Off ($)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Value</label>
                  <input
                    type="number"
                    value={newPromoVal}
                    onChange={(e) => setNewPromoVal(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Minimum Basket Spend ($)</label>
                  <input
                    type="number"
                    value={newPromoMin}
                    onChange={(e) => setNewPromoMin(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#1A1918] text-white font-semibold uppercase tracking-wider hover:bg-[#B85D38]"
              >
                Create Privilege Code
              </button>
            </form>

            {/* Active Codes List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {discountCodes.map((d) => (
                <div key={d.code} className="p-4 bg-white rounded-2xl border border-[#E8E2D9] flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono text-sm font-bold text-stone-900">{d.code}</span>
                    <p className="text-stone-500 mt-0.5">
                      {d.type === 'percentage' ? `${d.value}% Off` : `$${d.value} Off`} • Min spend ${d.minSpend}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteDiscountCode(d.code)}
                    className="p-1.5 text-stone-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: Content CMS */}
        {activeTab === 'content' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-serif text-2xl text-[#1A1918]">Storefront Visual Copy & CMS</h3>

            <form onSubmit={handleSaveContent} className="bg-white rounded-3xl p-8 border border-[#E8E2D9] space-y-4 max-w-2xl text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Top Announcement Bar Text</label>
                <input
                  type="text"
                  value={contentAnnounce}
                  onChange={(e) => setContentAnnounce(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Homepage Main Headline</label>
                <input
                  type="text"
                  value={contentHeroTitle}
                  onChange={(e) => setContentHeroTitle(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Homepage Subheadline Copy</label>
                <textarea
                  rows={2}
                  value={contentHeroSub}
                  onChange={(e) => setContentHeroSub(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Brand Provenance Story Teaser</label>
                <textarea
                  rows={3}
                  value={contentStory}
                  onChange={(e) => setContentStory(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#1A1918] text-white font-semibold uppercase tracking-wider hover:bg-[#B85D38] flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Storefront Copy</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 8: Moderation (Reviews & Q&A) */}
        {activeTab === 'moderation' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-serif text-2xl text-[#1A1918]">Patron Reviews & Q&A Inquiries</h3>

            <div className="space-y-4">
              {products.map((p) =>
                p.questions.map((q) => (
                  <div key={q.id} className="p-4 bg-white rounded-2xl border border-[#E8E2D9] space-y-2 text-xs">
                    <div className="flex justify-between font-semibold text-stone-900">
                      <span>Piece: {p.name}</span>
                      <span className="text-stone-400">{q.date}</span>
                    </div>
                    <p className="text-stone-700">
                      <strong>Q ({q.askedBy}):</strong> {q.question}
                    </p>
                    {q.answer ? (
                      <p className="text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                        <strong>Official Reply:</strong> {q.answer}
                      </p>
                    ) : (
                      <div className="pt-2 flex gap-2">
                        <input
                          type="text"
                          placeholder="Type official atelier reply..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              answerQuestion(p.id, q.id, (e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                          className="flex-1 p-2 bg-[#FAF8F5] border border-stone-200 rounded-lg text-xs"
                        />
                        <button className="px-3 py-1 bg-stone-900 text-white rounded-lg text-xs">
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 9: Audit Trail */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-serif text-2xl text-[#1A1918]">Atelier Security Audit Logs</h3>

            <div className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#FAF8F5] text-stone-500 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-mono text-stone-500">{log.timestamp}</td>
                      <td className="font-medium text-stone-800">{log.user}</td>
                      <td className="font-semibold text-stone-900">{log.action}</td>
                      <td className="text-stone-600">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Product Edit / Create Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF8F5] rounded-3xl p-6 border border-[#E8E2D9] shadow-2xl space-y-4 text-xs font-sans">
            <div className="flex justify-between items-center pb-3 border-b border-stone-200">
              <h3 className="font-serif text-xl text-[#1A1918]">
                {isCreatingProduct ? 'Create New Bespoke Piece' : `Edit: ${editingProduct.name}`}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-stone-500 hover:text-black">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Piece Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Collection / Category</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Room Placement</label>
                  <input
                    type="text"
                    value={editingProduct.room}
                    onChange={(e) => setEditingProduct({ ...editingProduct, room: e.target.value })}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Pricing rule: Cost, Markup, Sell */}
              <div className="p-3 bg-white rounded-xl border border-stone-200 grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Artisan Cost ($)</label>
                  <input
                    type="number"
                    value={editingProduct.costPrice}
                    onChange={(e) => {
                      const cost = Number(e.target.value);
                      const markup = editingProduct.markupPercent;
                      const sell = Math.round(cost * (1 + markup / 100));
                      setEditingProduct({
                        ...editingProduct,
                        costPrice: cost,
                        sellPrice: sell
                      });
                    }}
                    className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Markup Rule (%)</label>
                  <input
                    type="number"
                    value={editingProduct.markupPercent}
                    onChange={(e) => {
                      const markup = Number(e.target.value);
                      const cost = editingProduct.costPrice;
                      const sell = Math.round(cost * (1 + markup / 100));
                      setEditingProduct({
                        ...editingProduct,
                        markupPercent: markup,
                        sellPrice: sell
                      });
                    }}
                    className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Calculated Sell Price ($)</label>
                  <input
                    type="number"
                    value={editingProduct.sellPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sellPrice: Number(e.target.value) })}
                    className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Workshop Stock Count</label>
                  <input
                    type="number"
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Hero Image URL</label>
                  <input
                    type="text"
                    value={editingProduct.heroImage}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        heroImage: e.target.value,
                        images: [e.target.value, ...editingProduct.images.slice(1)]
                      })
                    }
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Description & Materiality</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Materials Sourced</label>
                <input
                  type="text"
                  value={editingProduct.materials}
                  onChange={(e) => setEditingProduct({ ...editingProduct, materials: e.target.value })}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl text-stone-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isCreatingProduct) {
                    addProduct(editingProduct);
                  } else {
                    updateProduct(editingProduct);
                  }
                  setEditingProduct(null);
                }}
                className="px-6 py-2 rounded-xl bg-[#1A1918] text-white font-semibold uppercase tracking-wider hover:bg-[#B85D38]"
              >
                Save Piece
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Edit / Create Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl p-6 border border-[#E8E2D9] shadow-2xl space-y-4 text-xs font-sans">
            <h3 className="font-serif text-xl text-[#1A1918]">
              {isCreatingCategory ? 'New Category' : `Edit: ${editingCategory.name}`}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Category Name</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Room Placement Type</label>
                <input
                  type="text"
                  value={editingCategory.roomType}
                  onChange={(e) => setEditingCategory({ ...editingCategory, roomType: e.target.value })}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={editingCategory.heroImage}
                  onChange={(e) => setEditingCategory({ ...editingCategory, heroImage: e.target.value })}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setEditingCategory(null)} className="px-4 py-2 rounded-xl text-stone-600">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isCreatingCategory) {
                    addCategory(editingCategory);
                  } else {
                    updateCategory(editingCategory);
                  }
                  setEditingCategory(null);
                }}
                className="px-6 py-2 rounded-xl bg-[#1A1918] text-white font-semibold uppercase tracking-wider hover:bg-[#B85D38]"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
