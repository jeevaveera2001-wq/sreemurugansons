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
  // Paints & Finishes
  { id: 'asian-paints', name: 'Asian Paints', logo: '/images/brands/asian-paints.png', category: 'Paints & Finishes' },
  { id: 'birla-opus', name: 'Birla Opus', logo: '/images/brands/birla-opus.png', category: 'Paints & Finishes' },
  { id: 'indicus', name: 'Indicus', logo: '/images/brands/indicus.png', category: 'Paints & Finishes' },
  { id: 'sms-primer', name: 'SMS Primer', logo: '/images/brands/sms-primer.png', category: 'Paints & Finishes' },
  { id: 'alayam', name: 'Alayam', logo: '/images/brands/alayam.png', category: 'Paints & Finishes' },
  { id: 'venlac-paints', name: 'Venlac Paints', logo: '/images/brands/venlac-paints.png', category: 'Paints & Finishes' },

  // Steel, TMT & Wires
  { id: 'aiswaryam-tmt', name: 'Aiswaryam 550D TMT', logo: '/images/brands/aiswaryam-tmt.png', category: 'Steel & TMT' },
  { id: 'padmashri', name: 'Padmashri', logo: '/images/brands/padmashri.png', category: 'Steel & TMT' },
  { id: 'vetri-gold', name: 'Vetri Gold', logo: '/images/brands/vetri-gold.png', category: 'Steel & TMT' },
  { id: 'jsw-steel', name: 'JSW Steel', logo: '/images/brands/jsw-steel.png', category: 'Steel & TMT' },
  { id: 'tata-wiron', name: 'Tata Wiron', logo: '/images/brands/tata-wiron-logo.png', category: 'Steel & TMT' },
  { id: 'meenakshi-tmt', name: 'Meenakshi TMT', logo: '/images/brands/meenakshi-tmt.png', category: 'Steel & TMT' },
  { id: 'tata-wiron-fence', name: 'Tata Wiron Aayush', logo: '/images/brands/tata-wiron.png', category: 'Steel & TMT' },

  // Cement
  { id: 'ultratech-cement', name: 'UltraTech Cement', logo: '/images/brands/ultratech-cement.png', category: 'Cement' },
  { id: 'chettinad-cement', name: 'Chettinad Cement', logo: '/images/brands/chettinad-cement.png', category: 'Cement' },
  { id: 'ramco-cement', name: 'Ramco Supergrade Cement', logo: '/images/brands/ramco-cement.png', category: 'Cement' },
  { id: 'valimai-cement', name: 'Valimai Cement', logo: '/images/brands/valimai-cement.png', category: 'Cement' },

  // Roofing & Cladding
  { id: 'durashine', name: 'Durashine (Tata BlueScope)', logo: '/images/brands/durashine.png', category: 'Roofing & Cladding' },
  { id: 'everest', name: 'Everest', logo: '/images/brands/everest.png', category: 'Roofing & Cladding' },
  { id: 'everest-evercool', name: 'Everest Evercool', logo: '/images/brands/everest-evercool.png', category: 'Roofing & Cladding' },
  { id: 'jsw-colouron', name: 'JSW Colouron+', logo: '/images/brands/jsw-colouron.png', category: 'Roofing & Cladding' },
  { id: 'ridge', name: 'Ridge', logo: '/images/brands/ridge.png', category: 'Roofing & Cladding' },

  // Pipes & Sanitary
  { id: 'san-mart', name: 'SM San Mart', logo: '/images/brands/san-mart.png', category: 'Pipes & Sanitary' },
  { id: 'supreme-pipes', name: 'Supreme Piping Solution', logo: '/images/brands/supreme-pipes.png', category: 'Pipes & Sanitary' },
  { id: 'texmo', name: 'Texmo Pumps', logo: '/images/brands/texmo.png', category: 'Pipes & Sanitary' },
  { id: 'avonplast', name: 'Avonplast', logo: '/images/brands/avonplast.png', category: 'Pipes & Sanitary' },
  { id: 'aquatech', name: 'Aqua Tech', logo: '/images/brands/aquatech.png', category: 'Pipes & Sanitary' },

  // Electricals & Appliances
  { id: 'v-guard', name: 'V-Guard', logo: '/images/brands/v-guard.png', category: 'Electricals & Appliances' },
  { id: 'orient-electric', name: 'Orient Electric', logo: '/images/brands/orient-electric.png', category: 'Electricals & Appliances' },
  { id: 'kundan-cable', name: 'Kundan Cable', logo: '/images/brands/kundan-cable.png', category: 'Electricals & Appliances' },
  { id: 'finolex', name: 'Finolex Cables', logo: '/images/brands/finolex.png', category: 'Electricals & Appliances' },
  { id: 'ipl-cables', name: 'IPL Indias Power Line', logo: '/images/brands/ipl-cables.png', category: 'Electricals & Appliances' },
  { id: 'venus-heaters', name: 'Venus Water Heaters', logo: '/images/brands/venus-heaters.png', category: 'Electricals & Appliances' },
  { id: 'barch-led', name: 'Barch LED Lights', logo: '/images/brands/barch-led.png', category: 'Electricals & Appliances' },
  { id: 'panasonic', name: 'Panasonic', logo: '/images/brands/panasonic.png', category: 'Electricals & Appliances' },
  { id: 'hi-fi-electric', name: 'Hi-Fi Electric', logo: '/images/brands/hi-fi-electric.png', category: 'Electricals & Appliances' },
];

const CATEGORIES = [
  'All',
  'Cement',
  'Steel & TMT',
  'Roofing & Cladding',
  'Paints & Finishes',
  'Pipes & Sanitary',
  'Electricals & Appliances',
];

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

      {/* Section Heading & Click-to-View Trigger */}
      <Scroll3D direction="up" delay={0.05}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-9 text-center relative z-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full glossy-pill text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D97706] mb-2 sm:mb-2.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span>Authorized Network • 36 Brands</span>
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
              <span>Click to explore all 36 dealerships with logos</span>
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
