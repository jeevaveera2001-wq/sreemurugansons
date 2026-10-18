import { ShieldCheck, Award, Layers, Wrench, Truck, Users } from 'lucide-react';
import Scroll3D from './Scroll3D';

interface TrustItem {
  icon: typeof ShieldCheck;
  title: string;
  subtitle: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    subtitle: 'ISI & BIS Certified',
  },
  {
    icon: Award,
    title: 'Direct Mill Supply',
    subtitle: 'Weighbridge Receipts',
  },
  {
    icon: Layers,
    title: '5,000+ Items',
    subtitle: 'Full Store Range',
  },
  {
    icon: Wrench,
    title: 'Expert Guidance',
    subtitle: '25 Yrs Experience',
  },
  {
    icon: Truck,
    title: 'Site Delivery',
    subtitle: 'Direct Lorry Transport',
  },
  {
    icon: Users,
    title: 'Trusted Entity',
    subtitle: 'Serving Ettiyampatti',
  },
];

export default function TrustBar() {
  return (
    <section className="relative z-20 -mt-3 mb-4 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <Scroll3D direction="up" delay={0.1}>
        <div className="glossy-card rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-white/90 shadow-[0_12px_36px_-6px_rgba(217,119,6,0.12)] hover:shadow-[0_16px_40px_-4px_rgba(217,119,6,0.2)] transition-all">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 items-center">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-2xl transition-all duration-300 hover:bg-white/80 border border-transparent hover:border-white/80 hover:shadow-xs group select-none"
              >
                {/* Glossy Circular Icon Pod */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl golden-tag flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:to-[#D97706] group-hover:text-white transition-all duration-300">
                  <Icon
                    size={18}
                    className="text-[#D97706] group-hover:text-white transition-colors duration-300"
                  />
                </div>

                <div className="min-w-0">
                  <div className="font-heading font-extrabold text-[11px] sm:text-[13px] text-[#2E1B0E] leading-tight truncate group-hover:text-[#D97706] transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#5C3D2E]/80 font-semibold mt-0.5 truncate">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </Scroll3D>
    </section>
  );
}
