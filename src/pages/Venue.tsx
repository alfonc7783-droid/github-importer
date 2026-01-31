/**
 * Страница места проведения свадьбы
 * HolidayPark — Лесная усадьба, Ижевск
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DiscoBall from '@/components/DiscoBall';
import MusicPlayer from '@/components/MusicPlayer';
import { Card, CardContent } from '@/components/ui/card';

const Venue = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate('/home');
    setTimeout(() => {
      const element = document.getElementById('details');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <DiscoBall />
      <MusicPlayer />
      
      <div className="pt-24 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <button 
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к деталям
          </button>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center gap-2 text-primary mb-4">
                <span>✿</span>
                <MapPin className="w-6 h-6" />
                <span>✿</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Место проведения
              </h1>
              
              <div className="flex justify-center gap-2 text-2xl mb-6">
                📍🌳🏡
              </div>
              
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                HolidayPark
              </h2>
              <p className="text-muted-foreground mb-8">
                Лесная усадьба в черте города, Ижевск, Удмуртская Республика
              </p>

              {/* Yandex Map embed */}
              <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden mb-4">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=53.262605%2C56.898190&z=16&pt=53.262605,56.898190,pm2rdm"
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                  allowFullScreen
                  title="Карта места проведения"
                  style={{ border: 0 }}
                />
              </div>
              
              <a 
                href="https://yandex.ru/maps/?pt=53.262605,56.898190&z=16&l=map"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Открыть в Яндекс Картах
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Venue;
