/**
 * Компонент управления музыкой
 * Плавающая кнопка для включения/выключения фоновой музыки
 */
import { Music, Music2 } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

/** Кнопка управления музыкой с анимированными нотами */
const MusicPlayer = () => {
  const { isPlaying, togglePlay } = useMusic();

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-all shadow-lg overflow-visible"
      aria-label={isPlaying ? 'Остановить музыку' : 'Включить музыку'}
    >
      {isPlaying ? (
        <>
          <Music2 className="w-6 h-6 text-primary animate-pulse" />
          {/* Анимированные плавающие ноты */}
          <span className="absolute animate-note-1 text-primary text-lg">♪</span>
          <span className="absolute animate-note-2 text-primary text-lg">♫</span>
          <span className="absolute animate-note-3 text-primary text-lg">♪</span>
          <span className="absolute animate-note-4 text-primary text-lg">♬</span>
        </>
      ) : (
        <Music className="w-6 h-6 text-primary" />
      )}
    </button>
  );
};

export default MusicPlayer;
