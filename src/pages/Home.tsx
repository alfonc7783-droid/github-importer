import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import DetailsSection from '@/components/sections/DetailsSection';
import DateSection from '@/components/sections/DateSection';
import RSVPSection from '@/components/sections/RSVPSection';
import GuestsSection from '@/components/sections/GuestsSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <DetailsSection />
      <DateSection />
      <RSVPSection />
      <GuestsSection />
    </div>
  );
};

export default Home;
