import { ShieldCheck, FileText, ArrowRight, Truck, Award, Layers, Coins } from 'lucide-react';
import Scroll3D, { TiltCard3D } from './Scroll3D';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onOpenQuote, onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 sunrise-hero-bg border-b border-white/60">
      
      {/* Radiant Sun Flare & Ambient Bokeh Lights Matching Reference Image */}
      <div className="sun-flare top-6 right-[10%] opacity-75 float-3d-slow" />
      <div className="ambient-glow-amber w-[550px] h-[550px] -top-10 -left-10 opacity-40 float-3d-slow" />
      <div className="ambient-glow-orange w-[550px] h-[550px] bottom-0 right-10 opacity-30 float-3d-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Two-Column Grid: Content Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center mb-10 sm:mb-12">
          
          {/* Left Column: Headline, Pitch & Action Buttons (Span 7) with 3D Slide In */}
          <Scroll3D direction="left" delay={0.1} className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Top Micro Credential Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glossy-pill text-[#92400E] text-[10px] sm:text-xs font-bold tracking-wide shadow-xs max-w-full">
              <ShieldCheck size={14} className="text-[#D97706] shrink-0" />
              <span className="leading-tight">Direct Mill Certified TMT Steel & Fresh Cement Outlet &bull; Ettiyampatti</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse shrink-0 hidden sm:inline-block" />
            </div>

            {/* Main Hero Headline - Responsive Dual-Tone Typography */}
            <h1 className="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-[#2E1B0E] tracking-tight leading-[1.18] sm:leading-[1.12] drop-shadow-xs">
              THE BACKBONE OF YOUR PROJECTS IN{' '}
              <span className="bg-gradient-to-r from-[#D97706] via-[#E88915] to-[#B45309] bg-clip-text text-transparent drop-shadow-sm">
                BRILLIANT STEEL, CEMENT & PAINTS
              </span>
            </h1>

            {/* Subtitle in Warm Bronze */}
            <p className="text-xs sm:text-base text-[#5C3D2E] leading-relaxed max-w-xl font-medium">
              Over 25+ years of dedicated wholesale and retail supply in Ettiyampatti, Harur, and across Dharmapuri. Direct mill TMT rebars, factory-fresh cements, Asian Paints Colour World tinting studio, and farm essentials.
            </p>

            {/* Responsive Dual Action Buttons (Full-width on mobile, auto on desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenQuote}
                className="golden-btn w-full sm:w-auto px-7 py-3.5 rounded-full font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-transform cursor-pointer"
              >
                <FileText size={16} />
                <span>Start Direct Quote</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={onExploreClick}
                className="glossy-btn w-full sm:w-auto px-6 py-3.5 rounded-full glossy-pill text-[#78350F] hover:text-[#451A03] font-extrabold text-xs sm:text-sm hover:scale-102 transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Browse Catalog</span>
                <ArrowRight size={14} className="rotate-90" />
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs font-bold text-[#5C3D2E]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                <span>Weighbridge Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                <span>Direct Lorry Site Transport</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                <span>Authorized Dealership</span>
              </div>
            </div>

          </Scroll3D>

          {/* Right Column: Storefront Image in Interactive 3D Tilt Card (Span 5) */}
          <Scroll3D direction="right" delay={0.2} className="lg:col-span-5 relative">
            <TiltCard3D maxTilt={7} className="rounded-3xl p-2.5 sm:p-3 glossy-card shadow-[0_20px_50px_-10px_rgba(217,119,6,0.3)] group hover:shadow-[0_28px_65px_-10px_rgba(217,119,6,0.45)] transition-all">
              <div className="relative rounded-2xl overflow-hidden border border-white/80 bg-stone-100 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/assets/store-hero-W47zwWIs.jpg"
                  alt="Sree Murugan Sons in Ettiyampatti, Harur"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.04]"
                />

                {/* Subtle Bottom Light Scrim */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#2E1B0E]/90 via-[#2E1B0E]/40 to-transparent p-4 sm:p-5 text-white">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex flex-col">
                      <span className="font-heading font-black text-sm text-white tracking-wide">
                        Sree Murugan Sons Showroom
                      </span>
                      <span className="text-[11px] text-amber-200/90 font-medium mt-0.5">
                        Main Road, Ettiyampatti &bull; Harur
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full golden-btn text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      Open Mon - Sat
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </Scroll3D>

        </div>

        {/* Bottom Floating Golden Ribbon in 3D Glide */}
        <Scroll3D direction="up" delay={0.3} className="max-w-5xl mx-auto rounded-2xl sm:rounded-full bg-white/75 backdrop-blur-2xl border border-white/90 p-3 sm:p-4 shadow-[0_10px_35px_-5px_rgba(217,119,6,0.15)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            
            <div className="flex items-center justify-center gap-2 p-1 text-xs font-black text-[#451A03]">
              <div className="w-7 h-7 rounded-full golden-tag flex items-center justify-center shrink-0">
                <Coins size={14} className="text-[#D97706]" />
              </div>
              <span>Real-Time Pricing</span>
            </div>

            <div className="flex items-center justify-center gap-2 p-1 text-xs font-black text-[#451A03]">
              <div className="w-7 h-7 rounded-full golden-tag flex items-center justify-center shrink-0">
                <Award size={14} className="text-[#D97706]" />
              </div>
              <span>Mill-Certified Quality</span>
            </div>

            <div className="flex items-center justify-center gap-2 p-1 text-xs font-black text-[#451A03]">
              <div className="w-7 h-7 rounded-full golden-tag flex items-center justify-center shrink-0">
                <Truck size={14} className="text-[#D97706]" />
              </div>
              <span>Prompt Site Delivery</span>
            </div>

            <div className="flex items-center justify-center gap-2 p-1 text-xs font-black text-[#451A03]">
              <div className="w-7 h-7 rounded-full golden-tag flex items-center justify-center shrink-0">
                <Layers size={14} className="text-[#D97706]" />
              </div>
              <span>Bulk Order Estimates</span>
            </div>

          </div>
        </Scroll3D>

      </div>
    </section>
  );
}
