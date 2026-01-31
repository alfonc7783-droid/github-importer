import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const guests = [
  { name: 'Иван Петров', extra: '+1 гость' },
  { name: 'Анна Сидорова', extra: null },
  { name: 'Елена Смирнова', extra: '+2 гостя' },
];

const GuestsSection = () => {
  return (
    <section id="guests" className="py-20 px-4">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Наши гости
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Придут: {guests.length + 3} гостей
        </p>

        <div className="space-y-3 mb-8">
          {guests.map((guest, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardContent className="p-4 flex items-center justify-between">
                <span className="text-foreground">{guest.name}</span>
                {guest.extra && (
                  <span className="text-sm text-muted-foreground">{guest.extra}</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">
              Telegram-группа для гостей
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Делитесь фото и видео со свадьбы, задавайте вопросы
            </p>
            <Button asChild variant="outline">
              <a 
                href="https://t.me/+6Kz1-1tr12wzNDYy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Присоединяйтесь!
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GuestsSection;
