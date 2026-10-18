import { useState, useEffect } from 'react';
import { 
  Tag, MessageSquare, ArrowUpRight, Search, 
  Edit3, ShieldCheck, PackageCheck
} from 'lucide-react';
import Scroll3D, { TiltCard3D } from './Scroll3D';
import type { ProductItem } from './AdminDashboard';

interface CategoriesProps {
  onSelectProduct?: (productName: string) => void;
  isAdmin?: boolean;
  onOpenAdminDashboard?: () => void;
}

const CATEGORIES = [
  'All',
  'TMT Steel',
  'Cement',
  'Paints',
  'Hardware',
  'Roofing',
  'Electricals',
  'Slab & Sanitary',
  'Agro',
];

export default function Categories({ onSelectProduct, isAdmin, onOpenAdminDashboard }: CategoriesProps) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyOffers, setOnlyOffers] = useState(false);

  useEffect(() => {
    fetchProducts();
    const handleUpdate = () => fetchProducts();
    window.addEventListener('murugan_products_updated', handleUpdate);
    return () => window.removeEventListener('murugan_products_updated', handleUpdate);
  }, []);

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

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchOffer = onlyOffers ? Boolean(p.offerTag && p.offerTag.trim().length > 0) : true;
    return matchCategory && matchSearch && matchOffer;
  });

  const offerCount = products.filter((p) => p.offerTag && p.offerTag.trim().length > 0).length;

  return (
    <section id="categories" className="py-16 sm:py-24 relative overflow-hidden border-b border-white/60 scroll-mt-20">
      
      {/* Background Refraction Glows */}
      <div className="ambient-glow-orange w-[550px] h-[550px] top-20 -right-28 opacity-25" />
      <div className="ambient-glow-amber w-[600px] h-[600px] bottom-10 -left-28 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glossy-pill text-xs font-bold uppercase tracking-wider text-[#D97706] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              Live Wholesale Inventory & Offers
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-[#2E1B0E] tracking-tight">
              Explore Products & Special Offers
            </h2>
            <p className="text-xs sm:text-sm text-[#5C3D2E] max-w-xl font-medium leading-relaxed mt-2">
              Direct factory pricing managed live by Sree Murugan Sons. Browse authentic structural steel, cements, paints, electricals, and agro equipment.
            </p>
          </div>

          {/* Admin Control Pill / Status */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isAdmin ? (
              <button
                onClick={onOpenAdminDashboard}
                className="golden-btn px-4 sm:px-5 py-2.5 rounded-2xl text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <ShieldCheck size={16} />
                <span>Admin Dashboard</span>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-2 text-xs text-[#92400E] glossy-pill px-4 py-2 rounded-2xl">
                <PackageCheck size={16} className="text-[#D97706]" />
                <span className="font-bold">Direct Dealer Invoicing & Site Delivery</span>
              </div>
            )}
          </div>
        </div>

        {/* Glossy Filter Bar & Controls */}
        <div className="glossy-card p-4 sm:p-5 rounded-3xl mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'golden-btn text-white shadow-md'
                        : 'glossy-pill text-[#2E1B0E] hover:bg-white hover:text-[#D97706]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Right Tools: Search & Only Offers Toggle (Stacked on mobile, row on tablet/desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
              <div className="relative flex-1 w-full sm:w-64">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-700/60" />
                <input
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glossy-input w-full pl-9 pr-3.5 py-2 text-xs rounded-2xl"
                />
              </div>

              <button
                onClick={() => setOnlyOffers(!onlyOffers)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                  onlyOffers
                    ? 'golden-btn text-white shadow-md'
                    : 'golden-tag text-[#92400E] hover:bg-amber-100/80'
                }`}
              >
                <Tag size={13} />
                <span>Offers Only</span>
                <span className="px-2 py-0.5 bg-white/40 rounded-full text-[10px] font-mono">
                  {offerCount}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-[#EA580C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-semibold text-neutral-500">Loading catalog from Sree Murugan Sons inventory...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center glossy-card rounded-3xl p-8 sm:p-12 max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl glossy-amber text-[#EA580C] flex items-center justify-center mx-auto shadow-xs">
              <PackageCheck size={28} />
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-black text-[#1A0800]">
              Store Inventory (Updated by Admin)
            </h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
              All fake demo products have been removed. This catalog strictly showcases live products and promotional offers uploaded by the store admin.
            </p>
            {isAdmin ? (
              <button
                onClick={onOpenAdminDashboard}
                className="golden-btn px-6 py-2.5 rounded-2xl text-white text-xs font-bold cursor-pointer inline-flex items-center gap-2"
              >
                <ShieldCheck size={16} />
                <span>Upload First Product in Admin</span>
              </button>
            ) : (
              <a
                href="tel:+919488331932"
                className="golden-btn px-5 py-2.5 rounded-2xl text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Contact Store Desk for Materials</span>
              </a>
            )}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center glossy-card rounded-3xl p-8 max-w-xl mx-auto">
            <p className="text-base font-bold text-[#1A0800] mb-2">No matching products found</p>
            <p className="text-xs text-neutral-600 max-w-md mx-auto mb-5">
              Try adjusting your category filter, clearing your search, or contacting our store team directly for unlisted materials.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setOnlyOffers(false); }}
              className="glossy-btn px-5 py-2.5 rounded-2xl glossy-orange text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 perspective-container">
            {filteredProducts.map((p, idx) => {
              const discountPercent = p.originalPrice && p.originalPrice > p.price
                ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                : null;

              return (
                <Scroll3D key={p._id} direction="up" delay={(idx % 4) * 0.1} intensity={0.85}>
                  <TiltCard3D
                    maxTilt={7}
                    className="glossy-card rounded-3xl overflow-hidden flex flex-col justify-between group relative hover:shadow-[0_22px_45px_rgba(217,119,6,0.22)] transition-all h-full"
                  >
                    {/* Top Image & Badges */}
                    <div>
                      <div className="relative h-48 w-full bg-amber-50/40 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                        {/* Offer Tag Badge (Showcased by Admin) in Glowing Golden Amber */}
                        {p.offerTag && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="px-3 py-1 rounded-xl golden-btn text-white font-black text-[10px] sm:text-xs shadow-md uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                              <Tag size={12} />
                              {p.offerTag}
                            </span>
                          </div>
                        )}

                        {/* Brand Pill overlay at bottom of image */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                          <span className="px-2.5 py-0.5 rounded-lg golden-tag text-[#92400E] font-extrabold text-[11px] shadow-xs">
                            {p.brand}
                          </span>
                          <span className="text-[11px] text-amber-100 font-medium bg-black/60 px-2.5 py-0.5 rounded-lg backdrop-blur-md border border-white/10">
                            {p.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 sm:p-6">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-[#2E1B0E] leading-snug mb-1.5 group-hover:text-[#D97706] transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-xs text-[#5C3D2E] line-clamp-2 leading-relaxed mb-4">
                          {p.description}
                        </p>

                        {/* Live Price Block in Golden Cream Pod */}
                        <div className="p-3.5 rounded-2xl golden-tag mb-3">
                          <div className="text-[10px] uppercase font-extrabold text-[#92400E] tracking-wider mb-1">
                            Live Wholesale Price
                          </div>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-heading text-xl sm:text-2xl font-black text-[#B45309] drop-shadow-2xs">
                              ₹{p.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs font-bold text-[#5C3D2E]">
                              /{p.unit}
                            </span>
                            
                            {p.originalPrice && p.originalPrice > p.price && (
                              <span className="text-xs text-stone-400 line-through font-mono">
                                ₹{p.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}

                            {discountPercent && (
                              <span className="text-[11px] font-extrabold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-md border border-amber-400">
                                {discountPercent}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions with Golden Amber Buttons */}
                    <div className="p-5 sm:p-6 pt-0 space-y-2.5">
                      <button
                        onClick={() => onSelectProduct && onSelectProduct(p.name)}
                        className="golden-btn w-full py-2.5 rounded-2xl text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Request Bulk Quote</span>
                        <ArrowUpRight size={15} />
                      </button>

                      {/* Direct WhatsApp Price Inquire in Glass Button */}
                      <a
                        href={`https://wa.me/919488331932?text=${encodeURIComponent(`Hello Sree Murugan Sons, I would like to inquire about current price and delivery for: ${p.name} (Offer Price: ₹${p.price}/${p.unit})`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glossy-btn w-full py-2 rounded-2xl glossy-pill hover:bg-white text-[#2E1B0E] font-bold text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={14} className="text-emerald-600" />
                        <span>Inquire on WhatsApp</span>
                      </a>

                      {/* Admin Quick Edit Button */}
                      {isAdmin && (
                        <button
                          onClick={onOpenAdminDashboard}
                          className="glossy-btn w-full py-1.5 rounded-xl bg-stone-900 hover:bg-black text-amber-300 font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors border border-amber-400/30"
                        >
                          <Edit3 size={13} />
                          <span>Edit Price & Offer in Admin</span>
                        </button>
                      )}
                    </div>

                  </TiltCard3D>
                </Scroll3D>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
