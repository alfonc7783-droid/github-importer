import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const drinkOptions = [
  { id: 'red-wine', label: 'Вино красное 🍷' },
  { id: 'white-wine', label: 'Вино белое 🥂' },
  { id: 'whiskey', label: 'Виски 🥃' },
  { id: 'vodka', label: 'Водка' },
  { id: 'champagne', label: 'Шампанское 🍾' },
  { id: 'non-alcoholic', label: 'Что-нибудь безалкогольное 🧃' },
];

const RSVPSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
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
    toast({
      title: "Спасибо!",
      description: "Ваш ответ сохранён ✨",
    });
    setFormData({ name: '', attending: '', drinks: [], customDrink: '', comment: '' });
  };

  return (
    <section id="rsvp" className="py-20 px-4">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Анкета гостя
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Пожалуйста, заполните анкету до 1 мая
        </p>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
          <CardContent className="p-6">
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

              <div>
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
                        Другое (вписать своё)
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RSVPSection;
