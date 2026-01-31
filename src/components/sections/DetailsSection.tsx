/**
 * Секция деталей свадьбы
 * Навигационные карточки: место, расписание, дресс-код, подарки
 */
import { Link } from 'react-router-dom';
import { MapPin, Clock, Shirt, Gift, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import jerryDance from '@/assets/jerry-dance.gif';

/** Карточки с деталями мероприятия */
const detailCards = [
  {
    icon: MapPin,
    title: 'Место',
    href: '/venue',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Clock,
    title: 'Расписание',
    href: '/schedule',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Shirt,
    title: 'Дресс-код',
    href: '/dress-code',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Gift,
    title: 'Подарки',
    href: '/gifts',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
];

const DetailsSection = () => {
  return (
    <section id="details" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Детали
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-12">
          Всё, что нужно знать о нашем празднике
        </p>

        <div className="grid grid-cols-2 gap-4">
          {detailCards.map((card) => (
            <Link key={card.title} to={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-white/80 backdrop-blur-sm border-0 shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className={`w-14 h-14 rounded-full ${card.iconBg} flex items-center justify-center`}>
                    <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{card.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Анимация танца Jerry */}
        <div className="flex justify-center mt-12">
          <img 
            src={jerryDance} 
            alt="Dancing" 
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
