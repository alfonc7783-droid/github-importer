import { useEffect, useState } from 'react';
import discoBallGif from '@/assets/disco-ball.gif';

const DiscoBall = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed left-1/2 -translate-x-1/2 z-40 pointer-events-none"
      style={{ 
        top: `${Math.min(scrollY * 0.3, 100) - 40}px`,
      }}
    >
      {/* String */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 -top-32 w-0.5 h-32"
        style={{
          background: 'linear-gradient(to bottom, transparent, #c0c0c0)',
        }}
      />
      
      {/* Disco ball GIF - silver and 2x bigger */}
      <img 
        src={discoBallGif} 
        alt="Disco Ball" 
        className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
        style={{
          filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3)) saturate(0) brightness(1.3)',
        }}
      />
      
      {/* Light rays/reflections */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-1 h-20 opacity-30 animate-pulse"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent)',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoBall;
