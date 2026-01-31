/**
 * =============================================================================
 * СЕКЦИЯ ДЕТАЛЕЙ — НАВИГАЦИОННЫЕ КАРТОЧКИ
 * =============================================================================
 * 
 * Файл: src/components/sections/DetailsSection.tsx
 * Описание: Карточки с ссылками на детали свадьбы
 * 
 * КАРТОЧКИ:
 * ─────────
 * 1. Место (/venue) — Где будет проходить свадьба
 * 2. Расписание (/schedule) — Программа дня
 * 3. Дресс-код (/dress-code) — Палитра цветов и примеры нарядов
 * 4. Подарки (/gifts) — Информация о подарках
 * 
 * СТИЛИЗАЦИЯ КАРТОЧЕК:
 * ────────────────────
 * - Сетка 2x2 (grid-cols-2)
 * - Белый фон с размытием (bg-white/80 backdrop-blur-sm)
 * - Тень при наведении (hover:shadow-lg)
 * - Иконка в круглом контейнере
 * 
 * АНИМАЦИЯ:
 * ─────────
 * - Внизу секции — танцующий Jerry (jerry-dance.gif)
 * 
 * @see src/pages/Venue.tsx - Страница места проведения
 * @see src/pages/Schedule.tsx - Страница расписания
 * @see src/pages/DressCode.tsx - Страница дресс-кода
 * @see src/pages/Gifts.tsx - Страница подарков
 */
import { Link } from 'react-router-dom';
import { MapPin, Clock, Shirt, Gift, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import jerryDance from '@/assets/jerry-dance.gif';

// ═══════════════════════════════════════════════════════════════════════════
// КОНФИГУРАЦИЯ КАРТОЧЕК
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Массив карточек с деталями мероприятия
 * 
 * @property icon - Иконка из lucide-react
 * @property title - Заголовок карточки
 * @property href - Путь для навигации
 * @property iconBg - Цвет фона иконки
 * @property iconColor - Цвет иконки
 */
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

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Секция с навигационными карточками
 * Ведут на отдельные страницы с деталями мероприятия
 */
const DetailsSection = () => {
  return (
    <section id="details" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ЗАГОЛОВОК СЕКЦИИ */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Детали
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-12">
          Всё, что нужно знать о нашем празднике
        </p>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* СЕТКА КАРТОЧЕК */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 gap-4">
          {detailCards.map((card) => (
            <Link key={card.title} to={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-white/80 backdrop-blur-sm border-0 shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  {/* Иконка в круглом контейнере */}
                  <div className={`w-14 h-14 rounded-full ${card.iconBg} flex items-center justify-center`}>
                    <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  {/* Заголовок карточки */}
                  <h3 className="font-semibold text-foreground text-lg">{card.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* АНИМАЦИЯ ТАНЦА */}
        {/* Декоративный элемент — танцующий Jerry */}
        {/* ═══════════════════════════════════════════════════════════ */}
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
