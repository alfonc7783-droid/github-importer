export interface GuestResponsePayload {
  name: string;
  guestCount: '1' | '2' | '3' | '4' | '5' | '6' | '6+';
  attending: 'yes' | 'no';
  drinks: string[];
  customDrink: string;
  comment: string;
}

/**
 * Истинный контракт API RSVP.
 * Backend строго валидирует формат (Zod); любые изменения синхронизировать с backend.
 */
export const saveGuestResponse = async (payload: GuestResponsePayload): Promise<void> => {
  const response = await fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const data = await response.json();
      message = data?.error || data?.message || message;
    } catch {
      // ignore JSON parsing errors
    }
    throw new Error(`RSVP не отправлено: ${message}`);
  }
};
