/**
 * =============================================================================
 * СЕКЦИЯ RSVP — АНКЕТА ГОСТЯ
 * =============================================================================
 * 
 * Файл: src/components/sections/RSVPSection.tsx
 * Описание: Форма для подтверждения участия и выбора напитков
 * 
 * ПОЛЯ ФОРМЫ:
 * ───────────
 * 1. Имя гостя (обязательно)
 * 2. Количество гостей (1-6+)
 * 3. Придёте ли вы? (Да / Нет)
 * 4. Предпочтения по напиткам (только если "Да"):
 *    - Вино красное 🍷
 *    - Вино белое 🍾
 *    - Виски 🥃
 *    - Водка 🍸
 *    - Шампанское 🥂
 *    - Безалкогольное 🧃
 *    - Другое (с текстовым полем)
 * 5. Комментарий (опционально)
 * 
 * ПОСЛЕ ОТПРАВКИ:
 * ───────────────
 * - Форма заменяется на сообщение "Спасибо!"
 * - Данные сохраняются через GuestsContext (в localStorage)
 * - Показывается toast-уведомление
 * 
 * ДЕДЛАЙН:
 * ────────
 * До 1 мая (указано в подзаголовке)
 * 
 * @see src/contexts/GuestsContext.tsx - Сохранение данных
 * @see src/components/sections/GuestsSection.tsx - Отображение списка
 */
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList, Check } from 'lucide-react';
import { useGuests } from '@/contexts/GuestsContext';

// ═══════════════════════════════════════════════════════════════════════════
// КОНФИГУРАЦИЯ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Варианты напитков для выбора
 * @property id - Уникальный идентификатор для формы
 * @property label - Отображаемый текст с эмодзи
 */
const drinkOptions = [
  { id: 'red-wine', label: 'Вино красное 🍷' },
  { id: 'white-wine', label: 'Вино белое 🍾' },
  { id: 'whiskey', label: 'Виски 🥃' },
  { id: 'vodka', label: 'Водка 🍸' },
  { id: 'champagne', label: 'Шампанское 🥂' },
  { id: 'non-alcoholic', label: 'Что-нибудь безалкогольное 🧃' },
];

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Секция с анкетой гостя (RSVP)
 * Позволяет гостям подтвердить участие и выбрать напитки
 */
const RSVPSection = () => {
  const { toast } = useToast();
  const { addGuest } = useGuests();
  
  /** Флаг успешной отправки формы */
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  /**
   * Состояние формы
   * @property name - Имя гостя
   * @property guestCount - Количество человек
   * @property attending - Придёт ли гость ('yes' | 'no' | '')
   * @property drinks - Массив выбранных напитков
   * @property customDrink - Свой вариант напитка
   * @property comment - Комментарий
   */
  const [formData, setFormData] = useState({
    name: '',
    guestCount: '',
    attending: '',
    drinks: [] as string[],
    customDrink: '',
    comment: '',
  });

  /**
   * Обработчик изменения чекбокса напитка
   * @param drinkId - ID напитка
   * @param checked - Новое состояние чекбокса
   */
  const handleDrinkChange = (drinkId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      drinks: checked 
        ? [...prev.drinks, drinkId]      // Добавляем в массив
        : prev.drinks.filter(d => d !== drinkId)  // Убираем из массива
    }));
  };

  /**
   * Обработчик отправки формы
   * Сохраняет гостя и показывает сообщение об успехе
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Добавляем гостя через контекст (сохраняется в localStorage)
    addGuest({
      name: formData.name,
      guestCount: formData.guestCount || '1',
      attending: formData.attending as 'yes' | 'no',
    });
    
    // Показываем сообщение об успехе
    setIsSubmitted(true);
    toast({
      title: "Спасибо!",
      description: "Ваш ответ сохранён ✨",
    });
  };

  return (
    <section id="rsvp" className="py-20 px-4">
      <div className="container mx-auto max-w-lg">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ЗАГОЛОВОК СЕКЦИИ */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <ClipboardList className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Анкета гостя
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-8">
          Пожалуйста, заполните анкету<br />до 1 мая
        </p>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* КАРТОЧКА С ФОРМОЙ */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
          <CardContent className="p-6">
            {isSubmitted ? (
              /* ═══════════════════════════════════════════════════════ */
              /* СОСТОЯНИЕ: ФОРМА ОТПРАВЛЕНА */
              /* ═══════════════════════════════════════════════════════ */
              <div className="flex flex-col items-center justify-center py-16 animate-in fade-in zoom-in duration-500">
                <Check className="w-24 h-24 text-green-500 mb-6" strokeWidth={3} />
                <h3 className="text-2xl font-bold text-foreground mb-2">Спасибо!</h3>
                <p className="text-muted-foreground text-center">
                  Ваш ответ успешно отправлен ✨
                </p>
              </div>
            ) : (
              /* ═══════════════════════════════════════════════════════ */
              /* СОСТОЯНИЕ: ФОРМА ДЛЯ ЗАПОЛНЕНИЯ */
              /* ═══════════════════════════════════════════════════════ */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* ─────────────────────────────────────────────────── */}
                {/* ПОЛЕ: ИМЯ */}
                {/* ─────────────────────────────────────────────────── */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ваше имя
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите ваше имя"
                    required
                    className="bg-background/50"
                  />
                </div>

                {/* ─────────────────────────────────────────────────── */}
                {/* ПОЛЕ: КОЛИЧЕСТВО ГОСТЕЙ */}
                {/* ─────────────────────────────────────────────────── */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Количество гостей 👥
                  </label>
                  <Select
                    value={formData.guestCount}
                    onValueChange={(value) => setFormData({ ...formData, guestCount: value })}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Выберите количество" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 гость</SelectItem>
                      <SelectItem value="2">2 гостя</SelectItem>
                      <SelectItem value="3">3 гостя</SelectItem>
                      <SelectItem value="4">4 гостя</SelectItem>
                      <SelectItem value="5">5 гостей</SelectItem>
                      <SelectItem value="6+">6+ гостей</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* ─────────────────────────────────────────────────── */}
                {/* ПОЛЕ: ПРИДЁТЕ ЛИ ВЫ? */}
                {/* ─────────────────────────────────────────────────── */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Вы придёте?
                  </label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={formData.attending === 'yes' ? 'default' : 'outline'}
                      onClick={() => setFormData({ ...formData, attending: 'yes' })}
                      className="flex-1"
                    >
                      Да, приду 🎉
                    </Button>
                    <Button
                      type="button"
                      variant={formData.attending === 'no' ? 'default' : 'outline'}
                      onClick={() => setFormData({ ...formData, attending: 'no' })}
                      className="flex-1"
                    >
                      Не смогу
                    </Button>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────── */}
                {/* ПОЛЕ: НАПИТКИ (показывается только если attending = 'yes') */}
                {/* ─────────────────────────────────────────────────── */}
                {formData.attending === 'yes' && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Предпочтения по напиткам 🍹
                    </label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Можно выбрать несколько вариантов
                    </p>
                    
                    <div className="space-y-3">
                      {/* Стандартные варианты напитков */}
                      {drinkOptions.map((drink) => (
                        <div key={drink.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={drink.id}
                            checked={formData.drinks.includes(drink.id)}
                            onCheckedChange={(checked) => handleDrinkChange(drink.id, checked as boolean)}
                          />
                          <label
                            htmlFor={drink.id}
                            className="text-sm text-foreground cursor-pointer"
                          >
                            {drink.label}
                          </label>
                        </div>
                      ))}
                      
                      {/* Свой вариант напитка */}
                      <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                          id="custom-drink"
                          checked={formData.drinks.includes('custom')}
                          onCheckedChange={(checked) => handleDrinkChange('custom', checked as boolean)}
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="custom-drink"
                            className="text-sm text-foreground cursor-pointer"
                          >
                            Другое (вписать своё) ✏️
                          </label>
                          {/* Текстовое поле появляется при выборе "Другое" */}
                          {formData.drinks.includes('custom') && (
                            <Input
                              type="text"
                              value={formData.customDrink}
                              onChange={(e) => setFormData({ ...formData, customDrink: e.target.value })}
                              placeholder="Напишите ваш вариант"
                              className="bg-background/50 mt-2"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─────────────────────────────────────────────────── */}
                {/* ПОЛЕ: КОММЕНТАРИЙ */}
                {/* ─────────────────────────────────────────────────── */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Комментарий (опционально)
                  </label>
                  <Textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Дополнительная информация..."
                    className="bg-background/50"
                    rows={3}
                  />
                </div>

                {/* ─────────────────────────────────────────────────── */}
                {/* КНОПКА ОТПРАВКИ */}
                {/* ─────────────────────────────────────────────────── */}
                <Button type="submit" className="w-full">
                  Отправить ✨
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RSVPSection;
