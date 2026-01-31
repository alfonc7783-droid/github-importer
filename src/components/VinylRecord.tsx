import { Heart } from 'lucide-react';

interface VinylRecordProps {
  onClick: () => void;
  isSpinning?: boolean;
}

const VinylRecord = ({ onClick, isSpinning = true }: VinylRecordProps) => {
  return (
    <button
      onClick={onClick}
      className="relative cursor-pointer transition-all duration-1000 z-10 hover:scale-105 focus:outline-none"
    >
      {/* Main vinyl disc */}
      <div
        className={`w-72 h-72 md:w-96 md:h-96 rounded-full relative ${isSpinning ? 'animate-spin-slow' : ''}`}
        style={{
          background: `
            radial-gradient(circle, hsl(0 0% 10%) 0%, hsl(0 0% 10%) 12%, transparent 12%),
            repeating-radial-gradient(circle, hsl(0 0% 16%) 0px, hsl(0 0% 10%) 1px, hsl(0 0% 16%) 2px, hsl(0 0% 10%) 3px)
          `,
          boxShadow: 'rgba(0, 0, 0, 0.4) 0px 15px 50px, rgba(0, 0, 0, 0.3) 0px 0px 30px inset',
        }}
      >
        {/* Vinyl shine overlay */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%)',
          }}
        />

        {/* Vinyl grooves */}
        <div
          className="absolute inset-[15%] rounded-full"
          style={{
            background: 'repeating-radial-gradient(circle, transparent 0px, rgba(60, 60, 60, 0.3) 1px, transparent 2px)',
          }}
        />

        {/* Gold center label */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center animate-pulse-glow"
          style={{
            background: 'linear-gradient(145deg, hsl(48 85% 55%) 0%, hsl(46 90% 50%) 100%)',
            boxShadow: 'rgba(255, 255, 255, 0.3) 0px 2px 4px inset, rgba(0, 0, 0, 0.2) 0px 4px 8px',
          }}
        >
          <Heart
            className="w-8 h-8 md:w-10 md:h-10"
            fill="hsl(350 60% 70%)"
            color="hsl(350 60% 70%)"
          />
        </div>

        {/* Center spindle hole */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: 'hsl(350 45% 75%)',
          }}
        />
      </div>

      {/* Instruction text */}
      <p className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-foreground/80 text-lg font-sans whitespace-nowrap">
        Чтобы открыть приглашение
      </p>
      <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-foreground/80 text-lg font-sans whitespace-nowrap">
        нажми на пластинку
      </p>
    </button>
  );
};

export default VinylRecord;
