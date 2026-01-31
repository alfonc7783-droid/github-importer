import { useState } from 'react';
import VinylRecord from '@/components/VinylRecord';
import SunburstBackground from '@/components/SunburstBackground';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleVinylClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/home');
    }, 500);
  };

  return (
    <div 
      className={`min-h-screen relative flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <SunburstBackground />
      <VinylRecord onClick={handleVinylClick} />
    </div>
  );
};

export default Index;
