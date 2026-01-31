export interface GuestResponsePayload {
  name: string;
  guestCount: string;
  attending: 'yes' | 'no';
  drinks: string[];
  customDrink: string;
  comment: string;
}

export const saveGuestResponse = async (payload: GuestResponsePayload) => {
  void payload;
  return Promise.resolve();
};
