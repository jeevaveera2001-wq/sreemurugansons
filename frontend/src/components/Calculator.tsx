import { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Layers, Wrench, Droplet, Box, Sparkles } from 'lucide-react';
import Scroll3D from './Scroll3D';

interface EstimateData {
  area: number;
  floors: number;
  estimates: {
    cement: { amount: number; unit: string; brands: string[] };
    steel: { amount: number; unit: string; grades: string[] };
    paint: { amount: number; unit: string; brands: string[] };
    sand: { amount: number; unit: string };
    bricks: { amount: number; unit: string };
  };
  storeAdvice: string;
}

interface CalculatorProps {
  onOpenQuote: () => void;
}

export default function Calculator({ onOpenQuote }: CalculatorProps) {
  const [sqft, setSqft] = useState(1200);
  const [floors, setFloors] = useState(1);
  const [data, setData] = useState<EstimateData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchEstimate() {
      setLoading(true);
      try {
        const res = await fetch(`/api/quotes/estimate?sqft=${sqft}&floors=${floors}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        const total = sqft * floors;
        setData({
          area: total,
          floors,
          estimates: {
            cement: { amount: Math.round(total * 0.4), unit: 'bags (50kg)', brands: ['UltraTech Super', 'Ramco'] },
            steel: { amount: +(total * 0.0035).toFixed(2), unit: 'metric tons (MT)', grades: ['Tata Tiscon 550D', 'JSW'] },
            paint: { amount: Math.round(total * 0.18), unit: 'litres', brands: ['Asian Paints Apex', 'Royale'] },
            sand: { amount: Math.round(total * 1.8), unit: 'cft (M-Sand/P-Sand)' },
            bricks: { amount: Math.round(total * 8.5), unit: 'pieces (Fly Ash / Red Clay)' },
          },
          storeAdvice: 'Free doorstep site delivery available across Harur & Dharmapuri.',
        });
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchEstimate, 150);
    return () => clearTimeout(timer);
  }, [sqft, floors]);

  return (
    <section id="calculator" className="py-16 sm:py-24 relative overflow-hidden border-b border-white/60">
      
      {/* Background Refraction Glow */}
      <div className="ambient-glow-orange w-[500px] h-[500px] top-1/4 -right-20 opacity-25" />
      <div className="ambient-glow-amber w-[450px] h-[450px] bottom-10 -left-20 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header in Glossy Pod */}
        <Scroll3D direction="up" delay={0.05}>
          <div className="max-w-3xl mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glossy-pill text-[#92400E] text-[10px] sm:text-xs font-bold mb-3 max-w-full">
              <CalcIcon size={14} className="text-[#D97706] shrink-0" />
              <span className="truncate">Interactive Construction Estimation Tool</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse shrink-0" />
            </div>
            <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-black text-[#2E1B0E] tracking-tight leading-tight">
              Calculate Building Materials for Your Site
            </h2>
            <p className="text-xs sm:text-sm text-[#5C3D2E] mt-2 font-medium">
              Powered by standard civil engineering formulas and live stock availability at Sree Murugan Sons.
            </p>
          </div>
        </Scroll3D>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start perspective-container">
          
          {/* Controls Form in Glossy Card */}
          <Scroll3D direction="left" delay={0.1} className="lg:col-span-5">
            <div className="glossy-card p-4 sm:p-8 rounded-3xl space-y-5 sm:space-y-6">
              
              {/* Square Feet Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2E1B0E]">
                    Built-up Area (Sq. Ft)
                  </label>
                  <span className="text-sm sm:text-base font-black text-[#B45309] font-mono drop-shadow-2xs">
                    {sqft.toLocaleString()} sq.ft
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="8000"
                  step="50"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full accent-[#D97706] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-bold mt-1 font-mono">
                  <span>300 sq.ft</span>
                  <span>4,000 sq.ft</span>
                  <span>8,000 sq.ft</span>
                </div>
              </div>

              {/* Number of Floors */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2E1B0E] mb-2">
                  Number of Floors
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFloors(f)}
                      className={`py-2 rounded-2xl font-black text-xs transition-all cursor-pointer ${
                        floors === f
                          ? 'golden-btn text-white shadow-md'
                          : 'glossy-pill text-[#2E1B0E] hover:bg-white hover:text-[#D97706]'
                      }`}
                    >
                      {f === 1 ? 'G (1)' : `G+${f - 1} (${f})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Construction Area Display with Chart Visual Accent (Matching Reference Image) */}
              <div className="p-3.5 sm:p-4 rounded-2xl golden-tag text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#92400E] font-extrabold uppercase text-[10px] tracking-wider">Total Slab / Plinth Area:</span>
                  <span className="text-[10px] sm:text-xs font-bold text-[#B45309] bg-amber-200/80 px-2 py-0.5 rounded-md">Civil BOQ</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#2E1B0E] font-mono">
                  {(sqft * floors).toLocaleString()} <span className="text-xs font-bold text-[#5C3D2E]">sq.ft</span>
                </div>
                
                {/* Golden Mini Graph Wave (Reference Image Aesthetic) */}
                <div className="h-6 w-full flex items-end gap-1 pt-1 opacity-70">
                  <div className="w-1/6 bg-amber-400 rounded-t h-[40%]" />
                  <div className="w-1/6 bg-amber-500 rounded-t h-[65%]" />
                  <div className="w-1/6 bg-amber-400 rounded-t h-[50%]" />
                  <div className="w-1/6 bg-amber-500 rounded-t h-[80%]" />
                  <div className="w-1/6 bg-[#D97706] rounded-t h-[95%]" />
                  <div className="w-1/6 bg-[#B45309] rounded-t h-[70%]" />
                </div>
              </div>

              {/* Request Quote with these values */}
              <button
                onClick={onOpenQuote}
                className="golden-btn w-full py-3.5 rounded-2xl text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>Get Wholesale Price for this BOQ</span>
              </button>

            </div>
          </Scroll3D>

          {/* Results Grid with Glossy Crystal Cards in 3D */}
          <Scroll3D direction="right" delay={0.2} className="lg:col-span-7">
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 transition-opacity duration-200 ${loading ? 'opacity-60' : 'opacity-100'}`}>
              
              {/* Cement */}
              <div className="glossy-card p-6 rounded-3xl flex flex-col justify-between group hover:shadow-[0_16px_32px_rgba(217,119,6,0.14)]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold uppercase text-[#92400E] tracking-wider">Cement Requirement</span>
                    <div className="w-9 h-9 rounded-xl golden-tag flex items-center justify-center text-[#D97706] shadow-2xs group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:to-[#D97706] group-hover:text-white transition-all">
                      <Wrench size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#2E1B0E] font-mono">
                    {data?.estimates.cement.amount.toLocaleString()}{' '}
                    <span className="text-xs font-bold text-[#5C3D2E]">Bags</span>
                  </div>
                  <div className="text-[11px] text-[#5C3D2E] mt-2 font-medium">
                    UltraTech Super, Ramco Supercrete (50kg bags)
                  </div>
                </div>
              </div>

              {/* TMT Steel */}
              <div className="glossy-card p-6 rounded-3xl flex flex-col justify-between group hover:shadow-[0_16px_32px_rgba(217,119,6,0.14)]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold uppercase text-[#92400E] tracking-wider">TMT Steel Rebars</span>
                    <div className="w-9 h-9 rounded-xl golden-tag flex items-center justify-center text-[#D97706] shadow-2xs group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:to-[#D97706] group-hover:text-white transition-all">
                      <Layers size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#2E1B0E] font-mono">
                    {data?.estimates.steel.amount}{' '}
                    <span className="text-xs font-bold text-[#5C3D2E]">Metric Tons</span>
                  </div>
                  <div className="text-[11px] text-[#5C3D2E] mt-2 font-medium">
                    Tata Tiscon / JSW Neosteel Fe 550D (8mm to 25mm)
                  </div>
                </div>
              </div>

              {/* Asian Paints */}
              <div className="glossy-card p-6 rounded-3xl flex flex-col justify-between group hover:shadow-[0_16px_32px_rgba(217,119,6,0.14)]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold uppercase text-[#92400E] tracking-wider">Paint & Primer</span>
                    <div className="w-9 h-9 rounded-xl golden-tag flex items-center justify-center text-[#D97706] shadow-2xs group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:to-[#D97706] group-hover:text-white transition-all">
                      <Droplet size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#2E1B0E] font-mono">
                    {data?.estimates.paint.amount.toLocaleString()}{' '}
                    <span className="text-xs font-bold text-[#5C3D2E]">Litres</span>
                  </div>
                  <div className="text-[11px] text-[#5C3D2E] mt-2 font-medium">
                    Apex Ultima, Royale Luxury, Damp Proof Primers
                  </div>
                </div>
              </div>

              {/* Bricks & Masonry */}
              <div className="glossy-card p-6 rounded-3xl flex flex-col justify-between group hover:shadow-[0_16px_32px_rgba(217,119,6,0.14)]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold uppercase text-[#92400E] tracking-wider">Bricks & Sand</span>
                    <div className="w-9 h-9 rounded-xl golden-tag flex items-center justify-center text-[#D97706] shadow-2xs group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:to-[#D97706] group-hover:text-white transition-all">
                      <Box size={18} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#2E1B0E] font-mono">
                    {data?.estimates.bricks.amount.toLocaleString()}{' '}
                    <span className="text-xs font-bold text-[#5C3D2E]">Bricks</span>
                  </div>
                  <div className="text-[11px] text-[#5C3D2E] mt-2 font-medium">
                    Approx. {data?.estimates.sand.amount.toLocaleString()} CFT M-Sand / P-Sand
                  </div>
                </div>
              </div>

            </div>
          </Scroll3D>

        </div>

      </div>
    </section>
  );
}
