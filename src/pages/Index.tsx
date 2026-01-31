import { useState } from 'react';
import VinylRecord from '@/components/VinylRecord';
import SunburstBackground from '@/components/SunburstBackground';
import WeddingInvitation from '@/components/WeddingInvitation';

const Index = () => {
  const [showInvitation, setShowInvitation] = useState(false);

  const handleVinylClick = () => {
    setShowInvitation(true);
  };

  const handleBack = () => {
    setShowInvitation(false);
  };

  if (showInvitation) {
    return <WeddingInvitation onBack={handleBack} />;
  }

  return (
    <div
      className={`min-h-screen relative flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        showInvitation ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <SunburstBackground />
      <VinylRecord onClick={handleVinylClick} />
    </div>
  );
};

export default Index;
