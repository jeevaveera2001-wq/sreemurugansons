import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay muted to respect mobile and desktop browser policies
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay initial notice:', err);
      });
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(currentProgress);

    // Fade out smoothly right before video ends
    if (video.duration - video.currentTime <= 0.45 && !isFadingOut) {
      setIsFadingOut(true);
    }
  };

  const handleVideoEnded = () => {
    try {
      sessionStorage.setItem('sms_intro_watched', 'true');
    } catch (e) {}
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  const handleSkip = () => {
    try {
      sessionStorage.setItem('sms_intro_watched', 'true');
    } catch (e) {}
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 w-full h-[100dvh] bg-[#0A0502] overflow-hidden z-50 flex items-center justify-center select-none transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Ambient Background Video (Paints portrait/mobile letterboxing with matching motion light) */}
      <video
        src="/gemini_generated_video_enhanced.mp4"
        autoPlay
        playsInline
        muted
        loop
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none select-none"
      />

      {/* Subtle Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />

      {/* 2. Main Crisp Video Player - Correctly assigned to fit mobile and desktop screens without cropping */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-0 sm:p-4">
        <video
          ref={videoRef}
          src="/gemini_generated_video_enhanced.mp4"
          autoPlay
          playsInline
          muted
          webkit-playsinline="true"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onError={handleSkip}
          className="w-full h-full object-contain object-center max-h-[100dvh] shadow-2xl"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            filter: 'contrast(1.03) brightness(1.01)',
          }}
        />
      </div>

      {/* 3. Top Navigation Bar: Quality Badge & Enter Website (No volume button, fully mobile responsive) */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-3 sm:p-6 pointer-events-auto">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/images/logo-transparent.png"
            alt="Sree Murugan Sons Logo"
            className="w-8 h-8 sm:w-11 sm:h-11 object-contain filter drop-shadow(0 2px 6px rgba(0,0,0,0.5))"
          />
          <div className="liquid-glass rounded-full px-2.5 py-1 sm:px-4 sm:py-1.5 flex items-center gap-1.5 border border-amber-400/40 bg-black/50 shadow-[0_0_20px_rgba(255,215,0,0.25)]">
            <Sparkles size={11} className="text-amber-400 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-amber-200 truncate">
              Sree Murugan Sons
            </span>
          </div>
        </div>

        {/* Enter Website Button */}
        <button
          onClick={handleSkip}
          className="liquid-glass rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white hover:text-amber-300 flex items-center gap-1.5 sm:gap-2 hover:bg-white/10 transition-all cursor-pointer border border-amber-400/50 shadow-[0_0_15px_rgba(255,215,0,0.3)] active:scale-95 bg-black/40"
        >
          <span>Enter Website</span>
          <ArrowRight size={13} className="text-amber-400 shrink-0" />
        </button>
      </div>

      {/* 4. Bottom Playback Progress Bar */}
      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-200 to-white transition-all duration-150 ease-linear shadow-[0_0_12px_rgba(255,215,0,0.9)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
