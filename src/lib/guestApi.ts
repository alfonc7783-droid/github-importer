/**
 * =============================================================================
 * API ДЛЯ СОХРАНЕНИЯ ОТВЕТОВ ГОСТЕЙ
 * =============================================================================
 * 
 * Файл: src/lib/guestApi.ts
 * Описание: Функции для отправки данных анкеты гостя на сервер
 * 
 * ФУНКЦИОНАЛЬНОСТЬ:
 * ─────────────────
 * - Отправка данных RSVP на backend API (/api/rsvp)
 * - Типизированный payload для согласования с сервером
 * 
 * ENDPOINT:
 * ─────────
 * POST /api/rsvp
 * Content-Type: application/json
 * 
 * ПРИМЕЧАНИЕ:
 * ───────────
 * Backend должен быть настроен отдельно (nginx + Node.js API).
 * Данные также сохраняются локально в localStorage через GuestsContext.
 * 
 * @see src/components/sections/RSVPSection.tsx - Использование API
 * @see src/contexts/GuestsContext.tsx - Локальное хранение
 */

// ═══════════════════════════════════════════════════════════════════════════
// ТИПЫ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Payload для отправки на сервер
 * 
 * ВАЖНО: Структура строго валидируется на backend (Zod).
 * Любые изменения должны быть синхронизированы с серверной частью.
 * 
 * @property name - Имя гостя (одно или несколько, если семья)
 * @property guestCount - Количество человек ('1' - '6' или '6+')
 * @property attending - Придёт ли гость ('yes' | 'no')
 * @property drinks - Массив выбранных напитков (id из списка)
 * @property customDrink - Свой вариант напитка (если выбран "custom")
 * @property comment - Комментарий от гостя
 */
export interface GuestResponsePayload {
  name: string;
  guestCount: '1' | '2' | '3' | '4' | '5' | '6' | '6+';
  attending: 'yes' | 'no';
  drinks: string[];
  customDrink: string;
  comment: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// API-ФУНКЦИИ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Отправляет ответ гостя на сервер
 * 
 * @param payload - Данные анкеты гостя
 * @throws Error — если сервер вернул ошибку
 * 
 * @example
 * try {
 *   await saveGuestResponse({
 *     name: 'Иван Петров',
 *     guestCount: '2',
 *     attending: 'yes',
 *     drinks: ['champagne', 'red-wine'],
 *     customDrink: '',
 *     comment: 'Ждём с нетерпением!'
 *   });
 * } catch (error) {
 *   console.error('Не удалось отправить данные на сервер');
 * }
 */
export const saveGuestResponse = async (payload: GuestResponsePayload): Promise<void> => {
  const response = await fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  // Обработка ошибок от сервера
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const data = await response.json();
      message = data?.error || data?.message || message;
    } catch {
      // Игнорируем ошибки парсинга JSON
    }
    throw new Error(`RSVP не отправлено: ${message}`);
  }
};
