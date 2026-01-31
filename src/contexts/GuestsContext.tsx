/**
 * =============================================================================
 * КОНТЕКСТ УПРАВЛЕНИЯ СПИСКОМ ГОСТЕЙ
 * =============================================================================
 * 
 * Файл: src/contexts/GuestsContext.tsx
 * Описание: Глобальное состояние для хранения и управления списком гостей
 * 
 * ФУНКЦИОНАЛЬНОСТЬ:
 * ─────────────────
 * - Хранение списка гостей, заполнивших анкету
 * - Добавление новых гостей
 * - Сохранение данных в localStorage (данные не теряются при перезагрузке)
 * 
 * ИСПОЛЬЗОВАНИЕ:
 * ──────────────
 * 1. Оберните компоненты в <GuestsProvider>
 * 2. Используйте хук useGuests() для доступа к данным
 * 
 * ПРИМЕР:
 * ───────
 * const { guests, addGuest } = useGuests();
 * addGuest({ name: 'Иван', guestCount: '2', attending: 'yes' });
 * 
 * ОГРАНИЧЕНИЯ:
 * ────────────
 * - Данные хранятся только в браузере пользователя
 * - Другие устройства не увидят эти данные
 * - Для синхронизации между устройствами нужна база данных
 * 
 * @see src/components/sections/RSVPSection.tsx - Форма добавления гостей
 * @see src/components/sections/GuestsSection.tsx - Отображение списка гостей
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// КОНСТАНТЫ
// ═══════════════════════════════════════════════════════════════════════════

/** Ключ для хранения данных в localStorage */
const STORAGE_KEY = 'wedding-guests';

// ═══════════════════════════════════════════════════════════════════════════
// ТИПЫ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Структура данных одного гостя
 * @property id - Уникальный идентификатор (timestamp)
 * @property name - Имя гостя
 * @property guestCount - Количество человек ('1', '2', '3', '4', '5', '6+')
 * @property attending - Придёт ли гость ('yes' | 'no')
 */
interface Guest {
  id: string;
  name: string;
  guestCount: string;
  attending: 'yes' | 'no';
  drinks: string[];
  customDrink: string;
  comment: string;
}

/**
 * Интерфейс контекста
 * @property guests - Массив всех гостей
 * @property addGuest - Функция добавления нового гостя
 */
interface GuestsContextType {
  guests: Guest[];
  addGuest: (guest: Omit<Guest, 'id'>) => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// КОНТЕКСТ
// ═══════════════════════════════════════════════════════════════════════════

const GuestsContext = createContext<GuestsContextType | undefined>(undefined);

// ═══════════════════════════════════════════════════════════════════════════
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Загружает список гостей из localStorage
 * @returns Массив гостей или пустой массив при ошибке
 */
const loadGuests = (): Guest[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((guest) => ({
      id: String(guest.id ?? Date.now()),
      name: String(guest.name ?? ''),
      guestCount: String(guest.guestCount ?? '1'),
      attending: guest.attending === 'no' ? 'no' : 'yes',
      drinks: Array.isArray(guest.drinks) ? guest.drinks : [],
      customDrink: String(guest.customDrink ?? ''),
      comment: String(guest.comment ?? ''),
    }));
  } catch {
    console.error('Ошибка загрузки гостей из localStorage');
    return [];
  }
};

/**
 * Сохраняет список гостей в localStorage
 * @param guests - Массив гостей для сохранения
 */
const saveGuests = (guests: Guest[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
  } catch {
    console.error('Ошибка сохранения гостей в localStorage');
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// ПРОВАЙДЕР
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Провайдер контекста гостей
 * Оборачивает компоненты и предоставляет доступ к списку гостей
 */
export const GuestsProvider = ({ children }: { children: ReactNode }) => {
  /**
   * Состояние списка гостей
   * Инициализируется данными из localStorage
   */
  const [guests, setGuests] = useState<Guest[]>(loadGuests);

  /**
   * Автосохранение при изменении списка гостей
   * Срабатывает каждый раз при добавлении нового гостя
   */
  useEffect(() => {
    saveGuests(guests);
  }, [guests]);

  /**
   * Добавляет нового гостя в список
   * @param guestData - Данные гостя без id (id генерируется автоматически)
   */
  const addGuest = (guestData: Omit<Guest, 'id'>) => {
    const newGuest: Guest = {
      ...guestData,
      id: Date.now().toString(), // Уникальный id на основе timestamp
    };
    setGuests(prev => [...prev, newGuest]);
  };

  return (
    <GuestsContext.Provider value={{ guests, addGuest }}>
      {children}
    </GuestsContext.Provider>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// ХУК
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Хук для использования контекста гостей
 * 
 * @throws Error — если используется вне GuestsProvider
 * @returns {GuestsContextType} — объект с guests и addGuest
 * 
 * @example
 * const { guests, addGuest } = useGuests();
 * console.log(guests.length); // Количество гостей
 */
export const useGuests = () => {
  const context = useContext(GuestsContext);
  if (!context) {
    throw new Error('useGuests должен использоваться внутри GuestsProvider');
  }
  return context;
};
