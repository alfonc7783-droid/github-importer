/**
 * Главная секция приглашения
 * Имена молодожёнов, дата свадьбы и анимация
 */
import homerBride from '@/assets/homer-bride.gif';
import { ChevronDown } from 'lucide-react';
import '@fontsource/marck-script';

/** Главный экран с именами и датой */
const HeroSection = () => {
  /** Плавный скролл к секции деталей */
  const scrollToDetails = () => {
    const element = document.getElementById('details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative pt-32">
      {/* Основной контент */}
      <div className="text-center px-4 mt-16 md:mt-24">
        <p 
          className="text-muted-foreground text-2xl md:text-3xl mb-6"
          style={{ fontFamily: "'Marck Script', cursive" }}
        >
          Приглашаем Вас на нашу свадьбу!
        </p>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 flex items-center justify-center gap-4 flex-wrap">
          <span>Алексей</span>
          <span className="text-4xl md:text-5xl">💍</span>
          <span>Мария</span>
        </h1>
        
        <p 
          className="text-3xl md:text-5xl text-muted-foreground mt-6"
          style={{ fontFamily: "'Marck Script', cursive" }}
        >
          3 июля 2026
        </p>

        {/* Анимация Гомера */}
        <div className="mt-8">
          <img 
            src={homerBride} 
            alt="Свадебная анимация" 
            className="w-40 h-32 md:w-56 md:h-44 object-contain mx-auto rounded-lg"
          />
        </div>
      </div>

      {/* Индикатор прокрутки */}
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
