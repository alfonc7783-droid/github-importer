import { Link } from 'react-router-dom';
import { MapPin, Clock, Shirt, Gift, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import jerryDance from '@/assets/jerry-dance.gif';

const detailCards = [
  {
    icon: MapPin,
    title: 'Место',
    description: 'HolidayPark',
    href: '/venue',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Clock,
    title: 'Расписание',
    description: 'План мероприятий на день',
    href: '/schedule',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Shirt,
    title: 'Дресс-код',
    description: 'Рекомендации по одежде',
    href: '/dress-code',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Gift,
    title: 'Подарки',
    description: 'Информация о подарках',
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
          <span className="text-2xl">✨</span>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Детали
          </h2>
          <span className="text-2xl">✨</span>
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
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground mt-2" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Jerry dance GIF - moved below cards */}
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
