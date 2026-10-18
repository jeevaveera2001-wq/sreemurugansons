import { Truck, Layers, Building2, HardHat, CheckCircle2, ArrowRight } from 'lucide-react';
import Scroll3D, { TiltCard3D } from './Scroll3D';

interface ServicesSectionProps {
  onOpenQuote: () => void;
}

const SERVICES = [
  {
    badge: 'ON-TIME DISPATCH',
    icon: Truck,
    title: 'Direct Site & Home Delivery',
    description:
      'Reliable truck and mini-transport delivery directly to your job site or doorstep in Ettiyampatti, Harur, and surrounding villages.',
    feature: 'Same day or scheduled delivery',
    featured: false,
  },
  {
    badge: 'BULK SUPPLY',
    icon: Layers,
    title: 'Bulk Orders for Large Projects',
    description:
      'Dedicated volume supply, scheduled installment delivery, and priority loading for commercial builds and apartment projects.',
    feature: 'Dedicated project supply',
    featured: false,
  },
  {
    badge: 'SINGLE SOURCE',
    icon: Building2,
    title: 'Construction Material Supply',
    description:
      'Complete foundation-to-roof material package: TMT steel, cement, aggregates, masonry supplies, and waterproofing chemicals.',
    feature: 'Comprehensive BOQ fulfillment',
    featured: true, // Highlighted card
  },
  {
    badge: 'TRADE ACCOUNTS',
    icon: HardHat,
    title: 'Contractor & Mason Support',
    description:
      'Credit facilities for verified contractors, early morning loading assistance, and customized steel cutting/bending support.',
    feature: 'Priority yard loading',
    featured: false,
  },
];

export default function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 sm:py-24 relative overflow-hidden border-b border-white/60">
      
      {/* Background Refraction Glow */}
      <div className="ambient-glow-amber w-[450px] h-[450px] top-1/2 -left-20 opacity-30 float-3d-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Scroll3D direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glossy-pill text-xs font-bold uppercase tracking-wider text-[#D97706] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                Full-Spectrum Support
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-[#2E1B0E] tracking-tight">
                Our Services
              </h2>
              <p className="text-xs sm:text-sm text-[#5C3D2E] mt-2 max-w-xl font-medium leading-relaxed">
                From direct construction site truck logistics to technical guidance for builders and farmers.
              </p>
            </div>

            {/* Action Buttons (Full width on mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href="#group-of-companies"
                className="glossy-btn px-4 py-2.5 rounded-xl glossy-pill text-[#2E1B0E] text-xs font-bold transition-all shadow-2xs hover:text-[#D97706] text-center"
              >
                View All Divisions
              </a>
              <button
                onClick={onOpenQuote}
                className="golden-btn px-5 py-2.5 rounded-xl text-white text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Site Delivery Quote</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </Scroll3D>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Scroll3D key={idx} delay={0.1 + idx * 0.1}>
                <TiltCard3D maxTilt={8} onClick={onOpenQuote} className="h-full">
                  <div
                    className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group ${
                      s.featured
                        ? 'glossy-card ring-2 ring-[#F59E0B] shadow-[0_18px_45px_rgba(217,119,6,0.2)] bg-gradient-to-b from-white/95 via-[#FFFBEB]/60 to-white/95'
                        : 'glossy-card hover:shadow-[0_16px_32px_rgba(217,119,6,0.14)]'
                    }`}
                  >
                    <div>
                      {/* Top Row: Icon & Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl golden-tag flex items-center justify-center text-[#D97706] group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:to-[#D97706] group-hover:text-white transition-all shadow-2xs">
                          <Icon size={22} />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-xl golden-tag text-[#92400E]">
                          {s.badge}
                        </span>
                      </div>

                      {/* Card Title & Description */}
                      <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#2E1B0E] tracking-tight group-hover:text-[#D97706] transition-colors mb-2">
                        {s.title}
                      </h3>
                      <p className="text-xs text-[#5C3D2E] leading-relaxed font-normal">
                        {s.description}
                      </p>
                    </div>

                    {/* Bottom Feature Checklist */}
                    <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center gap-2 text-xs font-semibold text-[#2E1B0E]">
                      <CheckCircle2 size={16} className="text-[#D97706] shrink-0" />
                      <span className="truncate">{s.feature}</span>
                    </div>
                  </div>
                </TiltCard3D>
              </Scroll3D>
            );
          })}
        </div>

      </div>
    </section>
  );
}
