interface SparkleProps {
  top: string;
  left?: string;
  right?: string;
  size: 'sm' | 'md' | 'lg';
  delay: number;
}

const sizeMap = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

const Sparkle = ({ top, left, right, size, delay }: SparkleProps) => {
  return (
    <div
      className={`absolute ${sizeMap[size]} animate-sparkle`}
      style={{
        top,
        left,
        right,
        animationDelay: `${delay}s`,
      }}
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-full h-full drop-shadow-lg">
        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
      </svg>
    </div>
  );
};

export default Sparkle;
