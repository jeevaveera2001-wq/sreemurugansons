import { MapPin, Phone, Clock, ShieldCheck, MessageCircle, ExternalLink, Navigation } from 'lucide-react';
import Scroll3D, { TiltCard3D } from './Scroll3D';

export default function StoreInfo() {
  return (
    <section id="store-info" className="py-16 sm:py-24 relative overflow-hidden border-b border-white/60">
      
      {/* Refraction Glow */}
      <div className="ambient-glow-orange w-[500px] h-[500px] -bottom-20 -right-20 opacity-25 float-3d-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-6">
            <Scroll3D direction="left" delay={0.1} className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glossy-pill text-xs font-bold uppercase tracking-wider text-[#D97706] mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                  Store Location & Inquiries
                </div>
                <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-[#2E1B0E] tracking-tight">
                  Visit Sree Murugan Sons in Ettiyampatti, Harur
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#5C3D2E] leading-relaxed font-normal">
                Conveniently located on the main road in Ettiyampatti with expansive steel yard, cement storage, computerized paint mixing studio, and heavy vehicle loading bays.
              </p>

              {/* Glossy Info Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Address */}
                <TiltCard3D maxTilt={6}>
                  <div className="p-5 rounded-3xl glossy-card hover:shadow-[0_16px_32px_rgba(217,119,6,0.12)] h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[#D97706] font-extrabold mb-1.5">
                        <MapPin size={17} />
                        <span>Store & Steel Yard Address</span>
                      </div>
                      <div className="font-medium text-[#2E1B0E] leading-relaxed">
                        Main Road, Ettiyampatti P.O.,<br />
                        Harur (TK), Dharmapuri (DT) – 636903,<br />
                        Tamil Nadu, India.
                      </div>
                    </div>
                    <div className="pt-2">
                      <a
                        href="https://www.google.com/maps/place/Sre+Murugan+Sons/@12.0536954,78.5411758,16z/data=!4m6!3m5!1s0x3bac65ec72b7658b:0x1ae9173bf869fb34!8m2!3d12.0536954!4d78.5411758"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#D97706] hover:underline inline-flex items-center gap-1"
                      >
                        <span>View on Google Maps</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </TiltCard3D>

                {/* Working Hours */}
                <TiltCard3D maxTilt={6}>
                  <div className="p-5 rounded-3xl glossy-card hover:shadow-[0_16px_32px_rgba(217,119,6,0.12)] h-full">
                    <div className="flex items-center gap-2 text-[#D97706] font-extrabold mb-1.5">
                      <Clock size={17} />
                      <span>Operating Timings</span>
                    </div>
                    <div className="font-bold text-[#2E1B0E] leading-snug">
                      Monday – Saturday: 7:30 AM – 9:00 PM<br />
                      Sunday: 8:00 AM – 2:00 PM<br />
                      <span className="text-emerald-700 font-extrabold">● Open Today</span>
                    </div>
                  </div>
                </TiltCard3D>

                {/* Phone Contacts */}
                <TiltCard3D maxTilt={6}>
                  <div className="p-5 rounded-3xl glossy-card hover:shadow-[0_16px_32px_rgba(217,119,6,0.12)] h-full">
                    <div className="flex items-center gap-2 text-[#D97706] font-extrabold mb-1.5">
                      <Phone size={17} />
                      <span>Direct Desk Numbers</span>
                    </div>
                    <div className="font-bold text-[#2E1B0E] space-y-1">
                      <div>
                        <a href="tel:+919488331932" className="text-[#B45309] hover:underline font-mono">
                          +91 94883 31932
                        </a>{' '}
                        <span className="text-[10px] text-stone-500 font-bold">(Owner Desk)</span>
                      </div>
                      <div>
                        <a href="tel:+919442624882" className="text-[#B45309] hover:underline font-mono">
                          +91 94426 24882
                        </a>{' '}
                        <span className="text-[10px] text-stone-500 font-bold">(Store Counter)</span>
                      </div>
                    </div>
                  </div>
                </TiltCard3D>

                {/* Business Credentials */}
                <TiltCard3D maxTilt={6}>
                  <div className="p-5 rounded-3xl glossy-card hover:shadow-[0_16px_32px_rgba(217,119,6,0.12)] h-full">
                    <div className="flex items-center gap-2 text-[#D97706] font-extrabold mb-1.5">
                      <ShieldCheck size={17} />
                      <span>Business Verification</span>
                    </div>
                    <div className="font-bold text-[#2E1B0E] space-y-0.5">
                      <div>Proprietor: M. Vivekananthan</div>
                      <div className="font-mono text-xs text-[#92400E] font-black">
                        GSTIN: 33AFDFS8443P1ZE
                      </div>
                    </div>
                  </div>
                </TiltCard3D>

              </div>

              {/* Quick Actions (Full width on mobile) */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://wa.me/919488331932?text=Hello%20M.%20Vivekananthan%20sir%2C%20inquiry%20from%20Sree%20Murugan%20Sons%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glossy-btn w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all border border-white/20"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="tel:+919488331932"
                  className="golden-btn w-full sm:w-auto px-6 py-3.5 rounded-2xl text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Phone size={16} />
                  <span>Call Owner Directly</span>
                </a>
              </div>
            </Scroll3D>
          </div>

          {/* Right Map in Crystal Glass Bezel */}
          <div className="lg:col-span-6">
            <Scroll3D direction="right" delay={0.2}>
              <TiltCard3D maxTilt={6}>
                <div className="rounded-3xl overflow-hidden glossy-card p-2 sm:p-3 shadow-xl">
                  <iframe
                    title="Sre Murugan Sons Official Google Maps Location"
                    src="https://maps.google.com/maps?q=12.0536954,78.5411758+(Sre+Murugan+Sons)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                    className="w-full h-64 sm:h-96 rounded-2xl border-none"
                    loading="lazy"
                  />
                  
                  {/* Google Maps Interactive Navigation Bar */}
                  <div className="pt-3 px-2 pb-1 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-center gap-2 text-[#2E1B0E] font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Sre Murugan Sons &bull; Verified Google Maps Location</span>
                    </div>
                    <a
                      href="https://www.google.com/maps/place/Sre+Murugan+Sons/@12.0536954,78.5411758,16z/data=!4m6!3m5!1s0x3bac65ec72b7658b:0x1ae9173bf869fb34!8m2!3d12.0536954!4d78.5411758"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[11px] shadow-sm transition-all"
                    >
                      <Navigation size={13} />
                      <span>Get Directions</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </TiltCard3D>
            </Scroll3D>
          </div>

        </div>

      </div>
    </section>
  );
}
