/**
 * =============================================================================
 * СЕКЦИЯ ДАТЫ — КАЛЕНДАРЬ И ОБРАТНЫЙ ОТСЧЁТ
 * =============================================================================
 * 
 * Файл: src/components/sections/DateSection.tsx
 * Описание: Календарь июля 2026 с отметкой дня свадьбы и обратный отсчёт
 * 
 * ФУНКЦИОНАЛЬНОСТЬ:
 * ─────────────────
 * 1. Отображение календаря на июль 2026
 * 2. День свадьбы (3 июля) отмечен сердцем
 * 3. Живой обратный отсчёт: дни, часы, минуты, секунды
 * 
 * ДАТА СВАДЬБЫ:
 * ─────────────
 * 3 июля 2026 года, 16:15 (начало церемонии)
 * 
 * КАЛЕНДАРЬ:
 * ──────────
 * - Первый день июля 2026 — среда (индекс 2 в сетке Пн-Вс)
 * - 31 день в месяце
 * - День 3 выделен иконкой сердца
 * 
 * ОБРАТНЫЙ ОТСЧЁТ:
 * ────────────────
 * - Обновляется каждую секунду (setInterval 1000ms)
 * - Показывает: дней, часов, минут, секунд
 * - Использует difference между текущей датой и WEDDING_DATE
 * 
 * @see src/pages/Home.tsx - Родительский компонент
 */
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Calendar, Heart, CalendarHeart } from 'lucide-react';
import '@fontsource/marck-script';

// ═══════════════════════════════════════════════════════════════════════════
// КОНСТАНТЫ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Дата и время свадьбы
 * Используется для обратного отсчёта
 */
const WEDDING_DATE = new Date('2026-07-03T16:15:00');

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Секция с календарём и обратным отсчётом до свадьбы
 */
const DateSection = () => {
  /**
   * Состояние обратного отсчёта
   * Обновляется каждую секунду
   */
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  /**
   * Эффект для обратного отсчёта
   * Запускает интервал, который обновляет timeLeft каждую секунду
   */
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

    // Очистка интервала при размонтировании
    return () => clearInterval(timer);
  }, []);

  // ═══════════════════════════════════════════════════════════════════════
  // ГЕНЕРАЦИЯ КАЛЕНДАРЯ
  // ═══════════════════════════════════════════════════════════════════════
  
  const daysInMonth = 31;          // Дней в июле
  const firstDayOfMonth = 2;       // Среда (0 = Пн, 1 = Вт, 2 = Ср)
  const calendarDays: (number | null)[] = [];
  
  // Пустые ячейки до первого дня месяца
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Дни месяца
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <section id="date" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ЗАГОЛОВОК СЕКЦИИ */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <CalendarHeart className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Дата свадьбы
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-8">
          Отметьте этот день в своём календаре
        </p>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* КАРТОЧКА С КАЛЕНДАРЁМ */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <Card className="max-w-lg mx-auto bg-white border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            {/* Дата свадьбы с иконкой календаря */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <Calendar className="w-6 h-6 text-primary" />
              <p 
                className="text-2xl md:text-3xl text-foreground"
                style={{ fontFamily: "'Marck Script', cursive" }}
              >
                3 июля 2026
              </p>
            </div>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* НАВИГАЦИЯ ПО МЕСЯЦАМ (декоративная) */}
            {/* ═══════════════════════════════════════════════════════ */}
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
            
            {/* ═══════════════════════════════════════════════════════ */}
            {/* ЗАГОЛОВОК КАЛЕНДАРЯ (дни недели) */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                <div key={day} className="text-center text-sm text-muted-foreground py-2 font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            {/* ═══════════════════════════════════════════════════════ */}
            {/* ДНИ КАЛЕНДАРЯ */}
            {/* День 3 отмечен сердцем */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center py-2"
                >
                  {day === 3 ? (
                    // День свадьбы — с сердцем
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
                    // Обычный день
                    <span className={`text-sm ${day ? 'text-foreground' : ''}`}>
                      {day}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Легенда */}
            <div className="flex items-center justify-center gap-2 mt-6 text-primary">
              <Heart className="w-5 h-5 fill-primary/20" strokeWidth={1.5} />
              <span className="text-sm">— День свадьбы 💕</span>
            </div>

            {/* Разделитель */}
            <div className="border-t border-border/30 my-8" />

            {/* ═══════════════════════════════════════════════════════ */}
            {/* ОБРАТНЫЙ ОТСЧЁТ */}
            {/* ═══════════════════════════════════════════════════════ */}
            <div className="text-center">
              <p className="text-muted-foreground mb-6">До свадьбы осталось:</p>
              
              {/* Блоки с цифрами */}
              <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
                {/* Дни */}
                <div className="bg-primary/10 rounded-2xl px-5 py-4 min-w-[80px]">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {timeLeft.days}
                  </div>
                  <div className="text-sm text-muted-foreground">дня</div>
                </div>
                
                {/* Часы */}
                <div className="bg-primary/10 rounded-2xl px-5 py-4 min-w-[80px]">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {timeLeft.hours}
                  </div>
                  <div className="text-sm text-muted-foreground">часов</div>
                </div>
                
                {/* Минуты */}
                <div className="bg-primary/10 rounded-2xl px-5 py-4 min-w-[80px]">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-sm text-muted-foreground">минут</div>
                </div>
                
                {/* Секунды */}
                <div className="bg-primary/10 rounded-2xl px-5 py-4 min-w-[80px]">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-sm text-muted-foreground">секунд</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DateSection;
