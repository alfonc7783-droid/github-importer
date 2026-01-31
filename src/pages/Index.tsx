import { useState } from 'react';
import VinylRecord from '@/components/VinylRecord';
import SunburstBackground from '@/components/SunburstBackground';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleVinylClick = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <SunburstBackground />
      <VinylRecord onClick={handleVinylClick} />
    </div>
  );
};

export default Index;
