/**
 * Секция анкеты гостя (RSVP)
 * Форма для подтверждения участия и выбора напитков
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

/** Варианты напитков для выбора */
const drinkOptions = [
  { id: 'red-wine', label: 'Вино красное 🍷' },
  { id: 'white-wine', label: 'Вино белое 🍾' },
  { id: 'whiskey', label: 'Виски 🥃' },
  { id: 'vodka', label: 'Водка 🍸' },
  { id: 'champagne', label: 'Шампанское 🥂' },
  { id: 'non-alcoholic', label: 'Что-нибудь безалкогольное 🧃' },
];

const RSVPSection = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    guestCount: '',
    attending: '',
    drinks: [] as string[],
    customDrink: '',
    comment: '',
  });

  const handleDrinkChange = (drinkId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      drinks: checked 
        ? [...prev.drinks, drinkId]
        : prev.drinks.filter(d => d !== drinkId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Спасибо!",
      description: "Ваш ответ сохранён ✨",
    });
  };

  return (
    <section id="rsvp" className="py-20 px-4">
      <div className="container mx-auto max-w-lg">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ClipboardList className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Анкета гостя
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-8">
          Пожалуйста, заполните анкету<br />до 1 мая
        </p>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
          <CardContent className="p-6">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 animate-in fade-in zoom-in duration-500">
                <Check className="w-24 h-24 text-green-500 mb-6" strokeWidth={3} />
                <h3 className="text-2xl font-bold text-foreground mb-2">Спасибо!</h3>
                <p className="text-muted-foreground text-center">
                  Ваш ответ успешно отправлен ✨
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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

                {formData.attending === 'yes' && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Предпочтения по напиткам 🍹
                    </label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Можно выбрать несколько вариантов
                    </p>
                    <div className="space-y-3">
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
