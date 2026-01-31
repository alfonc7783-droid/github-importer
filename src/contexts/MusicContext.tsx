/**
 * Контекст управления фоновой музыкой
 * Обеспечивает воспроизведение музыки при переходах между страницами
 */
import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

/** Интерфейс контекста музыки */
interface MusicContextType {
  isPlaying: boolean;        // Флаг воспроизведения
  togglePlay: () => void;    // Переключить воспроизведение
  startPlaying: () => void;  // Начать воспроизведение
}

const MusicContext = createContext<MusicContextType | null>(null);

// Глобальный аудио-объект для сохранения воспроизведения при навигации
let globalAudio: HTMLAudioElement | null = null;

/** Провайдер контекста музыки */
export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioInitialized = useRef(false);

  // Инициализация аудио при первом рендере
  useEffect(() => {
    if (!audioInitialized.current) {
      if (!globalAudio) {
        globalAudio = new Audio('/music/background.mp3');
        globalAudio.loop = true;   // Зацикливание
        globalAudio.volume = 0.5;  // Громкость 50%
      }
      audioInitialized.current = true;
    }

    // Синхронизация состояния с реальным состоянием аудио
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    globalAudio?.addEventListener('play', handlePlay);
    globalAudio?.addEventListener('pause', handlePause);
    
    // Проверка текущего состояния
    if (globalAudio && !globalAudio.paused) {
      setIsPlaying(true);
    }

    return () => {
      globalAudio?.removeEventListener('play', handlePlay);
      globalAudio?.removeEventListener('pause', handlePause);
    };
  }, []);

  /** Переключить воспроизведение музыки */
  const togglePlay = () => {
    if (globalAudio) {
      if (globalAudio.paused) {
        globalAudio.play();
      } else {
        globalAudio.pause();
      }
    }
  };

  /** Начать воспроизведение (используется при клике на пластинку) */
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

/** Хук для использования контекста музыки */
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic должен использоваться внутри MusicProvider');
  }
  return context;
};
