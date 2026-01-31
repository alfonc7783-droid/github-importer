import { Card, CardContent } from '@/components/ui/card';
import { Send, Users } from 'lucide-react';

const GuestsSection = () => {
  return (
    <section id="guests" className="py-20 px-4">
      <div className="container mx-auto max-w-lg">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Наши гости
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-8">
          Список гостей появится после заполнения анкеты
        </p>

        <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">
              Telegram-группа для гостей
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Делитесь фото и видео со свадьбы, задавайте вопросы
            </p>
            <a 
              href="https://t.me/+6Kz1-1tr12wzNDYy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0088cc] hover:bg-[#006699] transition-colors shadow-lg"
              aria-label="Присоединиться к Telegram группе"
            >
              <Send className="w-6 h-6 text-white" />
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GuestsSection;
