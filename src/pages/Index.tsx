/**
 * =============================================================================
 * СТАРТОВЫЙ ЭКРАН — ВИНИЛОВАЯ ПЛАСТИНКА
 * =============================================================================
 * 
 * Файл: src/pages/Index.tsx
 * Описание: Первый экран, который видит пользователь
 * 
 * ФУНКЦИОНАЛЬНОСТЬ:
 * ─────────────────
 * 1. Отображает анимированную виниловую пластинку
 * 2. При клике на пластинку:
 *    - Запускается фоновая музыка
 *    - Происходит плавный переход на главную страницу
 * 
 * КОМПОНЕНТЫ:
 * ───────────
 * - SunburstBackground — Фон с радиальными лучами
 * - VinylRecord — Интерактивная пластинка
 * 
 * @see src/components/VinylRecord.tsx - Компонент пластинки
 * @see src/components/SunburstBackground.tsx - Фоновый узор
 * @see src/contexts/MusicContext.tsx - Управление музыкой
 */
import { useState } from 'react';
import VinylRecord from '@/components/VinylRecord';
import SunburstBackground from '@/components/SunburstBackground';
import { useNavigate } from 'react-router-dom';
import { useMusic } from '@/contexts/MusicContext';

const Index = () => {
  const navigate = useNavigate();
  
  /**
   * Состояние анимации перехода
   * При true — экран становится прозрачным перед переходом
   */
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  /**
   * Функция startPlaying из контекста музыки
   * Запускает фоновую музыку при первом клике
   */
  const { startPlaying } = useMusic();

  /**
   * Обработчик клика по виниловой пластинке
   * ─────────────────────────────────────────
   * 1. Активирует анимацию затухания (opacity: 0)
   * 2. Запускает фоновую музыку
   * 3. Через 500мс переходит на /home
   */
  const handleVinylClick = () => {
    setIsTransitioning(true);
    startPlaying(); // Запускаем музыку при клике
    setTimeout(() => {
      navigate('/home');
    }, 500);
  };

  return (
    <div 
      className={`min-h-screen relative flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Фон с радиальными лучами и блёстками */}
      <SunburstBackground />
      
      {/* Интерактивная виниловая пластинка */}
      <VinylRecord onClick={handleVinylClick} />
    </div>
  );
};

export default Index;
