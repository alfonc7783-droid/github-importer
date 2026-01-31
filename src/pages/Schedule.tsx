import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Heart, Utensils, Music } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DiscoBall from '@/components/DiscoBall';
import MusicPlayer from '@/components/MusicPlayer';
import { Card, CardContent } from '@/components/ui/card';

const scheduleItems = [
  { time: '15:45', title: 'Сбор гостей', emoji: '👋', icon: Users },
  { time: '16:15', title: 'Церемония', emoji: '💍', icon: Heart },
  { time: '17:00', title: 'Банкет', emoji: '🍽️', icon: Utensils },
  { time: '22:00', title: 'Завершение вечера', emoji: '🎇', icon: Music },
];

const Schedule = () => {
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
                <Clock className="w-6 h-6" />
                <span>✿</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Расписание дня
              </h1>
              
              <div className="flex justify-center gap-2 text-2xl mb-8">
                ⏰💕🎊
              </div>

              <div className="space-y-4 w-full max-w-xl mx-auto">
                {scheduleItems.map((item, index) => (
                  <Card key={index} className="bg-background/50 border-primary/10">
                    <CardContent className="p-4 md:p-5">
                      <div className="grid grid-cols-[40px_1fr_40px] md:grid-cols-[48px_1fr_48px] items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        </div>
                        <div className="text-left">
                          <span className="font-bold text-foreground text-base md:text-lg">{item.time}</span>
                          <span className="text-muted-foreground ml-2 md:ml-3 text-sm md:text-base">{item.title}</span>
                        </div>
                        <div className="flex justify-center">
                          <span className="text-xl md:text-2xl">{item.emoji}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="mt-8 text-muted-foreground flex items-center justify-center gap-2">
                🎉 Ждём вас! 🎉
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
