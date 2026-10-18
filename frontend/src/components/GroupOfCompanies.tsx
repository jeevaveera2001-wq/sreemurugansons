import { ArrowRight, PhoneCall } from 'lucide-react';
import Scroll3D, { TiltCard3D } from './Scroll3D';

interface CompanyCard {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  image: string;
}

const COMPANIES: CompanyCard[] = [
  {
    id: 'paints',
    name: 'Sree Murugan Sons',
    subtitle: 'Paints & Paints Essentials',
    badge: 'Asian Paints Authorized Dealer',
    description:
      'Computerized Asian Paints Colour World tinting studio, luxury interior emulsions, exterior weather-coats, primers, brushes, and complete waterproofing chemicals.',
    image: '/images/companies/paints-essentials-4k.jpg',
  },
  {
    id: 'steel',
    name: 'Sree Murugan Sons',
    subtitle: 'Steel & Pipes',
    badge: 'Direct Mill Certified Rebars',
    description:
      'Tata Tiscon & JSW Neosteel Fe 550D TMT rebars, heavy-duty square & round hollow pipes, MS angles, channels, flats, and GI binding wire with weighbridge slips.',
    image: '/images/companies/steel-pipes-4k.jpg',
  },
  {
    id: 'cement',
    name: 'Sree Murugan Sons',
    subtitle: 'Cements & Hardwares',
    badge: 'Fresh Mill Wholesale Depot',
    description:
      'Direct warehouse stock of UltraTech Super, Ramco Supercrete, and Dalmia DSP cements with fast lorry loading and direct site transport across Dharmapuri.',
    image: '/images/companies/cements-hardwares-4k.jpg',
  },
  {
    id: 'electricals',
    name: 'Sree Murugan Sons',
    subtitle: 'Electricals',
    badge: 'ISI Certified Electricals',
    description:
      'Flame-retardant wiring, industrial switchgear, distribution boxes, PVC conduits, electrical accessories, and plumbing installation essentials.',
    image: '/images/companies/electricals-4k.jpg',
  },
  {
    id: 'roofing',
    name: 'Sree Murugan Sons',
    subtitle: 'Cooling Sheets & Cement Sheets',
    badge: 'High-Durability Roofing',
    description:
      'Heavy-duty corrugated cement roofing sheets, thermal cooling sheets for temperature reduction, and industrial shed roofing supplies.',
    image: '/images/companies/cooling-sheets-4k.jpg',
  },
  {
    id: 'sanitary',
    name: 'Sree Murugan Sons',
    subtitle: 'Slab & Washbasin',
    badge: 'Granite & Sanitary Studio',
    description:
      'Polished granite kitchen slabs, quartz counters, designer table-top washbasins, ceramic pedestal sinks, and modern bathroom sanitaryware.',
    image: '/images/companies/slab-washbasin-4k.jpg',
  },
];

interface GroupOfCompaniesProps {
  onOpenQuote: () => void;
}

export default function GroupOfCompanies({ onOpenQuote }: GroupOfCompaniesProps) {
  return (
    <section id="group-of-companies" className="py-16 sm:py-24 relative overflow-hidden border-b border-white/60">
      
      {/* Ambient Glows for Refraction with 3D Float */}
      <div className="ambient-glow-amber w-[500px] h-[500px] top-10 -left-20 opacity-30 float-3d-slow" />
      <div className="ambient-glow-orange w-[500px] h-[500px] bottom-10 -right-20 opacity-30 float-3d-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Slide In */}
        <Scroll3D direction="up" delay={0.05}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-5">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glossy-pill text-xs font-bold uppercase tracking-wider text-[#D97706] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                Corporate Portfolio
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-[#2E1B0E] tracking-tight">
                Sree Murugan Sons Group of Companies
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5C3D2E] max-w-lg font-medium leading-relaxed">
              Six specialized divisions under the trusted Sree Murugan Sons banner, delivering end-to-end building and industrial solutions.
            </p>
          </div>
        </Scroll3D>

        {/* 3 by 3 Responsive 3D Tilt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 perspective-container">
          {COMPANIES.map((comp, idx) => (
            <Scroll3D key={comp.id} direction="up" delay={(idx % 3) * 0.12} intensity={0.9}>
              <TiltCard3D
                onClick={onOpenQuote}
                maxTilt={8}
                className="glossy-card rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between hover:shadow-[0_24px_50px_rgba(217,119,6,0.25)] transition-all h-full"
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
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                    {/* Top-left Frosted Badge */}
                    <span className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 px-2.5 sm:px-3 py-1 rounded-xl bg-black/65 backdrop-blur-md text-amber-200 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-amber-400/30 shadow-sm">
                      {comp.badge}
                    </span>
                  </div>

                  {/* Card Text Content */}
                  <div className="p-5 sm:p-7">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg golden-tag text-[10px] font-extrabold uppercase tracking-wider mb-2.5">
                      Division 0{idx + 1}
                    </div>
                    <h3 className="font-heading text-lg sm:text-2xl font-extrabold text-[#2E1B0E] tracking-tight group-hover:text-[#D97706] transition-colors leading-snug">
                      {comp.name}{' '}
                      <span className="text-[#B45309]">({comp.subtitle})</span>
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#5C3D2E] mt-2 leading-relaxed font-normal">
                      {comp.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Action with Glowing Golden Button */}
                <div className="p-5 sm:p-7 pt-0">
                  <div className="golden-btn w-full py-3 px-4 rounded-xl flex items-center justify-between text-xs font-bold text-white shadow-md">
                    <span className="flex items-center gap-1.5 font-extrabold tracking-wide">
                      <PhoneCall size={14} className="text-white" />
                      Request Direct Quote
                    </span>
                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-white">
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

              </TiltCard3D>
            </Scroll3D>
          ))}
        </div>

      </div>
    </section>
  );
}
