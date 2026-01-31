import { Heart, Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WeddingInvitationProps {
  onBack: () => void;
}

const WeddingInvitation = ({ onBack }: WeddingInvitationProps) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden p-4 md:p-8">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(350 55% 85%) 0%, hsl(350 45% 80%) 50%, hsl(350 55% 85%) 100%)',
        }}
      />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад</span>
      </button>

      {/* Floating hearts decoration */}
      <div className="absolute top-10 left-10 animate-float" style={{ animationDelay: '0s' }}>
        <Heart className="w-6 h-6 text-primary/40" fill="currentColor" />
      </div>
      <div className="absolute top-20 right-16 animate-float" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-8 h-8 text-primary/30" fill="currentColor" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <Heart className="w-5 h-5 text-primary/35" fill="currentColor" />
      </div>
      <div className="absolute bottom-32 right-10 animate-float" style={{ animationDelay: '0.3s' }}>
        <Heart className="w-7 h-7 text-primary/25" fill="currentColor" />
      </div>

      {/* Main invitation card */}
      <Card className="relative z-10 max-w-lg w-full bg-card/90 backdrop-blur-sm border-primary/20 shadow-2xl animate-fade-in">
        <CardContent className="p-8 md:p-12 text-center">
          {/* Header with names */}
          <div className="mb-8">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
              Приглашение на свадьбу
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
              Алексей
            </h1>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-px bg-primary/40 w-16" />
              <Heart className="w-6 h-6 text-primary" fill="currentColor" />
              <div className="h-px bg-primary/40 w-16" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground">
              Мария
            </h1>
          </div>

          {/* Invitation text */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            С радостью приглашаем Вас разделить с нами 
            счастливый день нашей свадьбы!
          </p>

          {/* Event details */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3 text-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-lg">15 августа 2025</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-lg">15:00</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-lg">Ресторан «Романтика»</span>
            </div>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px bg-primary/30 w-8" />
            <div className="w-2 h-2 rounded-full bg-primary/50" />
            <div className="h-px bg-primary/30 w-8" />
          </div>

          {/* Footer message */}
          <p className="text-muted-foreground text-sm italic">
            Ваше присутствие — лучший подарок для нас!
          </p>

          {/* RSVP Button */}
          <Button
            className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            Подтвердить участие
          </Button>
        </CardContent>
      </Card>

      {/* Bottom decoration */}
      <div className="absolute bottom-4 flex items-center gap-2 text-foreground/50 text-sm z-10">
        <Heart className="w-4 h-4" fill="currentColor" />
        <span>С любовью</span>
        <Heart className="w-4 h-4" fill="currentColor" />
      </div>
    </div>
  );
};

export default WeddingInvitation;
