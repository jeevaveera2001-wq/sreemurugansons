import React, { useEffect, useRef, useState } from 'react';

interface Scroll3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  intensity?: number;
}

export default function Scroll3D({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  intensity = 1,
}: Scroll3DProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [exitSide, setExitSide] = useState<'above' | 'below'>('below');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check where the element starts relative to the viewport
    const initialRect = el.getBoundingClientRect();
    const windowH = typeof window !== 'undefined' ? window.innerHeight : 800;
    if (initialRect.bottom < 0) {
      setExitSide('above');
    } else if (initialRect.top > windowH) {
      setExitSide('below');
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          // If boundingClientRect.top < 0, it scrolled off the top of the viewport (user scrolled down past it).
          // When the user scrolls back UP, it should re-enter from above.
          if (entry.boundingClientRect.top < 0) {
            setExitSide('above');
          } else {
            // It scrolled off the bottom of the viewport (user scrolled up past it).
            // When the user scrolls back DOWN, it should re-enter from below.
            setExitSide('below');
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '10px 0px -10px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute 3D initial transform based on direction & whether entering from above or below
  const getInitialTransform = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const rot = (isMobile ? 7 : 14) * intensity;
    const trans = (isMobile ? 22 : 45) * intensity;

    if (direction === 'left') {
      return `perspective(1200px) rotateY(${rot}deg) translateX(-${trans}px) translateZ(-20px) scale(0.97)`;
    }
    if (direction === 'right') {
      return `perspective(1200px) rotateY(-${rot}deg) translateX(${trans}px) translateZ(-20px) scale(0.97)`;
    }
    if (direction === 'down') {
      return `perspective(1200px) rotateX(-${rot}deg) translateY(-${trans}px) translateZ(-20px) scale(0.97)`;
    }

    // Default 'up' direction: adapts to scrolling up vs scrolling down
    if (exitSide === 'above') {
      // User is scrolling UP: element enters from top with subtle backward tilt and upward offset
      return `perspective(1200px) rotateX(-${rot}deg) translateY(-${trans}px) translateZ(-20px) scale(0.97)`;
    } else {
      // User is scrolling DOWN: element enters from bottom with forward tilt and downward offset
      return `perspective(1200px) rotateX(${rot}deg) translateY(${trans}px) translateZ(-20px) scale(0.97)`;
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transform: isVisible
          ? 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) translateZ(0px) scale(1)'
          : getInitialTransform(),
        opacity: isVisible ? 1 : 0,
        transition: isVisible
          ? `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
          : 'transform 0.35s ease-out, opacity 0.3s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/**
 * Interactive 3D Tilt Card that responds to mouse / touch moves
 * Gives real 3D depth, specular highlights, and perspective
 */
export function TiltCard3D({
  children,
  className = '',
  maxTilt = 10,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(10px) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.15s ease-out',
    });

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Specular 3D Glass Glare Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.5), transparent 75%)`,
          opacity: glarePos.opacity,
        }}
      />
      {children}
    </div>
  );
}
