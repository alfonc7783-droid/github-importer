import { useState, useRef, useEffect } from 'react';
import { Music, Music2 } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music/background.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    // Try to autoplay
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented, wait for user interaction
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-all shadow-lg"
      aria-label={isPlaying ? 'Остановить музыку' : 'Включить музыку'}
    >
      {isPlaying ? (
        <Music2 className="w-6 h-6 text-primary animate-pulse" />
      ) : (
        <Music className="w-6 h-6 text-primary" />
      )}
    </button>
  );
};

export default MusicPlayer;
