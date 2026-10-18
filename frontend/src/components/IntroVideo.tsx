import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay muted to respect browser autoplay policies
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

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen bg-black overflow-hidden z-50 transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Full-Screen Enhanced 4K/QHD Video Player */}
      <video
        ref={videoRef}
        src="/gemini_generated_video_enhanced.mp4"
        autoPlay
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onError={handleSkip}
        style={{
          imageRendering: '-webkit-optimize-contrast',
          filter: 'contrast(1.03) brightness(1.01)',
        }}
        className="w-full h-full object-cover object-center pointer-events-none select-none"
      />

      {/* 2. Top-Left: Quality Badge with Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 sm:gap-3">
        <img
          src="/images/logo-transparent.png"
          alt="Sree Murugan Sons Logo"
          className="w-9 h-9 sm:w-12 sm:h-12 object-contain filter drop-shadow(0 2px 6px rgba(0,0,0,0.4))"
        />
        <div className="liquid-glass rounded-full px-3 py-1 sm:px-4 sm:py-1.5 flex items-center gap-1.5 sm:gap-2 border border-amber-400/40 bg-black/40 shadow-[0_0_20px_rgba(255,215,0,0.25)]">
          <Sparkles size={12} className="text-amber-400 animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-amber-200 truncate">
            Sree Murugan Sons
          </span>
        </div>
      </div>

      {/* 3. Top-Right: Sound Control & Enter Website Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2 sm:gap-3">
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="liquid-glass rounded-full p-2.5 sm:p-3 text-white/80 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          title={isMuted ? "Unmute Soundtrack" : "Mute Soundtrack"}
          aria-label="Toggle Sound"
        >
          {isMuted ? (
            <VolumeX size={16} />
          ) : (
            <>
              <Volume2 size={16} className="text-amber-300" />
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-amber-300 pr-1 hidden xs:inline">Audio On</span>
            </>
          )}
        </button>

        {/* Enter Website Button */}
        <button
          onClick={handleSkip}
          className="liquid-glass rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white hover:text-amber-300 flex items-center gap-1.5 sm:gap-2 hover:bg-white/10 transition-all cursor-pointer border border-amber-400/40 shadow-[0_0_15px_rgba(255,215,0,0.2)]"
        >
          <span>Enter Website</span>
          <ArrowRight size={13} className="text-amber-400 shrink-0" />
        </button>
      </div>

      {/* 4. Bottom Playback Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-200 to-white transition-all duration-150 ease-linear shadow-[0_0_10px_rgba(255,215,0,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
