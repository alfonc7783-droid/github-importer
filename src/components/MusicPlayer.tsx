/**
 * =============================================================================
 * КОМПОНЕНТ УПРАВЛЕНИЯ МУЗЫКОЙ
 * =============================================================================
 * 
 * Файл: src/components/MusicPlayer.tsx
 * Описание: Плавающая кнопка для включения/выключения фоновой музыки
 * 
 * ФУНКЦИОНАЛЬНОСТЬ:
 * ─────────────────
 * - Кнопка фиксирована в правом нижнем углу экрана
 * - При воспроизведении:
 *   • Иконка пульсирует
 *   • Вокруг летают анимированные музыкальные ноты
 * - При паузе: статичная иконка музыки
 * 
 * СТИЛИЗАЦИЯ:
 * ───────────
 * - Круглая кнопка 56x56px (w-14 h-14)
 * - Полупрозрачный фон с размытием
 * - Плавная анимация при наведении
 * - z-index: 50 — поверх всего контента
 * 
 * АНИМАЦИИ НОТ:
 * ─────────────
 * Ноты (♪ ♫ ♬) плавают вверх с разной скоростью и направлением.
 * Анимации определены в src/index.css:
 * - animate-note-1, animate-note-2, animate-note-3, animate-note-4
 * 
 * @see src/contexts/MusicContext.tsx - Контекст управления музыкой
 * @see src/index.css - CSS-анимации для нот
 */
import { Music, Music2 } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Кнопка управления музыкой с анимированными нотами
 * Использует контекст MusicContext для управления воспроизведением
 */
const MusicPlayer = () => {
  /**
   * isPlaying — флаг воспроизведения
   * togglePlay — функция переключения play/pause
   */
  const { isPlaying, togglePlay } = useMusic();

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-all shadow-lg overflow-visible"
      aria-label={isPlaying ? 'Остановить музыку' : 'Включить музыку'}
    >
      {isPlaying ? (
        <>
          {/* ═══════════════════════════════════════════════════════════ */}
          {/* СОСТОЯНИЕ: МУЗЫКА ИГРАЕТ */}
          {/* ═══════════════════════════════════════════════════════════ */}
          
          {/* Пульсирующая иконка */}
          <Music2 className="w-6 h-6 text-primary animate-pulse" />
          
          {/* Анимированные плавающие ноты */}
          <span className="absolute animate-note-1 text-primary text-lg">♪</span>
          <span className="absolute animate-note-2 text-primary text-lg">♫</span>
          <span className="absolute animate-note-3 text-primary text-lg">♪</span>
          <span className="absolute animate-note-4 text-primary text-lg">♬</span>
        </>
      ) : (
        /* ═══════════════════════════════════════════════════════════ */
        /* СОСТОЯНИЕ: МУЗЫКА НА ПАУЗЕ */
        /* ═══════════════════════════════════════════════════════════ */
        <Music className="w-6 h-6 text-primary" />
      )}
    </button>
  );
};

export default MusicPlayer;
