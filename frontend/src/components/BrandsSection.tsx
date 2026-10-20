import { useState, useMemo } from 'react';
import { X, Search, Grid, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import Scroll3D from './Scroll3D';

interface BrandLogo {
  id: string;
  name: string;
  logo: string;
  category: string;
}

const BRAND_LOGOS: BrandLogo[] = [
  // Division 01: Paints & Paints Essentials (9)
  { id: 'paint-asian', name: 'Asian', logo: '/images/brands/asian-paints.png', category: 'Paints & Paints Essentials' },
  { id: 'paint-indigo', name: 'Indigo', logo: '/images/brands/indicus.png', category: 'Paints & Paints Essentials' },
  { id: 'paint-birla-opus', name: 'Birla Opus', logo: '/images/brands/birla-opus.png', category: 'Paints & Paints Essentials' },
  { id: 'paint-padmashri', name: 'Padmashri Brush', logo: '/images/brands/padmashri.png', category: 'Paints & Paints Essentials' },
  { id: 'paint-vetri-gold', name: 'Vetri Gold', logo: '/images/brands/vetri-gold.png', category: 'Paints & Paints Essentials' },
  { id: 'paint-lg-alayam', name: 'LG Alayam', logo: '/images/brands/alayam.png', category: 'Paints & Paints Essentials' },
  { id: 'paint-sms-primers', name: 'SMS Primers', logo: '/images/brands/sms-primer.png', category: 'Paints & Paints Essentials' },
  { id: 'paint-vellac', name: 'Vellac', logo: '/images/brands/venlac-paints.png', category: 'Paints & Paints Essentials' },

  // Division 02: Steel & Pipes (6)
  { id: 'steel-structural', name: 'Steel', logo: '/images/brands/jsw-steel.png', category: 'Steel & Pipes' },
  { id: 'steel-aishwariyam', name: 'Aishwariyam', logo: '/images/brands/aiswaryam-tmt.png', category: 'Steel & Pipes' },
  { id: 'steel-jsw', name: 'JSW', logo: '/images/brands/jsw-steel.png', category: 'Steel & Pipes' },
  { id: 'steel-tata-chainlink', name: 'TATA Chain Link', logo: '/images/brands/tata-wiron.png', category: 'Steel & Pipes' },
  { id: 'steel-meenakshi', name: 'Meenakshi', logo: '/images/brands/meenakshi-tmt.png', category: 'Steel & Pipes' },

  // Division 03: Cements & Hardwares (7)
  { id: 'cement-ultratech', name: 'Ultratech', logo: '/images/brands/ultratech-cement.png', category: 'Cements & Hardwares' },
  { id: 'cement-chettinad', name: 'Chettinad', logo: '/images/brands/chettinad-cement.png', category: 'Cements & Hardwares' },
  { id: 'cement-ramco', name: 'Ramco', logo: '/images/brands/ramco-cement.png', category: 'Cements & Hardwares' },
  { id: 'cement-jsw', name: 'JSW', logo: '/images/brands/jsw-steel.png', category: 'Cements & Hardwares' },
  { id: 'cement-valimai', name: 'Valimai', logo: '/images/brands/valimai-cement.png', category: 'Cements & Hardwares' },
  { id: 'cement-ultratech-oil', name: 'Ultratech Oil', logo: '/images/brands/ultratech-cement.png', category: 'Cements & Hardwares' },
  { id: 'cement-ultratech-pack', name: 'Ultratech Pack Cement', logo: '/images/brands/ultratech-cement.png', category: 'Cements & Hardwares' },

  // Division 04: Electricals & Pipes (14)
  { id: 'pipe-supreme', name: 'Supreme Pipe', logo: '/images/brands/supreme-pipes.png', category: 'Electricals & Pipes' },
  { id: 'pipe-texmo', name: 'Texmo Pipe', logo: '/images/brands/texmo.png', category: 'Electricals & Pipes' },
  { id: 'pipe-aavin-plast', name: 'Aavin Plast Pipe', logo: '/images/brands/avonplast.png', category: 'Electricals & Pipes' },
  { id: 'pipe-aquatech', name: 'Aqua Tech Fittings', logo: '/images/brands/aquatech.png', category: 'Electricals & Pipes' },
  { id: 'elec-finolex-cable', name: 'Finolex Cable', logo: '/images/brands/finolex.png', category: 'Electricals & Pipes' },
  { id: 'elec-kundan-cable', name: 'Kundan Cable', logo: '/images/brands/kundan-cable.png', category: 'Electricals & Pipes' },
  { id: 'elec-ipl-cable', name: 'IPL Cable', logo: '/images/brands/ipl-cables.png', category: 'Electricals & Pipes' },
  { id: 'elec-vguard-motors', name: 'V. Guard Motors', logo: '/images/brands/v-guard.png', category: 'Electricals & Pipes' },
  { id: 'elec-v-fan', name: 'V. Fan', logo: '/images/brands/v-guard.png', category: 'Electricals & Pipes' },
  { id: 'elec-orient-fan', name: 'Orient Fan', logo: '/images/brands/orient-electric.png', category: 'Electricals & Pipes' },
  { id: 'elec-venus-heater', name: 'Venus Hot Water Heater', logo: '/images/brands/venus-heaters.png', category: 'Electricals & Pipes' },
  { id: 'elec-light-barch', name: 'Light Barch', logo: '/images/brands/barch-led.png', category: 'Electricals & Pipes' },
  { id: 'elec-panasonic-light', name: 'Panasonic Light', logo: '/images/brands/panasonic.png', category: 'Electricals & Pipes' },
  { id: 'elec-hifi-oil', name: 'Hi-Fi Oil', logo: '/images/brands/hi-fi-electric.png', category: 'Electricals & Pipes' },

  // Division 05: Cooling Sheets & Cement Sheets (5)
  { id: 'roof-everest-cement', name: 'Everest Cement Sheet', logo: '/images/brands/everest.png', category: 'Cooling Sheets & Cement Sheets' },
  { id: 'roof-everest-cool', name: 'Everest Cool Cement Sheet', logo: '/images/brands/everest-evercool.png', category: 'Cooling Sheets & Cement Sheets' },
  { id: 'roof-gs-sheet', name: 'G.S Sheet', logo: '/images/brands/durashine.png', category: 'Cooling Sheets & Cement Sheets' },
  { id: 'roof-color-sheet', name: 'Color Sheet – JSW, Tata Color Sheet', logo: '/images/brands/jsw-colouron.png', category: 'Cooling Sheets & Cement Sheets' },
  { id: 'roof-ridge-sheet', name: 'Ridge Sheet', logo: '/images/brands/ridge.png', category: 'Cooling Sheets & Cement Sheets' },

  // Division 06: Slab & Washbasin (2)
  { id: 'sanitary-sun-mart', name: 'Sun Mart', logo: '/images/brands/san-mart.png', category: 'Slab & Washbasin' },
  { id: 'custom-slabs-washbasins', name: 'Sree Murugan Custom Slabs & Washbasins', logo: '/images/sree-murugan-logo.png', category: 'Slab & Washbasin' },
];

const CATEGORIES = [
  'All',
  'Paints & Paints Essentials',
  'Steel & Pipes',
  'Cements & Hardwares',
  'Electricals & Pipes',
  'Cooling Sheets & Cement Sheets',
  'Slab & Washbasin',
];

const CATEGORY_COMPANIES: Record<string, string> = {
  'Paints & Paints Essentials': 'Sree Murugan Sons (Paints & Paints Essentials)',
  'Steel & Pipes': 'Sree Murugan Sons (Steel & Pipes)',
  'Cements & Hardwares': 'Sree Murugan Sons (Cements & Hardwares)',
  'Electricals & Pipes': 'Sree Murugan Sons (Electricals & Pipes)',
  'Cooling Sheets & Cement Sheets': 'Sree Murugan Sons (Cooling Sheets & Cement Sheets)',
  'Slab & Washbasin': 'Sree Murugan Sons (Slab & Washbasin)',
};

interface BrandsSectionProps {
  onOpenQuote?: (brandName?: string) => void;
}

export default function BrandsSection({ onOpenQuote }: BrandsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Duplicate array for seamless infinite horizontal loop (0% to -50% translation)
  const repeatedLogos = [
    ...BRAND_LOGOS,
    ...BRAND_LOGOS,
  ];

  // Filtered list for the All Dealerships modal
  const filteredBrands = useMemo(() => {
    return BRAND_LOGOS.filter((b) => {
      const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            b.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  function handleBrandSelect(brandName: string) {
    setIsModalOpen(false);
    if (onOpenQuote) {
      onOpenQuote(brandName);
    }
  }

  return (
    <section id="brands" className="py-12 sm:py-16 relative overflow-hidden border-b border-white/60 scroll-mt-20">
      
      {/* Background Refraction Glows */}
      <div className="ambient-glow-amber w-[450px] h-[450px] top-1/2 -left-24 opacity-25 float-3d-slow pointer-events-none" />
      <div className="ambient-glow-orange w-[450px] h-[450px] top-1/2 -right-24 opacity-25 float-3d-reverse pointer-events-none" />

      {/* DESKTOP VIEW (md+): Centered Heading + Infinite Horizontal Scrolling Marquee */}
      <div className="hidden md:block">
        <Scroll3D direction="up" delay={0.05}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-9 text-center relative z-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full glossy-pill text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D97706] mb-2 sm:mb-2.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
              <span>Authorized Network • {BRAND_LOGOS.length} Brands</span>
            </button>
            
            <h2 
              onClick={() => setIsModalOpen(true)}
              className="font-heading text-2xl xs:text-3xl sm:text-4xl font-black text-[#2E1B0E] tracking-tight cursor-pointer hover:text-[#D97706] transition-colors"
              title="Click to view all dealerships"
            >
              Our Dealing Partners
            </h2>

            {/* Action Trigger Pill: View All Dealerships */}
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-[#B45309] bg-amber-500/10 hover:bg-amber-500/20 border border-amber-300/40 hover:border-amber-400 shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Click to explore all {BRAND_LOGOS.length} dealerships with logos</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
              </button>
            </div>
          </div>
        </Scroll3D>

        {/* Infinite Horizontal Scrolling Track with Left & Right Vignette Masks */}
        <Scroll3D direction="up" delay={0.12}>
          <div 
            onClick={() => setIsModalOpen(true)}
            className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] cursor-pointer"
            title="Click section to see all dealerships"
          >
            <div className="animate-marquee-scroll flex items-center gap-10 sm:gap-16 py-3">
              {repeatedLogos.map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110 select-none cursor-pointer px-2"
                  title={`${brand.name} - Click to see all dealerships`}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 sm:h-20 w-auto max-w-[160px] sm:max-w-[230px] object-contain rounded-lg filter drop-shadow-[0_2px_8px_rgba(217,119,6,0.12)] hover:drop-shadow-[0_4px_14px_rgba(217,119,6,0.25)] transition-all"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </Scroll3D>
      </div>

      {/* MOBILE VIEW (< md): Right-Side Flush Vertical Marquee (Top to Bottom, Non-blocking Touch) */}
      <div className="md:hidden relative px-4 overflow-hidden">
        <Scroll3D direction="up" delay={0.08}>
          <div className="flex items-center justify-between gap-3 min-h-[360px] relative">
            
            {/* Left Column: Heading, Counter & Exploration Actions */}
            <div className="flex-1 pr-1.5 z-10 flex flex-col justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full glossy-pill text-[10px] font-extrabold uppercase tracking-wider text-[#D97706] mb-2.5 shadow-2xs cursor-pointer active:scale-95 transition-transform"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                <span>{BRAND_LOGOS.length} Authorized Brands</span>
              </button>

              <h2 
                onClick={() => setIsModalOpen(true)}
                className="font-heading text-2xl font-black text-[#2E1B0E] tracking-tight leading-tight cursor-pointer hover:text-[#D97706] transition-colors"
                title="Click to view all dealerships"
              >
                Our Dealing Partners
              </h2>

              <p className="text-xs text-[#78543E] mt-2 font-medium leading-relaxed">
                Authorized dealer & stockist for premier construction, steel, electricals, and finishing materials.
              </p>

              {/* Action Trigger Button */}
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white golden-btn shadow-md cursor-pointer active:scale-95 transition-all"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>View All {BRAND_LOGOS.length} Brands</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-[#A16207] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D97706]" />
                  <span>Tap any logo on the right for instant quote</span>
                </span>
              </div>
            </div>

            {/* Right Column: Flush-to-edge Vertical Track (Top to Bottom Scrolling) */}
            <div 
              className="w-28 xs:w-32 h-[360px] relative overflow-hidden shrink-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] select-none rounded-2xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-200/80 shadow-inner"
              style={{ touchAction: 'pan-y' }}
              title="Continuous live brand reel • Tap any brand to get quote"
            >
              {/* Vertical Marquee Scrolling Continuously From Top to Bottom */}
              <div 
                className="animate-marquee-vertical-down flex flex-col items-center gap-3 py-2"
                style={{ touchAction: 'pan-y' }}
              >
                {repeatedLogos.map((brand, idx) => (
                  <div
                    key={`mobile-v-${brand.id}-${idx}`}
                    onClick={() => handleBrandSelect(brand.name)}
                    className="w-24 xs:w-28 h-14 bg-white/95 rounded-xl border border-amber-200/80 p-1.5 flex items-center justify-center shadow-xs shrink-0 cursor-pointer active:scale-95 transition-transform"
                    title={`Get quote for ${brand.name}`}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-2xs"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Scroll3D>
      </div>

      {/* ALL DEALERSHIPS MODAL */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="glossy-modal rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl border border-white/90 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-amber-200/40 bg-gradient-to-r from-amber-500/10 via-white/80 to-amber-500/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-[#D97706] shadow-inner">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#2E1B0E] font-heading flex items-center gap-2">
                    Our Dealership Network
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-[#B45309] border border-amber-300/40">
                      {BRAND_LOGOS.length} Brands
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78543E]">
                    Authorized dealer & stockist for premier construction and home building materials
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="p-3 sm:p-5 border-b border-amber-100 bg-white/60 backdrop-blur-md shrink-0 space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-amber-700/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search brand (e.g. UltraTech, JSW, Tata, Asian Paints, Finolex)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl glossy-input border border-amber-200/80 focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/20 transition-all text-[#2E1B0E] placeholder:text-amber-900/40 shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-[#D97706] to-[#B45309] text-white shadow-sm scale-102'
                        : 'bg-white/80 hover:bg-amber-50 text-[#78543E] border border-amber-200/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Brands Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-gradient-to-b from-transparent to-amber-50/20">
              {filteredBrands.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">No brands found matching "{searchQuery}"</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="mt-2 text-xs font-bold text-[#D97706] hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
                  {filteredBrands.map((brand) => (
                    <div
                      key={brand.id}
                      onClick={() => handleBrandSelect(brand.name)}
                      className="group relative flex flex-col items-center justify-between p-3 sm:p-4 rounded-2xl bg-white/85 hover:bg-white border border-amber-200/60 hover:border-[#D97706]/60 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 select-none"
                    >
                      {/* Logo Box */}
                      <div className="h-16 sm:h-20 w-full flex items-center justify-center p-1">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-full max-w-full object-contain filter drop-shadow-xs group-hover:scale-108 transition-transform duration-200 rounded-md"
                          loading="lazy"
                        />
                      </div>

                      {/* Brand Info */}
                      <div className="w-full text-center mt-2.5 pt-2 border-t border-amber-100/70">
                        <h4 className="text-xs font-bold text-[#2E1B0E] group-hover:text-[#D97706] transition-colors truncate">
                          {brand.name}
                        </h4>
                        <span className="text-[10px] font-medium text-amber-700/70 block truncate">
                          {brand.category}
                        </span>
                        <span className="text-[9px] font-bold text-[#B45309] block truncate mt-0.5">
                          {CATEGORY_COMPANIES[brand.category]}
                        </span>
                      </div>

                      {/* Hover Action Badge */}
                      <div className="mt-2 text-[10px] font-bold text-[#D97706] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                        <span>Get Quote</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-amber-200/40 bg-amber-500/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#78543E] shrink-0">
              <div className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Showing {filteredBrands.length} of {BRAND_LOGOS.length} authorized dealerships</span>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  if (onOpenQuote) onOpenQuote();
                }}
                className="w-full sm:w-auto px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] text-white font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer text-center"
              >
                Request Quotation for Any Brand
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
