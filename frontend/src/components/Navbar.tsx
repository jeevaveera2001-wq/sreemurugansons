import { useState } from 'react';
import { ShieldCheck, Sparkles, Menu, X, Phone, MessageCircle, ChevronRight, MapPin, Calculator as CalcIcon, Award, Layers } from 'lucide-react';

interface NavbarProps {
  onOpenLogin?: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
  onOpenWelcome?: () => void;
}

export default function Navbar({ isAdmin, onOpenAdmin, onOpenWelcome }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Group of Companies', href: '#group-of-companies', icon: Layers },
    { label: 'Brands We Deal With', href: '#brands', icon: Award },
    { label: 'Price Estimator', href: '#calculator', icon: CalcIcon },
    { label: 'About Us', href: '#about-us', icon: ShieldCheck },
    { label: 'Store Location', href: '#store-info', icon: MapPin },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 px-2 sm:px-6 py-2 sm:py-3 transition-all duration-300">
      <header className="max-w-7xl mx-auto rounded-2xl sm:rounded-full bg-white/75 backdrop-blur-2xl border border-white/85 shadow-[0_8px_30px_-4px_rgba(217,119,6,0.12)] py-1.5 sm:py-2 px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Store Name in a sleek frosted gold pod */}
          <div 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="cursor-pointer transition-all hover:opacity-95 shrink-0 flex items-center gap-2 sm:gap-3 group select-none py-1 px-1.5 sm:px-2 rounded-2xl hover:bg-white/40"
            title="Sree Murugan Sons - Home"
          >
            <div className="relative h-8 w-8 sm:h-11 sm:w-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
              <img 
                src="/images/logo-transparent.png" 
                alt="Sree Murugan Sons Logo" 
                className="h-full w-full object-contain filter drop-shadow-[0_2px_4px_rgba(217,119,6,0.3)]" 
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-heading font-black tracking-tight leading-none uppercase text-[11px] xs:text-xs sm:text-base md:text-lg text-[#2E1B0E]">
                  SREE MURUGAN
                </span>
                <span className="font-heading font-black tracking-tight leading-none uppercase text-[11px] xs:text-xs sm:text-base md:text-lg text-[#D97706]">
                  SONS
                </span>
              </div>
              <div className="font-bold tracking-wider uppercase flex items-center gap-1 mt-0.5 text-[8px] sm:text-[10px] text-[#78350F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                <span className="truncate max-w-[140px] xs:max-w-none">Ettiyampatti &bull; 25+ Yrs Trust</span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-bold text-[#451A03]">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="px-3 py-1.5 rounded-full hover:bg-white/70 hover:text-[#D97706] transition-all whitespace-nowrap cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Responsive CTA and Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {onOpenWelcome && (
              <button
                onClick={onOpenWelcome}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glossy-pill text-xs font-bold text-[#B45309] hover:text-[#78350F] hover:bg-white/80 transition-all cursor-pointer shadow-2xs border border-amber-300/40 active:scale-95"
                title="Experience 3D Welcome Showcase"
              >
                <Sparkles size={13} className="text-[#D97706] animate-pulse" />
                <span>3D Welcome</span>
              </button>
            )}

            <a
              href="#calculator"
              className="golden-btn inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-full font-extrabold text-[11px] sm:text-xs shadow-md transition-all whitespace-nowrap cursor-pointer"
            >
              <Sparkles size={13} className="text-white shrink-0" />
              <span className="hidden sm:inline">Get Daily Steel & Wire Price</span>
              <span className="sm:hidden">Daily Prices</span>
            </a>

            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="glossy-btn px-2.5 sm:px-4 py-2 rounded-full bg-[#2E1B0E] text-amber-300 hover:text-white transition-all font-extrabold text-xs shadow-md cursor-pointer whitespace-nowrap flex items-center gap-1.5 border border-amber-400/40"
                title="Admin Portal"
              >
                <ShieldCheck size={14} className="text-amber-400 shrink-0" />
                <span className="hidden sm:inline">Admin Portal</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl glossy-pill text-[#2E1B0E] hover:text-[#D97706] transition-all cursor-pointer focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-amber-900/10 space-y-2 animate-fadeIn">
            {onOpenWelcome && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWelcome();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-500/10 text-[#B45309] hover:bg-amber-500/20 text-xs font-bold transition-all border border-amber-300/40"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#D97706] animate-pulse" />
                  <span>Experience 3D Welcome Showcase</span>
                </span>
                <ChevronRight size={14} className="text-amber-400/80" />
              </button>
            )}

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/80 text-[#2E1B0E] hover:text-[#D97706] transition-all text-xs font-bold"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon size={16} className="text-[#D97706]" />
                    <span>{link.label}</span>
                  </span>
                  <ChevronRight size={14} className="text-amber-400/80" />
                </a>
              );
            })}

            {/* Quick Mobile Contact Call & WhatsApp */}
            <div className="pt-2 border-t border-amber-900/10 grid grid-cols-2 gap-2">
              <a
                href="tel:+919488331932"
                onClick={handleLinkClick}
                className="golden-btn py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-white text-[11px] font-extrabold"
              >
                <Phone size={13} />
                <span>Call Store</span>
              </a>
              <a
                href="https://wa.me/919488331932?text=Hello%20Sree%20Murugan%20Sons%2C%20inquiry%20from%20mobile%20website"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="glossy-btn py-2.5 px-3 rounded-xl bg-emerald-600 text-white flex items-center justify-center gap-1.5 text-[11px] font-extrabold border border-white/20"
              >
                <MessageCircle size={13} />
                <span>WhatsApp</span>
              </a>
            </div>

            {isAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin && onOpenAdmin();
                }}
                className="w-full mt-1 py-2.5 px-3.5 rounded-xl bg-[#2E1B0E] text-amber-300 flex items-center justify-center gap-2 text-xs font-bold border border-amber-400/30"
              >
                <ShieldCheck size={15} className="text-amber-400" />
                <span>Open Admin Portal</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            )}
          </div>
        )}
      </header>
    </div>
  );
}
