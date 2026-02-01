/**
 * =============================================================================
 * КОМПОНЕНТ НАВИГАЦИОННОЙ ССЫЛКИ
 * =============================================================================
 * 
 * Файл: src/components/NavLink.tsx
 * Описание: Обёртка над NavLink из react-router-dom с поддержкой классов
 * 
 * НАЗНАЧЕНИЕ:
 * ───────────
 * Упрощает использование NavLink, позволяя передавать className как строку
 * вместо функции, при этом сохраняя возможность стилизации активных ссылок.
 * 
 * ПРОПСЫ:
 * ───────
 * - className — базовые классы для ссылки
 * - activeClassName — классы, добавляемые когда ссылка активна
 * - pendingClassName — классы, добавляемые во время загрузки
 * - to — путь для навигации (из react-router-dom)
 * - ...остальные пропсы NavLink
 * 
 * ИСПОЛЬЗОВАНИЕ:
 * ──────────────
 * <NavLink 
 *   to="/home" 
 *   className="text-gray-500" 
 *   activeClassName="text-primary font-bold"
 * >
 *   Главная
 * </NavLink>
 * 
 * @see src/components/Navigation.tsx - Не используется (сейчас навигация на кнопках)
 */
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// ТИПЫ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Пропсы компонента NavLink
 * Расширяет стандартные NavLinkProps, заменяя className на строку
 */
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  /** Базовые CSS-классы */
  className?: string;
  /** Классы для активного состояния */
  activeClassName?: string;
  /** Классы для состояния загрузки */
  pendingClassName?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Навигационная ссылка с поддержкой активных классов
 * 
 * @param className - Базовые классы
 * @param activeClassName - Классы для активного маршрута
 * @param pendingClassName - Классы во время навигации
 * @param to - Целевой путь
 */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
