import { Play, Sparkles, ArrowRight, Layers, ShieldCheck, Heart } from 'lucide-react';

interface HomePageProps {
  onReplayVideo: () => void;
}

export default function HomePage({ onReplayVideo }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#070605] text-white selection:bg-amber-500/30 selection:text-white flex flex-col justify-between">
      
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 px-6 py-5 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-amber-400/40 p-0.5 bg-amber-500/10 flex items-center justify-center">
              <span className="font-instrument text-amber-300 font-bold text-base">SM</span>
            </div>
            <div>
              <h1 className="font-instrument text-lg tracking-wider text-white font-normal">
                Sree Murugan &amp; Sons
              </h1>
              <p className="text-[10px] tracking-widest uppercase text-amber-300/70">
                Heritage &bull; Estd. 1978
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm text-white font-medium hover:text-amber-300 transition-colors">
              Home
            </a>
            <a href="#collections" className="text-sm text-white/70 font-medium hover:text-white transition-colors">
              Collections
            </a>
            <a href="#heritage" className="text-sm text-white/70 font-medium hover:text-white transition-colors">
              Heritage
            </a>
            <a href="#contact" className="text-sm text-white/70 font-medium hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Replay Video Action */}
          <button
            onClick={onReplayVideo}
            className="liquid-glass rounded-full px-5 py-2 text-xs font-medium tracking-wider uppercase text-amber-200 hover:text-white flex items-center gap-2 hover:bg-white/5 transition-all cursor-pointer"
          >
            <Play size={14} className="text-amber-400 fill-amber-400" />
            <span>Replay Video</span>
          </button>
        </div>
      </header>

      {/* 2. Welcome Hero on the Home Page */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        
        {/* Badge */}
        <div className="liquid-glass rounded-full px-4 py-1.5 flex items-center gap-2 text-xs text-amber-300 mb-8">
          <Sparkles size={14} />
          <span className="tracking-widest uppercase font-semibold">Welcome to the Official Home Page</span>
        </div>

        {/* Main Title in Instrument Serif */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight font-instrument font-normal mb-6 leading-tight">
          Crafted with devotion, <br />
          <span className="italic text-amber-200/90">treasured for generations.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
          We have arrived at the home page. Now we can design every section step by step according to your vision.
        </p>

        {/* Placeholder Step-by-Step Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left my-8">
          
          <div className="liquid-glass rounded-2xl p-6 border border-white/5 hover:border-amber-400/40 transition-all">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
              <Layers size={18} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 font-instrument">
              Step 1: Hero Banner
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Tell me how you would like the hero layout, banners, or featured promotions to look.
            </p>
          </div>

          <div className="liquid-glass rounded-2xl p-6 border border-white/5 hover:border-amber-400/40 transition-all">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 font-instrument">
              Step 2: Collections &amp; Showcase
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              We can display curated categories, jewelry items, or custom products in interactive cards.
            </p>
          </div>

          <div className="liquid-glass rounded-2xl p-6 border border-white/5 hover:border-amber-400/40 transition-all">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
              <Heart size={18} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 font-instrument">
              Step 3: Heritage &amp; Story
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Share the brand history, artisan values, and customer contact / inquiry options.
            </p>
          </div>

        </div>

        {/* CTA prompt */}
        <div className="mt-8">
          <button
            onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
            className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
          >
            <span>Ready for Step 1</span>
            <ArrowRight size={16} className="text-amber-400" />
          </button>
        </div>

      </main>

      {/* 3. Footer */}
      <footer className="py-8 px-6 border-t border-white/5 bg-black/40 text-center text-xs text-white/40">
        <p>&copy; {new Date().getFullYear()} Sree Murugan &amp; Sons. Ready to design step by step.</p>
      </footer>

    </div>
  );
}
