import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

// Global audio instance to persist across navigations
let globalAudio: HTMLAudioElement | null = null;

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioInitialized = useRef(false);

  useEffect(() => {
    if (!audioInitialized.current) {
      if (!globalAudio) {
        globalAudio = new Audio('/music/background.mp3');
        globalAudio.loop = true;
        globalAudio.volume = 0.5;
      }
      audioInitialized.current = true;
    }

    // Sync state with actual audio state
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    globalAudio?.addEventListener('play', handlePlay);
    globalAudio?.addEventListener('pause', handlePause);
    
    // Check current state
    if (globalAudio && !globalAudio.paused) {
      setIsPlaying(true);
    }

    return () => {
      globalAudio?.removeEventListener('play', handlePlay);
      globalAudio?.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (globalAudio) {
      if (globalAudio.paused) {
        globalAudio.play();
      } else {
        globalAudio.pause();
      }
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
};
