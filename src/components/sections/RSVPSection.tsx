import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const RSVPSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Спасибо!",
      description: "Ваш ответ сохранён ✨",
    });
    setFormData({ name: '', attending: '', comment: '' });
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
