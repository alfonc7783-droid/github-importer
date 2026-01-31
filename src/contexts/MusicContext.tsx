/**
 * =============================================================================
 * КОНТЕКСТ УПРАВЛЕНИЯ ФОНОВОЙ МУЗЫКОЙ
 * =============================================================================
 * 
 * Файл: src/contexts/MusicContext.tsx
 * Описание: Глобальное управление воспроизведением фоновой музыки
 * 
 * ФУНКЦИОНАЛЬНОСТЬ:
 * ─────────────────
 * - Воспроизведение/пауза музыки
 * - Сохранение воспроизведения при переходах между страницами
 * - Синхронизация состояния UI с реальным состоянием аудио
 * 
 * ОСОБЕННОСТИ РЕАЛИЗАЦИИ:
 * ───────────────────────
 * - Используется глобальный объект Audio (вне React)
 * - Это позволяет музыке продолжать играть при навигации
 * - Громкость установлена на 50% для комфортного прослушивания
 * 
 * МУЗЫКАЛЬНЫЙ ФАЙЛ:
 * ─────────────────
 * Путь: /music/background.mp3 (в папке public)
 * 
 * ИСПОЛЬЗОВАНИЕ:
 * ──────────────
 * 1. MusicProvider уже обёрнут в App.tsx
 * 2. Используйте хук useMusic() в компонентах
 * 
 * @see src/components/MusicPlayer.tsx - Кнопка управления музыкой
 * @see src/pages/Index.tsx - Запуск музыки при клике на пластинку
 */
import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// ТИПЫ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Интерфейс контекста музыки
 * @property isPlaying - Флаг: музыка играет или нет
 * @property togglePlay - Переключить воспроизведение (play/pause)
 * @property startPlaying - Начать воспроизведение (используется на стартовом экране)
 */
interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  startPlaying: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// КОНТЕКСТ
// ═══════════════════════════════════════════════════════════════════════════

const MusicContext = createContext<MusicContextType | null>(null);

// ═══════════════════════════════════════════════════════════════════════════
// ГЛОБАЛЬНЫЙ АУДИО-ОБЪЕКТ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Глобальный аудио-объект
 * 
 * ВАЖНО: Объявлен вне компонента, чтобы:
 * - Не пересоздаваться при ремаунте компонентов
 * - Сохранять воспроизведение при навигации между страницами
 * - Избежать множественных экземпляров Audio
 */
let globalAudio: HTMLAudioElement | null = null;

// ═══════════════════════════════════════════════════════════════════════════
// ПРОВАЙДЕР
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Провайдер контекста музыки
 * Управляет глобальным состоянием воспроизведения
 */
export const MusicProvider = ({ children }: { children: ReactNode }) => {
  /** Состояние воспроизведения для UI */
  const [isPlaying, setIsPlaying] = useState(false);
  
  /** Флаг инициализации аудио (для предотвращения повторной инициализации) */
  const audioInitialized = useRef(false);

  /**
   * Инициализация аудио при первом рендере
   * и подписка на события play/pause
   */
  useEffect(() => {
    // Создаём аудио-объект только один раз
    if (!audioInitialized.current) {
      if (!globalAudio) {
        globalAudio = new Audio('/music/background.mp3');
        globalAudio.loop = true;    // Зацикленное воспроизведение
        globalAudio.volume = 0.5;   // Громкость 50%
      }
      audioInitialized.current = true;
    }

    // Обработчики для синхронизации UI с реальным состоянием аудио
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    globalAudio?.addEventListener('play', handlePlay);
    globalAudio?.addEventListener('pause', handlePause);
    
    // Проверяем текущее состояние (если музыка уже играет)
    if (globalAudio && !globalAudio.paused) {
      setIsPlaying(true);
    }

    // Очистка подписок при размонтировании
    return () => {
      globalAudio?.removeEventListener('play', handlePlay);
      globalAudio?.removeEventListener('pause', handlePause);
    };
  }, []);

  /**
   * Переключает воспроизведение музыки
   * Используется кнопкой MusicPlayer
   */
  const togglePlay = () => {
    if (globalAudio) {
      if (globalAudio.paused) {
        globalAudio.play();
      } else {
        globalAudio.pause();
      }
    }
  };

  /**
   * Запускает воспроизведение музыки
   * Используется при клике на пластинку на стартовом экране
   * 
   * ВАЖНО: Браузеры требуют user interaction для автовоспроизведения,
   * поэтому музыка запускается только при клике пользователя
   */
  const startPlaying = () => {
    if (globalAudio && globalAudio.paused) {
      globalAudio.play();
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, startPlaying }}>
      {children}
    </MusicContext.Provider>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// ХУК
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Хук для использования контекста музыки
 * 
 * @throws Error — если используется вне MusicProvider
 * @returns {MusicContextType} — объект с isPlaying, togglePlay, startPlaying
 * 
 * @example
 * const { isPlaying, togglePlay } = useMusic();
 * <button onClick={togglePlay}>{isPlaying ? 'Пауза' : 'Играть'}</button>
 */
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic должен использоваться внутри MusicProvider');
  }
  return context;
};
