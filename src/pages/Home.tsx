/**
 * =============================================================================
 * ГЛАВНАЯ СТРАНИЦА ПРИГЛАШЕНИЯ
 * =============================================================================
 * 
 * Файл: src/pages/Home.tsx
 * Описание: Основная страница свадебного приглашения со всеми секциями
 * 
 * СТРУКТУРА СТРАНИЦЫ (сверху вниз):
 * ─────────────────────────────────
 * 1. Navigation    — Фиксированное меню навигации
 * 2. DiscoBall     — Декоративный диско-шар с параллакс-эффектом
 * 3. MusicPlayer   — Плавающая кнопка управления музыкой
 * 4. HeroSection   — Имена молодожёнов и дата свадьбы
 * 5. DetailsSection — Карточки: место, расписание, дресс-код, подарки
 * 6. DateSection   — Календарь с датой и обратный отсчёт
 * 7. RSVPSection   — Анкета гостя (форма подтверждения участия)
 * 8. GuestsSection — Список гостей и Telegram-группа
 * 
 * КОНТЕКСТЫ:
 * ──────────
 * - GuestsProvider — Управление списком гостей (localStorage)
 * - MusicProvider  — Управление музыкой (подключен в App.tsx)
 * 
 * @see src/components/sections/ - Все секции страницы
 * @see src/contexts/GuestsContext.tsx - Контекст гостей
 */
import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DiscoBall from '@/components/DiscoBall';
import MusicPlayer from '@/components/MusicPlayer';
import HeroSection from '@/components/sections/HeroSection';
import DetailsSection from '@/components/sections/DetailsSection';
import DateSection from '@/components/sections/DateSection';

const Home = () => {
  /**
   * Состояние для плавного появления страницы
   * При монтировании компонента запускается fade-in анимация
   */
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Небольшая задержка для запуска анимации появления
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`min-h-screen bg-background transition-opacity duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ГЛОБАЛЬНЫЕ КОМПОНЕНТЫ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      
      {/* Навигационное меню (фиксированное сверху) */}
      <Navigation />
      
      {/* Декоративный диско-шар (фиксированный сверху) */}
      <DiscoBall />
      
      {/* Кнопка управления музыкой (фиксированная снизу справа) */}
      <MusicPlayer />
      
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* СЕКЦИИ СТРАНИЦЫ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      
      {/* Главный экран: имена и дата */}
      <HeroSection />
      
      {/* Карточки с деталями мероприятия */}
      <DetailsSection />
      
      {/* Календарь и обратный отсчёт */}
      <DateSection />
      
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* TELEGRAM-ГРУППА */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4">
        <div className="flex flex-col items-center">
          <a 
            href="https://t.me/+Kk9Nr48YK1xjOWQy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0088cc] hover:bg-[#006699] transition-colors shadow-lg mb-4"
            aria-label="Присоединиться к Telegram группе"
          >
            <Send className="w-9 h-9 text-white" />
          </a>
          <p className="text-sm text-muted-foreground text-center">
            Присоединяйтесь к нашему каналу
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
