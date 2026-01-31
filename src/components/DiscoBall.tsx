import { useEffect, useState } from 'react';

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
      <div 
        className="w-40 h-40 md:w-52 md:h-52 rounded-full relative animate-spin-slow"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, transparent 30%),
            radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.7) 0%, transparent 20%),
            radial-gradient(circle at 50% 50%, #d4d4d4 0%, #a1a1a1 30%, #737373 60%, #525252 100%)
          `,
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.3),
            inset 0 -10px 30px rgba(0, 0, 0, 0.2),
            inset 0 10px 30px rgba(255, 255, 255, 0.3)
          `,
        }}
      >
        {/* Disco facets pattern */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `
              repeating-conic-gradient(
                from 0deg,
                rgba(255, 255, 255, 0.1) 0deg 5deg,
                transparent 5deg 10deg
              ),
              repeating-linear-gradient(
                0deg,
                rgba(200, 200, 200, 0.3) 0px,
                rgba(150, 150, 150, 0.3) 8px,
                rgba(200, 200, 200, 0.3) 16px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(200, 200, 200, 0.3) 0px,
                rgba(150, 150, 150, 0.3) 8px,
                rgba(200, 200, 200, 0.3) 16px
              )
            `,
          }}
        />
        
        {/* Shine overlay */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)',
          }}
        />
        
        {/* Light reflections */}
        <div 
          className="absolute top-[15%] left-[25%] w-6 h-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute top-[25%] right-[30%] w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, transparent 70%)',
          }}
        />
      </div>
      
      {/* String */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 -top-20 w-0.5 h-20"
        style={{
          background: 'linear-gradient(to bottom, transparent, #a1a1a1)',
        }}
      />
    </div>
  );
};

export default DiscoBall;
