import { Link, useLocation } from 'react-router-dom';
import discoBall from '@/assets/disco-ball.gif';

const navItems = [
  { label: 'Главная', href: '/home', section: 'hero' },
  { label: 'Детали', href: '/home#details', section: 'details' },
  { label: 'Дата', href: '/home#date', section: 'date' },
  { label: 'Анкета', href: '/home#rsvp', section: 'rsvp' },
  { label: 'Гости', href: '/home#guests', section: 'guests' },
];

const Navigation = () => {
  const location = useLocation();
  
  const handleNavClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.section)}
              className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
        <img 
          src={discoBall} 
          alt="Disco ball" 
          className="w-16 h-16 object-contain"
        />
      </div>
    </nav>
  );
};

export default Navigation;
