/**
 * =============================================================================
 * СТРАНИЦА ДРЕСС-КОДА
 * =============================================================================
 * 
 * Файл: src/pages/DressCode.tsx
 * Описание: Палитра цветов и примеры нарядов для гостей
 * 
 * ЦВЕТОВАЯ ПАЛИТРА:
 * ─────────────────
 * - Розовый (hsl 350, 60%, 65%)
 * - Пыльная роза (hsl 350, 30%, 70%)
 * - Бежевый (hsl 30, 30%, 75%)
 * - Персиковый (hsl 30, 50%, 70%)
 * - Оливковый (hsl 90, 30%, 55%)
 * - Голубой (hsl 200, 50%, 70%)
 * 
 * ИЗОБРАЖЕНИЯ:
 * ────────────
 * 6 примеров нарядов для мужчин и женщин
 * Хранятся в src/assets/dress-code-*.jpg
 * 
 * СТРУКТУРА:
 * ──────────
 * 1. Заголовок с иконкой рубашки
 * 2. Описательный текст
 * 3. Круглые образцы цветов (6 штук)
 * 4. Сетка изображений 2x3 (или 3x2 на десктопе)
 * 
 * @see src/components/sections/DetailsSection.tsx - Ссылка на эту страницу
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shirt } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DiscoBall from '@/components/DiscoBall';
import MusicPlayer from '@/components/MusicPlayer';
import { Card, CardContent } from '@/components/ui/card';

// Изображения примеров нарядов
import dressCodeMenStyles from '@/assets/dress-code-men-styles.jpg';
import dressCodeWomenGroup from '@/assets/dress-code-women-group.jpg';
import dressCodeManClassic from '@/assets/dress-code-man-classic.jpg';
import dressCodeWomenPalette from '@/assets/dress-code-women-palette.jpg';
import dressCodeWomanPink from '@/assets/dress-code-woman-pink.jpg';
import dressCodeWomanBlue from '@/assets/dress-code-woman-blue.jpg';

// ═══════════════════════════════════════════════════════════════════════════
// КОНФИГУРАЦИЯ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Цветовая палитра дресс-кода
 * 
 * @property color - HSL-цвет для отображения
 * @property name - Название цвета (для tooltip)
 */
const colorPalette = [
  { color: 'hsl(350, 60%, 65%)', name: 'Розовый' },
  { color: 'hsl(350, 30%, 70%)', name: 'Пыльная роза' },
  { color: 'hsl(30, 30%, 75%)', name: 'Бежевый' },
  { color: 'hsl(30, 50%, 70%)', name: 'Персиковый' },
  { color: 'hsl(90, 30%, 55%)', name: 'Оливковый' },
  { color: 'hsl(200, 50%, 70%)', name: 'Голубой' },
];

/**
 * Изображения-примеры нарядов
 * 
 * @property src - Путь к изображению
 * @property alt - Описание для доступности
 */
const images = [
  { src: dressCodeMenStyles, alt: 'Мужские образы в светлых тонах' },
  { src: dressCodeWomenGroup, alt: 'Девушки в платьях палитры мероприятия' },
  { src: dressCodeManClassic, alt: 'Мужчина в классическом образе' },
  { src: dressCodeWomenPalette, alt: 'Палитра нарядов для гостей' },
  { src: dressCodeWomanPink, alt: 'Девушка в розовом платье' },
  { src: dressCodeWomanBlue, alt: 'Девушка в голубом платье' },
];

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

const DressCode = () => {
  const navigate = useNavigate();

  /**
   * Скролл к началу страницы при монтировании
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * Обработчик кнопки "Назад"
   * Переходит на /home и скроллит к секции деталей
   */
  const handleBackClick = () => {
    navigate('/home');
    setTimeout(() => {
      const element = document.getElementById('details');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Глобальные компоненты */}
      <Navigation />
      <DiscoBall />
      <MusicPlayer />
      
      <div className="pt-24 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          {/* ═══════════════════════════════════════════════════════════ */}
          {/* КНОПКА НАЗАД */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <button 
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к деталям
          </button>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* КАРТОЧКА С ДРЕСС-КОДОМ */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
            <CardContent className="p-8 text-center">
              {/* Декоративный заголовок */}
              <div className="flex justify-center gap-2 text-primary mb-4">
                <span>✿</span>
                <Shirt className="w-6 h-6" />
                <span>✿</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Дресс-код
              </h1>
              
              {/* Эмодзи */}
              <div className="flex justify-center gap-2 text-2xl mb-6">
                👗🎀👔
              </div>
              
              {/* Описание */}
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Мы очень ждём и готовимся к нашему незабываемому дню! 
                Поддержите нас Вашими улыбками и объятиями, 
                а также красивыми нарядами в палитре мероприятия:
              </p>

              {/* ═══════════════════════════════════════════════════════ */}
              {/* ЦВЕТОВАЯ ПАЛИТРА */}
              {/* ═══════════════════════════════════════════════════════ */}
              <div className="flex justify-center gap-3 mb-8 flex-wrap">
                {colorPalette.map((item, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full shadow-md border-2 border-white/50"
                    style={{ backgroundColor: item.color }}
                    title={item.name}
                  />
                ))}
              </div>

              {/* ═══════════════════════════════════════════════════════ */}
              {/* СЕТКА ИЗОБРАЖЕНИЙ */}
              {/* 2 колонки на мобильных, 3 на десктопе */}
              {/* ═══════════════════════════════════════════════════════ */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DressCode;
