import { useState, useMemo } from 'react';
import { 
  ArrowRight, PhoneCall, X, Search, Sparkles, Building2, 
  ShieldCheck, Grid, Layers, Eye, Paintbrush, Zap, Home, Droplets
} from 'lucide-react';
import Scroll3D, { TiltCard3D } from './Scroll3D';

export interface CompanyBrand {
  id: string;
  name: string;
  logo: string;
  category: string;
  tagline: string;
  badge: string;
}

export interface CompanyCard {
  id: string;
  divisionNumber: string;
  name: string;
  subtitle: string;
  shortLabel: string;
  badge: string;
  description: string;
  image: string;
  category: string;
  iconName: 'paints' | 'steel' | 'cement' | 'electricals' | 'roofing' | 'sanitary';
  brands: CompanyBrand[];
}

const COMPANIES: CompanyCard[] = [
  {
    id: 'paints',
    divisionNumber: '01',
    name: 'Sree Murugan Sons',
    subtitle: 'Paints & Paints Essentials',
    shortLabel: 'Paints & Essentials',
    badge: 'Asian Paints Authorized Studio',
    description:
      'Computerized Asian Paints Colour World tinting studio, luxury interior emulsions, exterior weather-coats, primers, brushes, and complete waterproofing chemicals.',
    image: '/images/companies/paints-essentials-4k.jpg',
    category: 'Paints & Paints Essentials',
    iconName: 'paints',
    brands: [
      { id: 'paint-asian', name: 'Asian', logo: '/images/brands/asian-paints.png', category: 'Paints & Paints Essentials', tagline: 'Authorized Colour World Tinting Studio', badge: 'Apex Dealer' },
      { id: 'paint-indigo', name: 'Indigo', logo: '/images/brands/indicus.png', category: 'Paints & Paints Essentials', tagline: 'Interior, Exterior & Ceiling Finishes', badge: 'Authorized Stockist' },
      { id: 'paint-birla-opus', name: 'Birla Opus', logo: '/images/brands/birla-opus.png', category: 'Paints & Paints Essentials', tagline: 'Ultra-Luxury Wall Finishes & Emulsions', badge: 'Premium Range' },
      { id: 'paint-padmashri', name: 'Padmashri Brush', logo: '/images/brands/padmashri.png', category: 'Paints & Paints Essentials', tagline: 'Professional Painting Brushes & Rollers', badge: 'Painting Essentials' },
      { id: 'paint-vetri-gold', name: 'Vetri Gold', logo: '/images/brands/vetri-gold.png', category: 'Paints & Paints Essentials', tagline: 'High Quality Wall Putty & Base Finishes', badge: 'Gold Quality' },
      { id: 'paint-lg-alayam', name: 'LG Alayam', logo: '/images/brands/alayam.png', category: 'Paints & Paints Essentials', tagline: 'Traditional Natural Lime & Distempers', badge: 'Heritage Brand' },
      { id: 'paint-sms-primers', name: 'SMS Primers', logo: '/images/brands/sms-primer.png', category: 'Paints & Paints Essentials', tagline: 'Sree Murugan Sons Special Formula Sealers', badge: 'In-House Formula' },
      { id: 'paint-vellac', name: 'Vellac', logo: '/images/brands/venlac-paints.png', category: 'Paints & Paints Essentials', tagline: 'Synthetic Enamels & Wood Polyurethanes', badge: 'Authorized Partner' },
    ],
  },
  {
    id: 'steel',
    divisionNumber: '02',
    name: 'Sree Murugan Sons',
    subtitle: 'Steel & Pipes',
    shortLabel: 'Steel & Pipes',
    badge: 'Direct Mill Certified Rebars',
    description:
      'Tata Tiscon & JSW Neosteel Fe 550D TMT rebars, heavy-duty square & round hollow pipes, MS angles, channels, flats, and GI binding wire with weighbridge slips.',
    image: '/images/companies/steel-pipes-4k.jpg',
    category: 'Steel & Pipes',
    iconName: 'steel',
    brands: [
      { id: 'steel-structural', name: 'Steel', logo: '/images/brands/jsw-steel.png', category: 'Steel & Pipes', tagline: 'MS Angles, Channels, Beams & Hollow Pipes', badge: 'Direct Mill' },
      { id: 'steel-aishwariyam', name: 'Aishwariyam', logo: '/images/brands/aiswaryam-tmt.png', category: 'Steel & Pipes', tagline: 'Fe 550D High Tensile Primary Billet Rebars', badge: 'Certified TMT' },
      { id: 'steel-jsw', name: 'JSW', logo: '/images/brands/jsw-steel.png', category: 'Steel & Pipes', tagline: 'JSW Neosteel Fe 550D High Ductility TMT', badge: 'Primary Mill' },
      { id: 'steel-tata-chainlink', name: 'TATA Chain Link', logo: '/images/brands/tata-wiron.png', category: 'Steel & Pipes', tagline: 'Anti-Corrosion Security Fencing & Mesh', badge: 'Tata Wiron' },
      { id: 'steel-meenakshi', name: 'Meenakshi', logo: '/images/brands/meenakshi-tmt.png', category: 'Steel & Pipes', tagline: 'Earthquake Resistant Fe 550D TMT Rods', badge: 'High Ductility' },
    ],
  },
  {
    id: 'cement',
    divisionNumber: '03',
    name: 'Sree Murugan Sons',
    subtitle: 'Cements & Hardwares',
    shortLabel: 'Cements & Hardwares',
    badge: 'Fresh Mill Wholesale Depot',
    description:
      'Direct warehouse stock of UltraTech Super, Ramco Supercrete, and Dalmia DSP cements with fast lorry loading and direct site transport across Dharmapuri.',
    image: '/images/companies/cements-hardwares-4k.jpg',
    category: 'Cements & Hardwares',
    iconName: 'cement',
    brands: [
      { id: 'cement-ultratech', name: 'Ultratech', logo: '/images/brands/ultratech-cement.png', category: 'Cements & Hardwares', tagline: "India's No. 1 Cement, Super PPC & Weather Pro", badge: 'Direct Depot' },
      { id: 'cement-chettinad', name: 'Chettinad', logo: '/images/brands/chettinad-cement.png', category: 'Cements & Hardwares', tagline: 'Royal Pozzolana & Rapid Hardening High Strength', badge: 'Fresh Mill' },
      { id: 'cement-ramco', name: 'Ramco', logo: '/images/brands/ramco-cement.png', category: 'Cements & Hardwares', tagline: 'Supercrete High-Strength Foundation Cement', badge: 'Wholesale Depot' },
      { id: 'cement-jsw', name: 'JSW', logo: '/images/brands/jsw-steel.png', category: 'Cements & Hardwares', tagline: 'JSW Concreel HD Eco-Friendly Portland Cement', badge: 'Mill Direct' },
      { id: 'cement-valimai', name: 'Valimai', logo: '/images/brands/valimai-cement.png', category: 'Cements & Hardwares', tagline: 'Tamil Nadu State Apex Standard Quality Cement', badge: 'Official Dealer' },
      { id: 'cement-ultratech-oil', name: 'Ultratech Oil', logo: '/images/brands/ultratech-cement.png', category: 'Cements & Hardwares', tagline: 'UltraTech Seal & Dry Waterproofing Additive Oil', badge: 'Chemical Pro' },
      { id: 'cement-ultratech-pack', name: 'Ultratech Pack Cement', logo: '/images/brands/ultratech-cement.png', category: 'Cements & Hardwares', tagline: 'Fresh Factory 50kg Pack Sacks for High Load Slabs', badge: 'Factory Pack' },
    ],
  },
  {
    id: 'electricals',
    divisionNumber: '04',
    name: 'Sree Murugan Sons',
    subtitle: 'Electricals & Pipes',
    shortLabel: 'Electricals & Pipes',
    badge: 'ISI Certified Electricals & Pipes',
    description:
      'Supreme, Texmo, and Aavin Plast pipes, Aqua Tech fittings, Finolex & Kundan cables, IPL cables, V-Guard motors & fans, Venus water heaters, and Panasonic lights.',
    image: '/images/companies/electricals-4k.jpg',
    category: 'Electricals & Pipes',
    iconName: 'electricals',
    brands: [
      { id: 'pipe-supreme', name: 'Supreme Pipe', logo: '/images/brands/supreme-pipes.png', category: 'Electricals & Pipes', tagline: 'SWR, CPVC & UPVC High Pressure Drainage Pipes', badge: 'Authorized Depot' },
      { id: 'pipe-texmo', name: 'Texmo Pipe', logo: '/images/brands/texmo.png', category: 'Electricals & Pipes', tagline: 'Agricultural Submersible Pipes & Water Motors', badge: 'Direct Stockist' },
      { id: 'pipe-aavin-plast', name: 'Aavin Plast Pipe', logo: '/images/brands/avonplast.png', category: 'Electricals & Pipes', tagline: 'Premium CPVC & Plumbing Fitting Systems', badge: 'Certified Pipes' },
      { id: 'pipe-aquatech', name: 'Aqua Tech Fittings', logo: '/images/brands/aquatech.png', category: 'Electricals & Pipes', tagline: 'Heavy Duty Multi-Layer Water Tanks & Pipe Fittings', badge: 'Water Storage' },
      { id: 'elec-finolex-cable', name: 'Finolex Cable', logo: '/images/brands/finolex.png', category: 'Electricals & Pipes', tagline: 'Flame Retardant Low Smoke (FRLS) Cables', badge: 'Prime Channel' },
      { id: 'elec-kundan-cable', name: 'Kundan Cable', logo: '/images/brands/kundan-cable.png', category: 'Electricals & Pipes', tagline: 'Pure Copper Insulated Domestic & Industrial Wires', badge: 'Certified Cable' },
      { id: 'elec-ipl-cable', name: 'IPL Cable', logo: '/images/brands/ipl-cables.png', category: 'Electricals & Pipes', tagline: 'Heavy Underground Armoured Electrical Cables', badge: 'Heavy Line' },
      { id: 'elec-vguard-motors', name: 'V. Guard Motors', logo: '/images/brands/v-guard.png', category: 'Electricals & Pipes', tagline: 'Industrial & Domestic Submersible Pumps & Motors', badge: 'Official Partner' },
      { id: 'elec-v-fan', name: 'V. Fan', logo: '/images/brands/v-guard.png', category: 'Electricals & Pipes', tagline: 'High Velocity Aerodynamic Ceiling & Exhaust Fans', badge: 'Energy Efficient' },
      { id: 'elec-orient-fan', name: 'Orient Fan', logo: '/images/brands/orient-electric.png', category: 'Electricals & Pipes', tagline: 'Smart BLDC & Designer Ceiling Fans', badge: 'Authorized Hub' },
      { id: 'elec-venus-heater', name: 'Venus Hot Water Heater', logo: '/images/brands/venus-heaters.png', category: 'Electricals & Pipes', tagline: 'Instant & Storage High-Pressure Water Geysers', badge: 'Authorized Dealer' },
      { id: 'elec-light-barch', name: 'Light Barch', logo: '/images/brands/barch-led.png', category: 'Electricals & Pipes', tagline: 'Architectural Commercial & Decorative LED Lighting', badge: 'LED Studio' },
      { id: 'elec-panasonic-light', name: 'Panasonic Light', logo: '/images/brands/panasonic.png', category: 'Electricals & Pipes', tagline: 'Smart LED Panels, Modular Switches & Breakers', badge: 'Premium Range' },
      { id: 'elec-hifi-oil', name: 'Hi-Fi Oil', logo: '/images/brands/hi-fi-electric.png', category: 'Electricals & Pipes', tagline: 'Electrical Transformer Oil, Switches & Conduits', badge: 'Safety Systems' },
    ],
  },
  {
    id: 'roofing',
    divisionNumber: '05',
    name: 'Sree Murugan Sons',
    subtitle: 'Cooling Sheets & Cement Sheets',
    shortLabel: 'Cooling & Cement Sheets',
    badge: 'High-Durability Roofing',
    description:
      'Heavy-duty corrugated cement roofing sheets, thermal cooling sheets for temperature reduction, and industrial shed roofing supplies.',
    image: '/images/companies/cooling-sheets-4k.jpg',
    category: 'Cooling Sheets & Cement Sheets',
    iconName: 'roofing',
    brands: [
      { id: 'roof-everest-cement', name: 'Everest Cement Sheet', logo: '/images/brands/everest.png', category: 'Cooling Sheets & Cement Sheets', tagline: 'Corrugated Heavy Duty Fibre Cement Roofing', badge: 'Industrial Grade' },
      { id: 'roof-everest-cool', name: 'Everest Cool Cement Sheet', logo: '/images/brands/everest-evercool.png', category: 'Cooling Sheets & Cement Sheets', tagline: 'Solar Heat Reflective Thermal Cooling Sheets', badge: 'Thermal Shield' },
      { id: 'roof-gs-sheet', name: 'G.S Sheet', logo: '/images/brands/durashine.png', category: 'Cooling Sheets & Cement Sheets', tagline: 'Galvanized Corrugated Steel Roofing Sheets', badge: 'All Weather' },
      { id: 'roof-color-sheet', name: 'Color Sheet – JSW, Tata Color Sheet', logo: '/images/brands/jsw-colouron.png', category: 'Cooling Sheets & Cement Sheets', tagline: 'Tata Durashine & JSW Colouron+ Coated Sheets', badge: 'Premium Roofing' },
      { id: 'roof-ridge-sheet', name: 'Ridge Sheet', logo: '/images/brands/ridge.png', category: 'Cooling Sheets & Cement Sheets', tagline: 'Precision Roofing Ridges, Gutters & Flashing', badge: 'Precision Fit' },
    ],
  },
  {
    id: 'sanitary',
    divisionNumber: '06',
    name: 'Sree Murugan Sons',
    subtitle: 'Slab & Washbasin',
    shortLabel: 'Slab & Washbasin',
    badge: 'Granite & Sanitary Studio',
    description:
      'Exclusive designer ceramic table-top washbasins from Sun Mart, plus our own in-house custom-cut granite kitchen slabs, quartz counters, and bespoke washbasins crafted to your exact size.',
    image: '/images/companies/slab-washbasin-4k.jpg',
    category: 'Slab & Washbasin',
    iconName: 'sanitary',
    brands: [
      { id: 'sanitary-sun-mart', name: 'Sun Mart', logo: '/images/brands/san-mart.png', category: 'Slab & Washbasin', tagline: 'Designer Ceramic Table-Top Washbasins & Sinks', badge: 'Exclusive Studio' },
      { id: 'custom-slabs-washbasins', name: 'Sree Murugan Custom Slabs & Washbasins', logo: '/images/sree-murugan-logo.png', category: 'Slab & Washbasin', tagline: "Our Own Product — We do custom customer slabs and washbasins crafted to your exact measurements and design.", badge: 'Our Own Product' },
    ],
  },
];

interface GroupOfCompaniesProps {
  onOpenQuote: (brandName?: string) => void;
}

export default function GroupOfCompanies({ onOpenQuote }: GroupOfCompaniesProps) {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('paints');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeCompany = useMemo(() => {
    return COMPANIES.find((c) => c.id === selectedCompanyId) || COMPANIES[0];
  }, [selectedCompanyId]);

  const modalBrands = useMemo(() => {
    if (!searchQuery.trim()) return activeCompany.brands;
    const query = searchQuery.toLowerCase();
    return activeCompany.brands.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.tagline.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query)
    );
  }, [activeCompany, searchQuery]);

  const handleCompanyClick = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setSearchQuery('');
    setIsModalOpen(true);
  };

  const handleBrandSelect = (brandName: string) => {
    setIsModalOpen(false);
    onOpenQuote(brandName);
  };

  const renderDivisionIcon = (iconName: CompanyCard['iconName'], className: string) => {
    switch (iconName) {
      case 'paints':
        return <Paintbrush className={className} />;
      case 'steel':
        return <Layers className={className} />;
      case 'cement':
        return <Building2 className={className} />;
      case 'electricals':
        return <Zap className={className} />;
      case 'roofing':
        return <Home className={className} />;
      case 'sanitary':
        return <Droplets className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  return (
    <section id="group-of-companies" className="py-16 sm:py-24 relative overflow-hidden border-b border-white/60 scroll-mt-20">
      
      {/* Ambient Glows for Refraction with 3D Float */}
      <div className="ambient-glow-amber w-[500px] h-[500px] top-10 -left-20 opacity-30 float-3d-slow pointer-events-none" />
      <div className="ambient-glow-orange w-[500px] h-[500px] bottom-10 -right-20 opacity-30 float-3d-reverse pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Slide In */}
        <Scroll3D direction="up" delay={0.05}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-5">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glossy-pill text-xs font-bold uppercase tracking-wider text-[#D97706] mb-3 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                Corporate Portfolio • Click Any Company to Explore Brands
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-[#2E1B0E] tracking-tight">
                Sree Murugan Sons Group of Companies
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5C3D2E] max-w-lg font-medium leading-relaxed">
              Six specialized divisions under the trusted Sree Murugan Sons banner. Click on any company card below to view its authorized partner brands and dealerships.
            </p>
          </div>
        </Scroll3D>

        {/* 3 by 2 Responsive 3D Tilt Grid (Restores All 6 Companies) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-container mb-12">
          {COMPANIES.map((comp, idx) => {
            const isSelected = selectedCompanyId === comp.id;
            return (
              <Scroll3D key={comp.id} direction="up" delay={(idx % 3) * 0.12} intensity={0.9}>
                <TiltCard3D
                  onClick={() => handleCompanyClick(comp.id)}
                  maxTilt={8}
                  className={`glossy-card rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 h-full ${
                    isSelected ? 'ring-2 ring-[#D97706] shadow-[0_20px_45px_rgba(217,119,6,0.28)]' : 'hover:shadow-[0_24px_50px_rgba(217,119,6,0.22)]'
                  }`}
                >
                  <div>
                    {/* 4K Enhanced Image Container with Frosted Bezel */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-amber-50/40">
                      <img
                        src={comp.image}
                        alt={`${comp.name} (${comp.subtitle})`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/store-hero-W47zwWIs.jpg';
                        }}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-75 group-hover:opacity-55 transition-opacity" />

                      {/* Top-left Frosted Badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md text-amber-200 text-[10px] sm:text-xs font-bold tracking-wider uppercase border border-amber-400/40 shadow-sm flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-[#F59E0B]" />
                        {comp.badge}
                      </span>

                      {/* Top-right Brands Count Pill */}
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-amber-500/90 text-white text-[10px] sm:text-xs font-extrabold tracking-wide uppercase shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-100" />
                        {comp.brands.length} Brands
                      </span>

                      {/* Floating Category Tag inside image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-amber-300 font-semibold text-[10px] border border-white/10">
                          {renderDivisionIcon(comp.iconName, 'w-3 h-3 text-amber-400')}
                          {comp.category}
                        </span>
                        <span className="text-[10px] font-bold text-amber-200/90 bg-amber-950/60 backdrop-blur-md px-1.5 py-0.5 rounded-md">
                          Explore Brands →
                        </span>
                      </div>
                    </div>

                    {/* Card Text Content */}
                    <div className="p-5 sm:p-6 pb-3">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg golden-tag text-[10px] font-extrabold uppercase tracking-wider">
                          Division {comp.divisionNumber}
                        </div>
                        <span className="text-[11px] font-bold text-[#D97706] group-hover:translate-x-0.5 transition-transform">
                          {comp.brands.length} Brands ↗
                        </span>
                      </div>

                      <h3 className="font-heading text-lg sm:text-2xl font-extrabold text-[#2E1B0E] tracking-tight group-hover:text-[#D97706] transition-colors leading-snug">
                        {comp.name}{' '}
                        <span className="text-[#B45309]">({comp.subtitle})</span>
                      </h3>

                      <p className="text-xs sm:text-[13px] text-[#5C3D2E] mt-2 leading-relaxed font-normal">
                        {comp.description}
                      </p>

                      {/* Brand Preview Chips Strip */}
                      <div className="mt-4 pt-3 border-t border-amber-200/60">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800/80 mb-2 flex items-center justify-between">
                          <span>Key Authorized Brands</span>
                          <span className="text-[#D97706] font-bold">{comp.brands.length} Partners</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {comp.brands.slice(0, 3).map((brand) => (
                            <span 
                              key={brand.id}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-[#78543E] text-[10px] font-semibold border border-amber-200/70"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#D97706]" />
                              {brand.name}
                            </span>
                          ))}
                          {comp.brands.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500/15 text-[#B45309] text-[10px] font-bold border border-amber-300/60">
                              +{comp.brands.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action: Primary Button triggers Brand Showcase */}
                  <div className="p-5 sm:p-6 pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompanyClick(comp.id);
                      }}
                      className="golden-btn w-full py-3 px-4 rounded-xl flex items-center justify-between text-xs font-bold text-white shadow-md cursor-pointer group-hover:scale-[1.01] transition-transform active:scale-98"
                    >
                      <span className="flex items-center gap-2 font-extrabold tracking-wide">
                        <Grid size={15} className="text-white" />
                        <span>View {comp.brands.length} Authorized Brands</span>
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-white/25 flex items-center justify-center text-white">
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  </div>

                </TiltCard3D>
              </Scroll3D>
            );
          })}
        </div>

        {/* IN-SECTION ACTIVE DIVISION BRANDS DRAWER */}
        <Scroll3D direction="up" delay={0.2}>
          <div className="glossy-card rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl relative overflow-hidden bg-gradient-to-br from-white/95 via-amber-50/40 to-white/90">
            {/* Header with Switcher Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-amber-200/50">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg golden-tag text-[10px] font-extrabold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3 text-[#D97706]" />
                  Division Brands Explorer
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#2E1B0E] font-heading flex items-center gap-2">
                  <span>Brands under {activeCompany.name}</span>
                  <span className="text-[#B45309]">({activeCompany.subtitle})</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#78543E] mt-1">
                  Click any division below to view its specific brands, or click any brand card for instant direct quotation.
                </p>
              </div>

              {/* Action: Open Full Modal */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#B45309] bg-amber-500/15 hover:bg-amber-500/25 border border-amber-300/60 shadow-2xs transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Open Fullscreen ({activeCompany.brands.length} Brands)</span>
                </button>
                <button
                  onClick={() => onOpenQuote(activeCompany.subtitle)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white golden-btn shadow-xs cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Division Quote</span>
                </button>
              </div>
            </div>

            {/* Quick 6-Division Tab Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none border-b border-amber-100">
              {COMPANIES.map((comp) => {
                const isActive = comp.id === selectedCompanyId;
                return (
                  <button
                    key={comp.id}
                    onClick={() => {
                      setSelectedCompanyId(comp.id);
                      setSearchQuery('');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D97706] to-[#B45309] text-white shadow-md scale-102 ring-2 ring-amber-300/50'
                        : 'bg-white/80 hover:bg-amber-50/90 text-[#78543E] border border-amber-200/60 hover:border-amber-300'
                    }`}
                  >
                    {renderDivisionIcon(comp.iconName, `w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-[#D97706]'}`)}
                    <span>{comp.shortLabel}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${isActive ? 'bg-white/25 text-white' : 'bg-amber-500/10 text-[#B45309]'}`}>
                      {comp.brands.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Company Brands Grid */}
            <div className="pt-6">
              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {activeCompany.brands.map((brand) => (
                  <div
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand.name)}
                    className="group relative flex flex-col justify-between p-3 sm:p-4 rounded-2xl bg-white/90 hover:bg-white border border-amber-200/70 hover:border-[#D97706] shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 select-none"
                    title={`Click to get quote for ${brand.name}`}
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-500/10 text-[#B45309] border border-amber-200/60 truncate">
                        {brand.badge}
                      </span>
                      <span className="text-[10px] font-bold text-[#D97706] opacity-0 group-hover:opacity-100 transition-opacity">
                        Quote ↗
                      </span>
                    </div>

                    {/* Logo Box */}
                    <div className="h-16 sm:h-18 w-full flex items-center justify-center p-1.5 bg-amber-50/20 rounded-xl group-hover:bg-amber-50/40 transition-colors">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-xs group-hover:scale-108 transition-transform duration-200 rounded-md"
                        loading="lazy"
                      />
                    </div>

                    {/* Brand Info */}
                    <div className="w-full text-center mt-2.5 pt-2 border-t border-amber-100/70">
                      <h4 className="text-xs sm:text-[13px] font-extrabold text-[#2E1B0E] group-hover:text-[#D97706] transition-colors truncate">
                        {brand.name}
                      </h4>
                      <p className="text-[10px] text-[#78543E] mt-0.5 line-clamp-1">
                        {brand.tagline}
                      </p>
                    </div>

                    {/* Quick Action Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBrandSelect(brand.name);
                      }}
                      className="mt-3 w-full py-1.5 rounded-lg text-[10px] font-extrabold text-[#B45309] bg-amber-500/10 hover:bg-[#D97706] hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Summary Strip */}
            <div className="mt-6 pt-4 border-t border-amber-200/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78543E]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                <span className="font-semibold">
                  Official Authorized Dealership & Stockist for all {activeCompany.brands.length} {activeCompany.subtitle} brands
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#D97706] hover:text-[#B45309] font-extrabold flex items-center gap-1 cursor-pointer"
              >
                <span>View full brand showroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Scroll3D>

      </div>

      {/* DEDICATED COMPANY BRANDS MODAL (POPUPS ON CLICK) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="glossy-modal rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-white/90 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-amber-200/50 bg-gradient-to-r from-amber-500/10 via-white/80 to-amber-500/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-[#D97706] shadow-inner shrink-0">
                  {renderDivisionIcon(activeCompany.iconName, 'w-6 h-6')}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-[#B45309] text-[10px] font-black uppercase tracking-wider">
                      Division {activeCompany.divisionNumber}
                    </span>
                    <span className="text-xs font-bold text-amber-700/80">
                      {activeCompany.badge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-[#2E1B0E] font-heading flex items-center gap-2">
                    {activeCompany.name}{' '}
                    <span className="text-[#B45309]">({activeCompany.subtitle})</span>
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Division Switcher Bar Inside Modal (All 6 Divisions) */}
            <div className="p-3 sm:p-4 border-b border-amber-100 bg-white/70 backdrop-blur-md shrink-0 space-y-3">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
                {COMPANIES.map((comp) => {
                  const isActive = comp.id === selectedCompanyId;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => {
                        setSelectedCompanyId(comp.id);
                        setSearchQuery('');
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#D97706] to-[#B45309] text-white shadow-sm scale-102 ring-1 ring-amber-300'
                          : 'bg-white/80 hover:bg-amber-50 text-[#78543E] border border-amber-200/60'
                      }`}
                    >
                      {renderDivisionIcon(comp.iconName, `w-3 h-3 ${isActive ? 'text-amber-200' : 'text-[#D97706]'}`)}
                      <span>{comp.shortLabel}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-amber-500/10 text-[#B45309]'}`}>
                        {comp.brands.length}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Within Division */}
              <div className="relative">
                <Search className="w-4 h-4 text-amber-700/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder={`Search ${activeCompany.subtitle} brands (e.g. ${activeCompany.brands.map(b => b.name).slice(0, 3).join(', ')})...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl glossy-input border border-amber-200/80 focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/20 transition-all text-[#2E1B0E] placeholder:text-amber-900/40 shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Brands Grid Inside Modal */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-gradient-to-b from-transparent to-amber-50/20">
              {modalBrands.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">No brands found matching "{searchQuery}" in this division.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-xs font-bold text-[#D97706] hover:underline cursor-pointer"
                  >
                    Reset search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5">
                  {modalBrands.map((brand) => (
                    <div
                      key={brand.id}
                      onClick={() => handleBrandSelect(brand.name)}
                      className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/90 hover:bg-white border border-amber-200/70 hover:border-[#D97706] shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer hover:-translate-y-1 select-none"
                    >
                      <div>
                        {/* Top Tag & Status */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/10 text-[#B45309] border border-amber-200/70">
                            {brand.badge}
                          </span>
                          <span className="text-[10px] font-semibold text-amber-700/70">
                            {brand.category}
                          </span>
                        </div>

                        {/* High-Resolution Brand Logo */}
                        <div className="h-20 sm:h-24 w-full flex items-center justify-center p-2 bg-amber-50/25 rounded-xl group-hover:bg-amber-50/50 transition-colors">
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="max-h-full max-w-full object-contain filter drop-shadow-xs group-hover:scale-108 transition-transform duration-200 rounded-md"
                            loading="lazy"
                          />
                        </div>

                        {/* Brand Name & Tagline */}
                        <div className="mt-3.5">
                          <h4 className="text-sm sm:text-base font-extrabold text-[#2E1B0E] group-hover:text-[#D97706] transition-colors">
                            {brand.name}
                          </h4>
                          <p className="text-xs text-[#78543E] mt-1 leading-relaxed">
                            {brand.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Brand CTA Button */}
                      <div className="mt-4 pt-3 border-t border-amber-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBrandSelect(brand.name);
                          }}
                          className="w-full py-2.5 px-3 rounded-xl golden-btn text-xs font-bold text-white shadow-xs flex items-center justify-between cursor-pointer group-hover:shadow-md transition-shadow"
                        >
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-100" />
                            <span>Request Quote for {brand.name}</span>
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-5 border-t border-amber-200/40 bg-amber-500/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78543E] shrink-0">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                <span>
                  Showing {modalBrands.length} authorized brand dealerships under{' '}
                  <strong className="text-[#2E1B0E]">{activeCompany.name} ({activeCompany.subtitle})</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    onOpenQuote(activeCompany.subtitle);
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#D97706] to-[#B45309] text-white font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer text-center"
                >
                  Request Division-Wide Quote
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
