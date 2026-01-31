import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shirt } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DiscoBall from '@/components/DiscoBall';
import MusicPlayer from '@/components/MusicPlayer';
import { Card, CardContent } from '@/components/ui/card';

import dressCodeManSuit from '@/assets/dress-code-man-suit.jpg';
import dressCodeWomenGroup from '@/assets/dress-code-women-group.jpg';
import dressCodeManClassic from '@/assets/dress-code-man-classic.jpg';
import dressCodeWomenPalette from '@/assets/dress-code-women-palette.jpg';
import dressCodeWomanPink from '@/assets/dress-code-woman-pink.jpg';
import dressCodeWomanBlue from '@/assets/dress-code-woman-blue.jpg';

const colorPalette = [
  { color: 'hsl(350, 60%, 65%)', name: 'Розовый' },
  { color: 'hsl(350, 30%, 70%)', name: 'Пыльная роза' },
  { color: 'hsl(30, 30%, 75%)', name: 'Бежевый' },
  { color: 'hsl(30, 50%, 70%)', name: 'Персиковый' },
  { color: 'hsl(90, 30%, 55%)', name: 'Оливковый' },
  { color: 'hsl(200, 50%, 70%)', name: 'Голубой' },
];

const images = [
  { src: dressCodeManSuit, alt: 'Мужчина в классическом чёрном костюме' },
  { src: dressCodeWomenGroup, alt: 'Девушки в платьях палитры мероприятия' },
  { src: dressCodeManClassic, alt: 'Мужчина в классическом образе' },
  { src: dressCodeWomenPalette, alt: 'Палитра нарядов для гостей' },
  { src: dressCodeWomanPink, alt: 'Девушка в розовом платье' },
  { src: dressCodeWomanBlue, alt: 'Девушка в голубом платье' },
];

const DressCode = () => {
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
                <Shirt className="w-6 h-6" />
                <span>✿</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Дресс-код
              </h1>
              
              <div className="flex justify-center gap-2 text-2xl mb-6">
                👗🎀👔
              </div>
              
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Мы очень ждём и готовимся к нашему незабываемому дню! 
                Поддержите нас Вашими улыбками и объятиями, 
                а также красивыми нарядами в палитре мероприятия:
              </p>

              {/* Color palette */}
              <div className="flex justify-center gap-3 mb-8 flex-wrap">
                {colorPalette.map((item, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full shadow-md border-2 border-white/50"
                    style={{ backgroundColor: item.color }}
                    title={item.name}
                  />
                ))}
              </div>

              {/* Images grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DressCode;
