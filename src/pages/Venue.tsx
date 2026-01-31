import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';

const Venue = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <Link 
            to="/home#details" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к деталям
          </Link>

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

              {/* Map placeholder */}
              <div className="w-full h-64 md:h-80 bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground">Карта</p>
                  <a 
                    href="https://yandex.ru/maps/-/CHEezMqP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    Открыть в Яндекс Картах
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Venue;
