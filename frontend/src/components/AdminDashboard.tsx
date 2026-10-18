import { useState, useEffect, type FormEvent } from 'react';
import { 
  X, Plus, Edit3, Trash2, Tag, DollarSign, Package, Check, 
  Sparkles, Layers, RefreshCw, LogOut, ExternalLink, ShieldCheck, Search 
} from 'lucide-react';

export interface ProductItem {
  _id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  unit: string;
  offerTag?: string;
  description: string;
  image: string;
  badge?: string;
  inStock: boolean;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onProductsUpdated?: () => void;
}

const CATEGORIES = [
  'TMT Steel',
  'Cement',
  'Paints',
  'Hardware',
  'Roofing',
  'Electricals',
  'Slab & Sanitary',
  'Agro',
];

const PRESET_IMAGES = [
  { label: 'Paints & Finishing', url: '/images/companies/paints-essentials-4k.jpg' },
  { label: 'Steel & Pipes Yard', url: '/images/companies/steel-pipes-4k.jpg' },
  { label: 'Cement Warehouse', url: '/images/companies/cements-hardwares-4k.jpg' },
  { label: 'Electricals & Plumbing', url: '/images/companies/electricals-4k.jpg' },
  { label: 'Cooling & Roofing Sheets', url: '/images/companies/cooling-sheets-4k.jpg' },
  { label: 'Granite Slab & Washbasin', url: '/images/companies/slab-washbasin-4k.jpg' },
  { label: 'Agro Seeds & Sprayers', url: '/images/companies/agro-products-4k.jpg' },
  { label: 'Storefront 4K', url: '/assets/store-hero-W47zwWIs.jpg' },
];

export default function AdminDashboard({ isOpen, onClose, onLogout, onProductsUpdated }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'add'>('products');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  
  // Edit State
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editOriginalPrice, setEditOriginalPrice] = useState<string>('');
  const [editOfferTag, setEditOfferTag] = useState<string>('');
  const [editInStock, setEditInStock] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState(false);

  // Add Product Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('TMT Steel');
  const [brand, setBrand] = useState('Tata Tiscon');
  const [price, setPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [unit, setUnit] = useState('per kg');
  const [offerTag, setOfferTag] = useState('');
  const [badge, setBadge] = useState('ISI Certified');
  const [image, setImage] = useState('/images/companies/steel-pipes-4k.jpg');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  }

  function handleStartEdit(p: ProductItem) {
    setEditingProduct(p);
    setEditPrice(p.price);
    setEditOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setEditOfferTag(p.offerTag || '');
    setEditInStock(p.inStock !== false);
  }

  async function handleSaveEdit(e: FormEvent) {
    e.preventDefault();
    if (!editingProduct) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: Number(editPrice),
          originalPrice: editOriginalPrice ? Number(editOriginalPrice) : undefined,
          offerTag: editOfferTag.trim(),
          inStock: editInStock,
        }),
      });

      if (res.ok) {
        setEditingProduct(null);
        await fetchProducts();
        if (onProductsUpdated) onProductsUpdated();
      }
    } catch (err) {
      console.error('Failed to update product', err);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm('Are you sure you want to remove this product from the storefront?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchProducts();
        if (onProductsUpdated) onProductsUpdated();
      }
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  }

  async function handleAddProduct(e: FormEvent) {
    e.preventDefault();
    setIsAdding(true);
    setAddSuccess(false);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          category,
          brand: brand.trim(),
          price: Number(price),
          originalPrice: originalPrice ? Number(originalPrice) : undefined,
          unit: unit.trim(),
          offerTag: offerTag.trim(),
          badge: badge.trim(),
          image,
          description: description.trim(),
          inStock: true,
        }),
      });

      if (res.ok) {
        setAddSuccess(true);
        setName('');
        setPrice('');
        setOriginalPrice('');
        setOfferTag('');
        setDescription('');
        await fetchProducts();
        if (onProductsUpdated) onProductsUpdated();
        setTimeout(() => setActiveTab('products'), 1200);
      }
    } catch (err) {
      console.error('Failed to add product', err);
    } finally {
      setIsAdding(false);
    }
  }

  if (!isOpen) return null;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const activeOffersCount = products.filter((p) => p.offerTag && p.offerTag.trim().length > 0).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="glossy-modal w-full max-w-6xl rounded-3xl overflow-hidden flex flex-col max-h-[92vh] shadow-2xl">
        
        {/* Top Portal Header Bar in Premium Obsidian Glass */}
        <div className="bg-stone-900 text-white p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl golden-btn text-white flex items-center justify-center font-black shadow-md shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-base sm:text-xl tracking-tight uppercase text-white">
                  Sree Murugan Sons Admin Portal
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-400/40">
                  ● Live Sync
                </span>
              </div>
              <div className="text-xs text-amber-200/90 font-mono mt-0.5">
                Logged in as: <strong className="text-white">murugansons@gmail.com</strong> (Proprietor)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchProducts}
              className="glossy-btn p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-white/20"
              title="Refresh product list"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            <button
              onClick={onClose}
              className="glossy-btn px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-white/20"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">View Storefront</span>
            </button>

            <button
              onClick={onLogout}
              className="glossy-btn px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-700 text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer border border-red-400/30"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Portal Stats Bar in Glossy Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 bg-white/40 border-b border-white/60 text-xs backdrop-blur-xs">
          <div className="p-3.5 rounded-2xl glossy-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl glossy-amber text-[#EA580C] flex items-center justify-center shrink-0">
              <Package size={20} />
            </div>
            <div>
              <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Total Products</div>
              <div className="text-base font-black text-[#1A0800] font-mono">{products.length} Items</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl glossy-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl glossy-orange text-white flex items-center justify-center shrink-0">
              <Tag size={20} />
            </div>
            <div>
              <div className="text-[10px] text-[#9A3412] uppercase font-bold tracking-wider">Showcased Offers</div>
              <div className="text-base font-black text-[#C23608] font-mono">{activeOffersCount} Active</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl glossy-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-300">
              <Check size={20} />
            </div>
            <div>
              <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">In-Stock Status</div>
              <div className="text-base font-black text-emerald-700 font-mono">100% Available</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl glossy-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl glossy-pill text-[#EA580C] flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Store Location</div>
              <div className="text-xs font-bold text-[#1A0800]">Ettiyampatti, Harur</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 px-6 pt-3.5 border-b border-white/60 bg-white/20">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-[#EA580C] text-[#EA580C]'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <Layers size={16} />
            <span>Manage Products & Offers ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 px-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'add'
                ? 'border-[#EA580C] text-[#EA580C]'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <Plus size={16} />
            <span>Upload New Product</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'products' ? (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by product name, category, or brand..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="glossy-input w-full pl-10 pr-4 py-2 text-xs rounded-2xl"
                  />
                </div>
                <button
                  onClick={() => setActiveTab('add')}
                  className="glossy-btn px-4 py-2 rounded-2xl glossy-orange text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
                >
                  <Plus size={15} />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((p) => (
                  <div
                    key={p._id}
                    className="glossy-card rounded-3xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Card Top Image & Offer Tag */}
                      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        {p.offerTag && (
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg glossy-orange text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Tag size={10} />
                            {p.offerTag}
                          </div>
                        )}
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                          {p.category}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="p-4 space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#9A3412]">
                          {p.brand}
                        </div>
                        <h4 className="font-heading font-extrabold text-sm text-[#1A0800] leading-snug line-clamp-2">
                          {p.name}
                        </h4>

                        {/* Price Block */}
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="text-lg font-black text-[#C23608] font-mono">
                            ₹{p.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">/{p.unit}</span>
                          {p.originalPrice && (
                            <span className="text-xs text-gray-400 line-through font-mono">
                              ₹{p.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-3.5 bg-white/40 border-t border-white/60 flex items-center justify-between gap-2 backdrop-blur-xs">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                        p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {p.inStock ? '● In Stock' : 'Out of Stock'}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="glossy-btn px-3 py-1.5 rounded-xl bg-neutral-900 text-white hover:bg-black text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer border border-white/20"
                        >
                          <Edit3 size={13} />
                          <span>Edit Price / Offer</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Upload New Product Form */
            <div className="max-w-2xl mx-auto glossy-card p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-2xl glossy-amber text-[#EA580C] flex items-center justify-center font-bold">
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-[#1A0800]">
                    Upload New Product to Storefront
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Set live wholesale and retail pricing with showcase offer banners.
                  </p>
                </div>
              </div>

              {addSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 mb-4">
                  <Check size={16} />
                  <span>Product published successfully to storefront!</span>
                </div>
              )}

              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A0800] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Tiscon 550D TMT Rebars (10mm)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A0800] mb-1">
                      Product Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="glossy-input w-full px-3 py-2 text-xs rounded-2xl cursor-pointer"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A0800] mb-1">
                      Brand / Manufacturer
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UltraTech / Asian Paints / Bosch"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A0800] mb-1">
                      Live Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 580"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A0800] mb-1">
                      Original Price (₹) [For Discount]
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 640"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A0800] mb-1">
                      Unit of Measure
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. per bag / per kg"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A0800] mb-1">
                      Showcase Offer / Deal Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Festival Special 10% Off / Mill Direct Discount"
                      value={offerTag}
                      onChange={(e) => setOfferTag(e.target.value)}
                      className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A0800] mb-1">
                      Quality / Certification Badge
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ISI Certified / Factory Fresh"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A0800] mb-1">
                    Select 4K Product Showcase Image
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                    {PRESET_IMAGES.map((imgItem, idx) => (
                      <div
                        key={idx}
                        onClick={() => setImage(imgItem.url)}
                        className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all p-1 text-center bg-gray-50 ${
                          image === imgItem.url ? 'border-[#EA580C] ring-2 ring-[#EA580C]/20' : 'border-gray-200'
                        }`}
                      >
                        <img src={imgItem.url} alt={imgItem.label} className="w-full h-12 object-cover rounded-xl mb-1" />
                        <span className="text-[10px] font-bold text-gray-700 block truncate">{imgItem.label}</span>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Or enter custom image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="glossy-input w-full px-3 py-1.5 text-xs rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A0800] mb-1">
                    Product Description & Specifications
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Detailed specifications, mill warranty, and delivery information..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAdding}
                  className="glossy-btn w-full py-3.5 rounded-2xl glossy-orange text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Plus size={16} />
                  <span>{isAdding ? 'Publishing Product...' : 'Publish Product to Storefront'}</span>
                </button>
              </form>
            </div>
          )}
        </div>

      </div>

      {/* Inline Price & Offer Edit Modal in Glossy Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glossy-modal max-w-md w-full rounded-3xl p-6 relative shadow-2xl">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full glossy-pill text-gray-500 hover:text-black cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-2xl glossy-amber text-[#EA580C] shadow-xs">
                <DollarSign size={20} />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-base text-[#1A0800]">
                  Edit Price & Showcase Offer
                </h4>
                <p className="text-[11px] text-gray-500 truncate max-w-xs">{editingProduct.name}</p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A0800] mb-1">
                  Live Selling Price (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-xs">₹</span>
                  <input
                    type="number"
                    required
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="glossy-input w-full pl-8 pr-3 py-2 text-xs rounded-2xl font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A0800] mb-1">
                  Original Price (₹) [Strikethrough / MRP]
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-xs">₹</span>
                  <input
                    type="number"
                    placeholder="Optional"
                    value={editOriginalPrice}
                    onChange={(e) => setEditOriginalPrice(e.target.value)}
                    className="glossy-input w-full pl-8 pr-3 py-2 text-xs rounded-2xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A0800] mb-1">
                  Showcase Offer Tag / Discount Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15% OFF / Diwali Offer / Free Delivery"
                  value={editOfferTag}
                  onChange={(e) => setEditOfferTag(e.target.value)}
                  className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={editInStock}
                  onChange={(e) => setEditInStock(e.target.checked)}
                  className="accent-[#EA580C] cursor-pointer"
                />
                <label htmlFor="inStockCheck" className="text-xs font-bold text-[#1A0800] cursor-pointer">
                  Product is In-Stock and Ready for Delivery
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="glossy-btn px-4 py-2 rounded-2xl glossy-pill text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="glossy-btn px-5 py-2 rounded-2xl glossy-orange text-white text-xs font-black shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Updating...' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
