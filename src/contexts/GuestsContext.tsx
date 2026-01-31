/**
 * Контекст для управления списком гостей
 * Хранит данные о гостях, заполнивших анкету
 * Использует localStorage для сохранения между сессиями
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const STORAGE_KEY = 'wedding-guests';

/** Структура данных гостя */
interface Guest {
  id: string;
  name: string;
  guestCount: string;
  attending: 'yes' | 'no';
}

/** Интерфейс контекста гостей */
interface GuestsContextType {
  guests: Guest[];
  addGuest: (guest: Omit<Guest, 'id'>) => void;
}

const GuestsContext = createContext<GuestsContextType | undefined>(undefined);

/** Загрузка гостей из localStorage */
const loadGuests = (): Guest[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/** Сохранение гостей в localStorage */
const saveGuests = (guests: Guest[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
  } catch {
    console.error('Failed to save guests to localStorage');
  }
};

/** Провайдер контекста гостей */
export const GuestsProvider = ({ children }: { children: ReactNode }) => {
  const [guests, setGuests] = useState<Guest[]>(loadGuests);

  // Сохраняем при изменении списка
  useEffect(() => {
    saveGuests(guests);
  }, [guests]);

  const addGuest = (guestData: Omit<Guest, 'id'>) => {
    const newGuest: Guest = {
      ...guestData,
      id: Date.now().toString(),
    };
    setGuests(prev => [...prev, newGuest]);
  };

  return (
    <GuestsContext.Provider value={{ guests, addGuest }}>
      {children}
    </GuestsContext.Provider>
  );
};

/** Хук для использования контекста гостей */
export const useGuests = () => {
  const context = useContext(GuestsContext);
  if (!context) {
    throw new Error('useGuests must be used within a GuestsProvider');
  }
  return context;
};
