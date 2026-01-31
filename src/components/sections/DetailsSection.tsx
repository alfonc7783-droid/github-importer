import { Link } from 'react-router-dom';
import { MapPin, Calendar, Shirt, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import jerryDance from '@/assets/jerry-dance.gif';

const detailCards = [
  {
    icon: MapPin,
    title: 'Место',
    description: 'HolidayPark',
    href: '/venue',
  },
  {
    icon: Calendar,
    title: 'Расписание',
    description: 'План мероприятий на день',
    href: '/schedule',
  },
  {
    icon: Shirt,
    title: 'Дресс-код',
    description: 'Рекомендации по одежде',
    href: '/dress-code',
  },
  {
    icon: Gift,
    title: 'Подарки',
    description: 'Информация о подарках',
    href: '/gifts',
  },
];

const DetailsSection = () => {
  return (
    <section id="details" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Jerry dance GIF */}
        <div className="flex justify-center mb-8">
          <img 
            src={jerryDance} 
            alt="Dancing" 
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Детали
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Всё, что нужно знать о нашем празднике
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {detailCards.map((card) => (
            <Link key={card.title} to={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-card/50 backdrop-blur-sm border-primary/10">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
