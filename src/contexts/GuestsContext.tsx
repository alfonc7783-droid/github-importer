/**
 * Контекст для управления списком гостей
 * Хранит данные о гостях, заполнивших анкету
 */
import { createContext, useContext, useState, ReactNode } from 'react';

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

/** Провайдер контекста гостей */
export const GuestsProvider = ({ children }: { children: ReactNode }) => {
  const [guests, setGuests] = useState<Guest[]>([]);

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
