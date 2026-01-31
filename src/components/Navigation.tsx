/**
 * Компонент навигации
 * Фиксированное меню для перехода между секциями главной страницы
 */
import { useLocation, useNavigate } from 'react-router-dom';

/** Элементы навигации */
const navItems = [
  { label: 'Главная', section: 'hero' },
  { label: 'Детали', section: 'details' },
  { label: 'Дата', section: 'date' },
  { label: 'Анкета', section: 'rsvp' },
  { label: 'Гости', section: 'guests' },
];

/** Навигационная панель */
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  /** Обработчик клика по элементу навигации */
  const handleNavClick = (section: string) => {
    // Если не на главной странице, сначала переходим туда
    if (location.pathname !== '/home') {
      navigate('/home');
      // Ждём навигацию, затем скроллим к секции
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
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
      </div>
    </nav>
  );
};

export default Navigation;
