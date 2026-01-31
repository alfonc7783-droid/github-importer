import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

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
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Дата свадьбы
        </h2>
        <p className="text-center text-muted-foreground mb-4">
          Отметьте этот день в своём календаре
        </p>
        <p className="text-center text-2xl font-semibold text-foreground mb-8">
          3 июля 2026
        </p>

        <Card className="max-w-md mx-auto mb-12 bg-card/50 backdrop-blur-sm border-primary/10">
          <CardContent className="p-6">
            <h3 className="text-center font-semibold text-foreground mb-4">
              Июль 2026
            </h3>
            
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                <div key={day} className="text-center text-xs text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`text-center py-2 text-sm rounded-full ${
                    day === 3
                      ? 'bg-primary text-primary-foreground font-bold'
                      : day
                      ? 'text-foreground'
                      : ''
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
            
            <p className="text-center text-sm text-primary mt-4">
              — День свадьбы 💕
            </p>
          </CardContent>
        </Card>

        {/* Countdown */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">До свадьбы осталось:</p>
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground">
                {timeLeft.days}
              </div>
              <div className="text-sm text-muted-foreground">дней</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground">
                {timeLeft.hours}
              </div>
              <div className="text-sm text-muted-foreground">часов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground">
                {timeLeft.minutes}
              </div>
              <div className="text-sm text-muted-foreground">минут</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground">
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
