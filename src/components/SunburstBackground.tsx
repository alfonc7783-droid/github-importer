import Sparkle from './Sparkle';

const SunburstBackground = () => {
  const sparkles = [
    { top: '15%', left: '20%', size: 'lg' as const, delay: 0 },
    { top: '25%', right: '15%', size: 'md' as const, delay: 0.5 },
    { top: '60%', left: '10%', size: 'md' as const, delay: 0.3 },
    { top: '75%', right: '20%', size: 'lg' as const, delay: 0.7 },
    { top: '45%', left: '5%', size: 'sm' as const, delay: 0.2 },
    { top: '80%', left: '25%', size: 'sm' as const, delay: 0.4 },
    { top: '20%', right: '25%', size: 'sm' as const, delay: 0.6 },
    { top: '70%', right: '10%', size: 'md' as const, delay: 0.1 },
  ];

  return (
    <>
      {/* Sunburst pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: 'repeating-conic-gradient(hsl(350 55% 85%) 0deg, hsl(350 55% 85%) 10deg, hsl(350 45% 75%) 10deg, hsl(350 45% 75%) 20deg)',
        }}
      />
      
      {/* Sparkles */}
      {sparkles.map((sparkle, index) => (
        <Sparkle key={index} {...sparkle} />
      ))}
    </>
  );
};

export default SunburstBackground;
