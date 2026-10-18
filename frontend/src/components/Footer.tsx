import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="golden-footer pt-16 pb-10 relative overflow-hidden">
      
      {/* Background Refraction Glow */}
      <div className="ambient-glow-amber w-96 h-96 -top-20 -left-20 opacity-30" />
      <div className="ambient-glow-orange w-[450px] h-[450px] top-1/2 -right-20 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 pb-8 sm:pb-12 border-b border-amber-900/15">
          
          {/* Col 1: Store Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center p-1 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-xs">
                <img
                  src="/images/logo-transparent.png"
                  alt="Sree Murugan Sons"
                  className="h-full w-full object-contain filter drop-shadow-[0_2px_4px_rgba(217,119,6,0.3)]"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-heading font-black text-base sm:text-lg tracking-tight uppercase text-[#2E1B0E] leading-tight">
                  SREE MURUGAN SONS
                </h3>
                <div className="text-[11px] text-[#B45309] font-bold tracking-wide mt-0.5">
                  Steel, Cement, Paints & Agro
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5C3D2E] leading-relaxed font-normal">
              Your trusted partner for 25+ years in Ettiyampatti, Harur. Mill-certified TMT steel, UltraTech cement, Asian Paints, and agricultural supplies.
            </p>

            <div className="text-xs font-mono text-[#2E1B0E] p-2.5 rounded-xl golden-tag border border-amber-300/60 shadow-2xs">
              <span className="text-[#B45309] font-extrabold">GSTIN:</span>{' '}
              <span className="font-bold tracking-wider select-all text-[#2E1B0E]">33AFDFS8443P1ZE</span>
            </div>
          </div>

          {/* Col 2: Core Materials */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#92400E]">
              Materials & Stock
            </h4>
            <ul className="space-y-2 text-xs text-[#5C3D2E]">
              <li>Tata Tiscon & JSW Fe 550D TMT Steel</li>
              <li>UltraTech Super & Ramco Supercrete</li>
              <li>Asian Paints Royale & Apex Ultima</li>
              <li>Bosch & Stanley Power Tools</li>
              <li>Finolex & Supreme UPVC/CPVC Pipes</li>
              <li>Certified Farm Seeds & Power Sprayers</li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#92400E]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#5C3D2E]">
              <li><a href="#group-of-companies" className="hover:text-[#B45309] transition-colors font-medium">Group of Companies</a></li>
              <li><a href="#brands" className="hover:text-[#B45309] transition-colors font-medium">Brands We Deal With</a></li>
              <li><a href="#calculator" className="hover:text-[#B45309] transition-colors font-medium">Material Estimator</a></li>
              <li><a href="#store-info" className="hover:text-[#B45309] transition-colors font-medium">Store Location & Yard</a></li>
              <li><a href="tel:+919488331932" className="hover:text-[#B45309] transition-colors font-medium">Call Store Desk</a></li>
            </ul>
          </div>

          {/* Col 4: Store Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#92400E]">
              Store & Yard Desk
            </h4>
            <div className="space-y-2.5 text-xs text-[#5C3D2E]">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#D97706] shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/JmmmuctvRibcLtQM7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B45309] hover:underline transition-colors"
                >
                  Main Road, Ettiyampatti P.O., Harur (TK), Dharmapuri (DT) – 636903
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#D97706] shrink-0" />
                <a href="tel:+919488331932" className="hover:text-[#B45309] font-bold font-mono text-[#2E1B0E]">
                  +91 94883 31932 (Owner Desk)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#D97706] shrink-0" />
                <a href="tel:+919442624882" className="hover:text-[#B45309] font-bold font-mono text-[#2E1B0E]">
                  +91 94426 24882 (Store Counter)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#D97706] shrink-0" />
                <span className="font-mono text-[#92400E] font-bold">murugansons@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#5C3D2E] gap-3">
          <div>
            &copy; {new Date().getFullYear()} SREE MURUGAN SONS. All Rights Reserved. &bull; Proprietor: M. Vivekananthan
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse inline-block" />
            <span className="text-[#2E1B0E] font-semibold">Govt. Certified GST Registered &bull; Ettiyampatti, Harur</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
