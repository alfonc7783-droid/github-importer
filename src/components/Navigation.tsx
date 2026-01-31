/**
 * =============================================================================
 * КОМПОНЕНТ НАВИГАЦИИ
 * =============================================================================
 * 
 * Файл: src/components/Navigation.tsx
 * Описание: Фиксированное меню для перехода между секциями главной страницы
 * 
 * ФУНКЦИОНАЛЬНОСТЬ:
 * ─────────────────
 * - Отображает ссылки на секции: Главная, Детали, Дата, Анкета, Гости
 * - При клике плавно скроллит к нужной секции
 * - Работает даже если пользователь находится на другой странице:
 *   сначала переходит на /home, затем скроллит
 * 
 * СТИЛИЗАЦИЯ:
 * ───────────
 * - Фиксировано сверху (position: fixed)
 * - Полупрозрачный фон с размытием (backdrop-blur)
 * - Адаптивно под мобильные устройства
 * 
 * СЕКЦИИ (id элементов на странице):
 * ───────────────────────────────────
 * - hero    → Главная секция с именами
 * - details → Карточки с деталями
 * - date    → Календарь и отсчёт
 * - rsvp    → Анкета гостя
 * - guests  → Список гостей
 * 
 * @see src/pages/Home.tsx - Страница с секциями
 */
import { useLocation, useNavigate } from 'react-router-dom';

// ═══════════════════════════════════════════════════════════════════════════
// КОНФИГУРАЦИЯ НАВИГАЦИИ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Элементы навигационного меню
 * @property label - Отображаемый текст
 * @property section - ID секции на странице (для scrollIntoView)
 */
const navItems = [
  { label: 'Главная', section: 'hero' },
  { label: 'Детали', section: 'details' },
  { label: 'Дата', section: 'date' },
  { label: 'Анкета', section: 'rsvp' },
  { label: 'Гости', section: 'guests' },
];

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Навигационная панель
 * Фиксированное меню с плавным скроллом к секциям
 */
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  /**
   * Обработчик клика по элементу навигации
   * 
   * ЛОГИКА:
   * 1. Если пользователь НЕ на /home — сначала переходим туда
   * 2. После перехода (через 100мс) скроллим к нужной секции
   * 3. Если уже на /home — сразу скроллим
   * 
   * @param section - ID секции для скролла
   */
  const handleNavClick = (section: string) => {
    if (location.pathname !== '/home') {
      // Сначала переходим на главную страницу
      navigate('/home');
      
      // Ждём завершения навигации, затем скроллим
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Уже на главной — сразу скроллим
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
