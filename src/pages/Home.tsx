import Navigation from '@/components/Navigation';
import DiscoBall from '@/components/DiscoBall';
import MusicPlayer from '@/components/MusicPlayer';
import HeroSection from '@/components/sections/HeroSection';
import DetailsSection from '@/components/sections/DetailsSection';
import DateSection from '@/components/sections/DateSection';
import RSVPSection from '@/components/sections/RSVPSection';
import GuestsSection from '@/components/sections/GuestsSection';
import { GuestsProvider } from '@/contexts/GuestsContext';

const Home = () => {
  return (
    <GuestsProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <DiscoBall />
        <MusicPlayer />
        <HeroSection />
        <DetailsSection />
        <DateSection />
        <RSVPSection />
        <GuestsSection />
      </div>
    </GuestsProvider>
  );
};

export default Home;
