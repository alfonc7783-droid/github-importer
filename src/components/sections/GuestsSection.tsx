/**
 * Секция для гостей
 * Показывает список гостей и ссылку на Telegram-группу
 */
import { Send, Users, User } from 'lucide-react';
import { useGuests } from '@/contexts/GuestsContext';
import { Card, CardContent } from '@/components/ui/card';

/** Форматирование количества гостей */
const formatGuestCount = (count: string) => {
  const num = parseInt(count);
  if (count === '6+') return '6+ человек';
  if (num === 1) return '1 человек';
  if (num >= 2 && num <= 4) return `${num} человека`;
  return `${num} человек`;
};

/** Секция с гостями и Telegram-группой */
const GuestsSection = () => {
  const { guests } = useGuests();
  
  // Фильтруем только тех, кто придёт
  const attendingGuests = guests.filter(g => g.attending === 'yes');

  return (
    <section id="guests" className="py-20 px-4">
      <div className="container mx-auto max-w-lg">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Наши гости
          </h2>
        </div>
        
        {attendingGuests.length > 0 ? (
          <div className="mb-8">
            <div className="grid gap-3">
              {attendingGuests.map((guest) => (
                <Card key={guest.id} className="bg-card/50 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{guest.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatGuestCount(guest.guestCount)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground mb-8">
            Список гостей появится после заполнения анкеты
          </p>
        )}

        <div className="text-center">
          <a 
            href="https://t.me/+6Kz1-1tr12wzNDYy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0088cc] hover:bg-[#006699] transition-colors shadow-lg mb-4"
            aria-label="Присоединиться к Telegram группе"
          >
            <Send className="w-9 h-9 text-white" />
          </a>
          <h3 className="font-semibold text-foreground mb-2">
            Telegram-группа для гостей
          </h3>
          <p className="text-sm text-muted-foreground">
            Делитесь фото и видео со свадьбы, задавайте вопросы
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuestsSection;

