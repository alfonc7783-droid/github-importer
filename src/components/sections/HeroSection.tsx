/**
 * =============================================================================
 * СЕКЦИЯ HERO — ГЛАВНЫЙ ЭКРАН ПРИГЛАШЕНИЯ
 * =============================================================================
 * 
 * Файл: src/components/sections/HeroSection.tsx
 * Описание: Первая секция на главной странице с именами молодожёнов
 * 
 * СОДЕРЖАНИЕ:
 * ───────────
 * - Приветственный текст "Приглашаем Вас на нашу свадьбу!"
 * - Имена молодожёнов: Алексей 💍 Мария
 * - Дата свадьбы: 3 июля 2026
 * - Анимация с Гомером (homer-bride.gif)
 * - Индикатор прокрутки (стрелка вниз)
 * 
 * ШРИФТЫ:
 * ───────
 * - Marck Script — декоративный рукописный шрифт для даты и приветствия
 * - По умолчанию — для имён (жирный, крупный)
 * 
 * ОСОБЕННОСТИ:
 * ────────────
 * - min-h-screen — занимает весь экран
 * - pt-32 — отступ под диско-шар
 * - Кнопка со стрелкой плавно скроллит к секции "Детали"
 * 
 * @see src/pages/Home.tsx - Родительский компонент
 * @see src/assets/homer-bride.gif - Анимация
 */
import homerBride from '@/assets/homer-bride-new.gif';
import { ChevronDown } from 'lucide-react';
import '@fontsource/marck-script';

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Главный экран с именами и датой свадьбы
 * Занимает весь экран (min-h-screen)
 */
const HeroSection = () => {
  /**
   * Плавный скролл к секции деталей
   * Вызывается при клике на стрелку внизу экрана
   */
  const scrollToDetails = () => {
    const element = document.getElementById('details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative pt-32">
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ОСНОВНОЙ КОНТЕНТ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="text-center px-4 mt-16 md:mt-24">
        {/* Приветственный текст (рукописный шрифт) */}
        <p 
          className="text-muted-foreground text-2xl md:text-3xl mb-6"
          style={{ fontFamily: "'Marck Script', cursive" }}
        >
          Приглашаем Вас на нашу свадьбу!
        </p>
        
        {/* Имена молодожёнов */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 flex items-center justify-center gap-4 flex-wrap">
          <span>Алексей</span>
          <span className="text-4xl md:text-5xl">💍</span>
          <span>Мария</span>
        </h1>
        
        {/* Дата свадьбы (рукописный шрифт) */}
        <p 
          className="text-3xl md:text-5xl text-muted-foreground mt-6"
          style={{ fontFamily: "'Marck Script', cursive" }}
        >
          3 июля 2026
        </p>

        {/* Анимация с Гомером */}
        <div className="mt-8">
          <img 
            src={homerBride} 
            alt="Свадебная анимация" 
            className="w-40 h-32 md:w-56 md:h-44 object-contain mx-auto rounded-lg"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ИНДИКАТОР ПРОКРУТКИ */}
      {/* Стрелка внизу экрана с анимацией bounce */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <button 
        onClick={scrollToDetails}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default HeroSection;
