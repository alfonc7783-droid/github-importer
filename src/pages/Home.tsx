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
    /**
     * GuestsProvider оборачивает всю страницу, чтобы:
     * - RSVPSection мог добавлять гостей
     * - GuestsSection мог отображать список гостей
     */
    <GuestsProvider>
      <div className="min-h-screen bg-background">
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ГЛОБАЛЬНЫЕ КОМПОНЕНТЫ */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        
        {/* Навигационное меню (фиксированное сверху) */}
        <Navigation />
        
        {/* Декоративный диско-шар (параллакс при прокрутке) */}
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
        
        {/* Анкета подтверждения участия (RSVP) */}
        <RSVPSection />
        
        {/* Список гостей и Telegram-группа */}
        <GuestsSection />
      </div>
    </GuestsProvider>
  );
};

export default Home;
