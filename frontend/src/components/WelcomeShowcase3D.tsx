import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, RotateCcw } from 'lucide-react';

interface WelcomeShowcase3DProps {
  onEnter: () => void;
}

export default function WelcomeShowcase3D({ onEnter }: WelcomeShowcase3DProps) {
  // State for unified vs 3D divided format
  const [isDivided, setIsDivided] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Automatically trigger 3D division after 1.2 seconds of showcasing full format
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDivided(true);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  // Handle interactive 3D parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20; // -10 to +10 deg
    const y = (clientY / innerHeight - 0.5) * -15; // -7.5 to +7.5 deg
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleEnterWebsite = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDivided(false);
    setTimeout(() => {
      setIsDivided(true);
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-8 bg-[#180C05] text-white overflow-hidden transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(217, 119, 6, 0.35) 0%, transparent 65%),
          radial-gradient(circle at 20% 80%, rgba(180, 83, 9, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.25) 0%, transparent 50%),
          linear-gradient(to bottom, #1E0F06 0%, #110702 100%)
        `,
      }}
    >
      {/* Golden Sunrise Light Beams & Ambient Floaters */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow-amber w-[600px] h-[600px] -top-32 left-1/2 -translate-x-1/2 opacity-50 blur-3xl animate-pulse" />
        <div className="ambient-glow-orange w-[500px] h-[500px] bottom-0 -right-20 opacity-30 blur-2xl" />
        <div className="ambient-glow-amber w-[500px] h-[500px] bottom-0 -left-20 opacity-30 blur-2xl" />
      </div>

      {/* Top Bar: Brand Badge & Skip Button */}
      <div className="w-full max-w-6xl flex items-center justify-between relative z-20 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/30 text-amber-200 text-xs font-bold tracking-wider uppercase shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Sree Murugan & Sons &bull; Since 1999</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-200/90 transition-all cursor-pointer active:scale-95"
            title="Replay 3D Split Animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Replay 3D Effect</span>
          </button>

          <button
            onClick={handleEnterWebsite}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Enter Website &rarr;
          </button>
        </div>
      </div>

      {/* Centerpiece: The 3-Piece 3D Splitting Showcase */}
      <div className="w-full max-w-5xl my-auto flex flex-col items-center justify-center relative z-20 py-4">
        
        {/* Dynamic Status Indicator */}
        <div className="mb-4 sm:mb-6 text-center transition-all duration-700">
          <h2 className="font-heading text-xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-400 tracking-tight drop-shadow-md">
            {isDivided ? 'Welcome to Sree Murugan & Sons' : 'Gathering Heritage & Trust...'}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 mt-1 font-medium max-w-lg mx-auto">
            {isDivided 
              ? 'Our 3D Divided Gateway &bull; Click anywhere or explore below to enter' 
              : 'Full Format Showcase &bull; Dividing into 3D in a moment...'}
          </p>
        </div>

        {/* 3D Triptych Container with Dynamic Perspective */}
        <div
          className="relative w-full aspect-[1024/575] max-h-[58vh] sm:max-h-[62vh] flex items-center justify-center transition-transform duration-300 ease-out select-none cursor-pointer"
          onClick={handleEnterWebsite}
          style={{
            perspective: '1500px',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${mouseOffset.y * 0.4}deg) rotateY(${mouseOffset.x * 0.4}deg)`,
          }}
        >
          {/* Inner 3-Piece Row with Animated Spacing & 3D Tilt Angles */}
          <div 
            className="relative w-full h-full flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transformStyle: 'preserve-3d',
              gap: isDivided ? 'clamp(10px, 2.8vw, 36px)' : '0px',
            }}
          >
            {/* PIECE 1: LEFT PANEL (Mountains, Sunrise Sky & Peacocks) */}
            <div
              className="relative h-full flex-1 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group"
              style={{
                transformStyle: 'preserve-3d',
                transform: isDivided
                  ? 'perspective(1200px) rotateY(18deg) translateZ(-25px) scale(0.96)'
                  : 'perspective(1200px) rotateY(0deg) translateZ(0px) scale(1)',
                boxShadow: isDivided
                  ? '-18px 25px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(217, 119, 6, 0.25)'
                  : 'none',
                borderRadius: isDivided ? '16px' : '0px',
                borderLeft: isDivided ? '1.5px solid rgba(251, 191, 36, 0.5)' : 'none',
                borderTop: isDivided ? '1.5px solid rgba(251, 191, 36, 0.4)' : 'none',
                borderBottom: isDivided ? '1.5px solid rgba(251, 191, 36, 0.4)' : 'none',
              }}
            >
              <img
                src="/images/welcome/welcome-left.jpg"
                alt="Sree Murugan Sons - Tradition & Landscape"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
              
              {/* Refraction Glass Gloss Highlight */}
              <div 
                className={`absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/10 to-white/20 transition-opacity duration-1000 pointer-events-none ${
                  isDivided ? 'opacity-100' : 'opacity-0'
                }`} 
              />

              {/* Sub-label visible upon division */}
              {isDivided && (
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-amber-400/30 text-[10px] font-bold text-amber-200 tracking-wider uppercase animate-fadeIn">
                  Heritage
                </div>
              )}
            </div>

            {/* PIECE 2: CENTER PANEL (Peacock Medallion, Spear, Rooster Banner & Welcome Text) */}
            <div
              className="relative h-full flex-1 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 group"
              style={{
                transformStyle: 'preserve-3d',
                transform: isDivided
                  ? 'perspective(1200px) rotateY(0deg) translateZ(60px) scale(1.04)'
                  : 'perspective(1200px) rotateY(0deg) translateZ(0px) scale(1)',
                boxShadow: isDivided
                  ? '0 30px 75px rgba(0, 0, 0, 0.8), 0 0 55px rgba(245, 158, 11, 0.55), inset 0 0 20px rgba(251, 191, 36, 0.3)'
                  : 'none',
                borderRadius: isDivided ? '20px' : '0px',
                border: isDivided ? '2px solid rgba(251, 191, 36, 0.8)' : 'none',
              }}
            >
              <img
                src="/images/welcome/welcome-center.jpg"
                alt="Sree Murugan & Sons - Central Medallion"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />

              {/* Center Medallion Golden Glare Effect */}
              <div 
                className={`absolute inset-0 bg-gradient-to-b from-amber-400/20 via-transparent to-black/40 transition-opacity duration-1000 pointer-events-none ${
                  isDivided ? 'opacity-100' : 'opacity-0'
                }`} 
              />

              {/* Center Glow Pulsing Frame */}
              {isDivided && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none ring-2 ring-amber-300/40 animate-pulse" />
              )}

              {/* Sub-label visible upon division */}
              {isDivided && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-amber-400/50 text-[10px] sm:text-xs font-black text-amber-300 tracking-wider uppercase animate-fadeIn whitespace-nowrap shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Sree Murugan & Sons</span>
                </div>
              )}
            </div>

            {/* PIECE 3: RIGHT PANEL (Radiant Rising Sun, Sunburst & Golden Light) */}
            <div
              className="relative h-full flex-1 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group"
              style={{
                transformStyle: 'preserve-3d',
                transform: isDivided
                  ? 'perspective(1200px) rotateY(-18deg) translateZ(-25px) scale(0.96)'
                  : 'perspective(1200px) rotateY(0deg) translateZ(0px) scale(1)',
                boxShadow: isDivided
                  ? '18px 25px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(217, 119, 6, 0.25)'
                  : 'none',
                borderRadius: isDivided ? '16px' : '0px',
                borderRight: isDivided ? '1.5px solid rgba(251, 191, 36, 0.5)' : 'none',
                borderTop: isDivided ? '1.5px solid rgba(251, 191, 36, 0.4)' : 'none',
                borderBottom: isDivided ? '1.5px solid rgba(251, 191, 36, 0.4)' : 'none',
              }}
            >
              <img
                src="/images/welcome/welcome-right.jpg"
                alt="Sree Murugan Sons - Radiant Sunrise"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />

              {/* Sunburst Glare Effect */}
              <div 
                className={`absolute inset-0 bg-gradient-to-tl from-amber-400/25 via-transparent to-white/10 transition-opacity duration-1000 pointer-events-none ${
                  isDivided ? 'opacity-100' : 'opacity-0'
                }`} 
              />

              {/* Sub-label visible upon division */}
              {isDivided && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-amber-400/30 text-[10px] font-bold text-amber-200 tracking-wider uppercase animate-fadeIn">
                  Quality & Trust
                </div>
              )}
            </div>

          </div>

          {/* Golden Rays emanating through the 3D Split gaps */}
          {isDivided && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-around -z-10 opacity-70">
              <div className="w-1.5 h-full bg-gradient-to-b from-amber-300/0 via-amber-300/40 to-amber-300/0 blur-md transform -rotate-6" />
              <div className="w-1.5 h-full bg-gradient-to-b from-amber-300/0 via-amber-300/40 to-amber-300/0 blur-md transform rotate-6" />
            </div>
          )}
        </div>

      </div>

      {/* Bottom Bar: Interactive Call to Action & Controls */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-3 relative z-20 pb-2">
        <button
          onClick={handleEnterWebsite}
          className="group relative px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] hover:from-[#F59E0B] hover:to-[#D97706] text-[#2E1B0E] font-heading font-black text-sm sm:text-base tracking-wide uppercase shadow-[0_10px_35px_rgba(245,158,11,0.4)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer flex items-center gap-3"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#2E1B0E] animate-pulse" />
          <span>Explore Sree Murugan & Sons</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#2E1B0E] group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[11px] sm:text-xs text-amber-200/60 font-medium text-center">
          Building Materials &bull; Steel &bull; Cement &bull; Asian Paints &bull; Hardware
        </p>
      </div>
    </div>
  );
}
