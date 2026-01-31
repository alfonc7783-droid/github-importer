import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Calendar, Heart } from 'lucide-react';
import '@fontsource/marck-script';

const WEDDING_DATE = new Date('2026-07-03T16:15:00');

const DateSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = WEDDING_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Generate calendar for July 2026
  const daysInMonth = 31;
  const firstDayOfMonth = 2; // Wednesday (0 = Monday in our grid)
  const calendarDays = [];
  
  // Empty cells for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <section id="date" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header with calendar icon */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Calendar className="w-8 h-8 text-primary" />
          <h2 
            className="text-3xl md:text-4xl text-foreground"
            style={{ fontFamily: "'Marck Script', cursive" }}
          >
            3 июля 2026
          </h2>
        </div>

        <Card className="max-w-md mx-auto mb-12 bg-white/90 backdrop-blur-sm border border-border/50 shadow-lg">
          <CardContent className="p-6">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <h3 className="font-semibold text-foreground text-lg">
                Июль 2026
              </h3>
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                <div key={day} className="text-center text-sm text-muted-foreground py-2 font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center py-2"
                >
                  {day === 3 ? (
                    <div className="relative">
                      <Heart 
                        className="w-10 h-10 text-primary fill-primary/20" 
                        strokeWidth={1.5}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">
                        {day}
                      </span>
                    </div>
                  ) : (
                    <span className={`text-sm ${day ? 'text-foreground' : ''}`}>
                      {day}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-2 mt-6 text-primary">
              <Heart className="w-5 h-5 fill-primary/20" strokeWidth={1.5} />
              <span className="text-sm">— День свадьбы 💕</span>
            </div>
          </CardContent>
        </Card>

        {/* Countdown */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">До свадьбы осталось:</p>
          <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
            <div className="bg-primary/10 rounded-2xl px-5 py-4 min-w-[80px]">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {timeLeft.days}
              </div>
              <div className="text-sm text-muted-foreground">дня</div>
            </div>
            <div className="bg-primary/10 rounded-2xl px-5 py-4 min-w-[80px]">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {timeLeft.hours}
              </div>
              <div className="text-sm text-muted-foreground">часов</div>
            </div>
            <div className="bg-primary/10 rounded-2xl px-5 py-4 min-w-[80px]">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {timeLeft.minutes}
              </div>
              <div className="text-sm text-muted-foreground">минут</div>
            </div>
            <div className="bg-primary/10 rounded-2xl px-5 py-4 min-w-[80px]">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {timeLeft.seconds}
              </div>
              <div className="text-sm text-muted-foreground">секунд</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DateSection;
