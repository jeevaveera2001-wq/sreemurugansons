import { Award, Users, Layers, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import Scroll3D, { TiltCard3D } from './Scroll3D';

interface AboutSectionProps {
  onOpenQuote: () => void;
}

const STATS = [
  {
    icon: Award,
    value: '25+ Years',
    title: 'of Experience',
    subtitle: 'Serving Dharmapuri Region',
  },
  {
    icon: Users,
    value: '1,000+',
    title: 'Happy Customers',
    subtitle: 'Builders, Contractors & Farmers',
  },
  {
    icon: Layers,
    value: 'Wide Product Range',
    title: 'All Under One Roof',
    subtitle: '5,000+ Verified Items',
  },
  {
    icon: MapPin,
    value: 'Local Business',
    title: 'Ettiyampatti, Harur',
    subtitle: 'Dharmapuri – 636903',
  },
];

export default function AboutSection({ onOpenQuote }: AboutSectionProps) {
  return (
    <section id="about-us" className="py-16 sm:py-24 relative overflow-hidden border-b border-white/60">
      
      {/* Background Refraction Glow */}
      <div className="ambient-glow-orange w-[500px] h-[500px] -top-20 -right-20 opacity-25 float-3d-slow" />
      <div className="ambient-glow-amber w-[450px] h-[450px] -bottom-20 -left-20 opacity-30 float-3d-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: About Text & Story */}
          <div className="lg:col-span-7">
            <Scroll3D direction="left" delay={0.1} className="space-y-6">
              {/* Section Tag in Glossy Pill */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glossy-pill text-xs font-bold uppercase tracking-wider text-[#D97706] mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                  About Us
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#2E1B0E] tracking-tight">
                  Sree Murugan Sons
                </h2>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-[#5C3D2E] leading-relaxed font-normal">
                <p>
                  With a strong commitment to quality and customer satisfaction,{' '}
                  <strong className="font-extrabold text-[#2E1B0E]">Sree Murugan Sons</strong> has been proudly serving the community of Ettiyampatti, Harur, and Dharmapuri district for over 25 years under proprietor{' '}
                  <strong className="font-bold text-[#D97706]">M. Vivekananthan</strong>.
                </p>
                <p>
                  We provide a complete, verified range of hardware, premium paints, Fe 550D TMT steel, factory-fresh cement, and certified agro products — accompanied by dependable transport delivery and practical technical guidance.
                </p>
              </div>

              {/* 4 Core Guarantees in Glossy Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2 text-xs font-bold text-[#2E1B0E]">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl glossy-pill">
                  <CheckCircle2 size={18} className="text-[#D97706] shrink-0" />
                  <span>Quality Products</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl glossy-pill">
                  <CheckCircle2 size={18} className="text-[#D97706] shrink-0" />
                  <span>Trusted Service</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl glossy-pill">
                  <CheckCircle2 size={18} className="text-[#D97706] shrink-0" />
                  <span>Direct Mill Supply</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl glossy-pill">
                  <CheckCircle2 size={18} className="text-[#D97706] shrink-0" />
                  <span>Customer Satisfaction</span>
                </div>
              </div>

              {/* Action Buttons (Full width on mobile) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <a
                  href="#store-info"
                  className="golden-btn w-full sm:w-auto px-6 py-3.5 rounded-2xl text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>About Us</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={onOpenQuote}
                  className="glossy-btn w-full sm:w-auto px-6 py-3.5 rounded-2xl glossy-card text-[#B45309] hover:text-[#92400E] font-extrabold text-xs sm:text-sm transition-all cursor-pointer text-center"
                >
                  Get Quotation
                </button>
              </div>
            </Scroll3D>
          </div>

          {/* Right: 4 Glossy Statistic Cards */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Scroll3D key={idx} direction="right" delay={0.1 + idx * 0.1}>
                  <TiltCard3D maxTilt={7}>
                    <div className="glossy-card p-4 sm:p-6 rounded-3xl flex items-center gap-3.5 sm:gap-4 group hover:shadow-[0_16px_32px_rgba(217,119,6,0.14)]">
                      <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl golden-tag flex items-center justify-center text-[#D97706] shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:to-[#D97706] group-hover:text-white transition-all shadow-xs">
                        <Icon size={22} className="sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <div className="font-heading font-black text-base sm:text-xl text-[#2E1B0E] tracking-tight leading-tight group-hover:text-[#D97706] transition-colors">
                          {stat.value}
                        </div>
                        <div className="font-bold text-[11px] sm:text-xs text-[#2E1B0E] mt-0.5">
                          {stat.title}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-[#5C3D2E]/80 font-normal">
                          {stat.subtitle}
                        </div>
                      </div>
                    </div>
                  </TiltCard3D>
                </Scroll3D>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
