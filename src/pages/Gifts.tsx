/**
 * =============================================================================
 * СТРАНИЦА ИНФОРМАЦИИ О ПОДАРКАХ
 * =============================================================================
 * 
 * Файл: src/pages/Gifts.tsx
 * Описание: Рекомендации для гостей по подаркам
 * 
 * СОДЕРЖАНИЕ:
 * ───────────
 * - Приветственный текст о том, что присутствие — лучший подарок
 * - Две карточки:
 *   1. Семейный бюджет — вклад в начало семейной жизни
 *   2. Ваше присутствие — главный подарок
 * 
 * СТИЛИЗАЦИЯ КАРТОЧЕК:
 * ────────────────────
 * - Семейный бюджет: розовый градиент (primary)
 * - Присутствие: золотой градиент (accent)
 * 
 * @see src/components/sections/DetailsSection.tsx - Ссылка на эту страницу
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Wallet, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import DiscoBall from '@/components/DiscoBall';
import MusicPlayer from '@/components/MusicPlayer';
import { Card, CardContent } from '@/components/ui/card';

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

const Gifts = () => {
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
          {/* КАРТОЧКА С ИНФОРМАЦИЕЙ */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
            <CardContent className="p-8 text-center">
              {/* Декоративный заголовок */}
              <div className="flex justify-center gap-2 text-primary mb-4">
                <span>✿</span>
                <Gift className="w-6 h-6" />
                <span>✿</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Подарки
              </h1>
              
              {/* Эмодзи */}
              <div className="flex justify-center gap-2 text-2xl mb-6">
                🎁💝✨
              </div>
              
              {/* Описание */}
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Лучший подарок для нас — это ваше присутствие! 
                Но если вы хотите порадовать нас, 
                мы будем благодарны за вклад в наш семейный бюджет.
              </p>

              {/* ═══════════════════════════════════════════════════════ */}
              {/* КАРТОЧКИ С ВАРИАНТАМИ */}
              {/* ═══════════════════════════════════════════════════════ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                
                {/* Карточка: Семейный бюджет */}
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Семейный бюджет
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ваш вклад поможет начать семейную жизнь 💕
                    </p>
                  </CardContent>
                </Card>

                {/* Карточка: Присутствие */}
                <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Ваше присутствие
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Главный подарок — разделить этот день с вами! 💕
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Gifts;
