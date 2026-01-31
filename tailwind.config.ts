/**
 * =============================================================================
 * КОНФИГУРАЦИЯ TAILWIND CSS
 * =============================================================================
 * 
 * Файл: tailwind.config.ts
 * Описание: Настройка Tailwind CSS для проекта свадебного приглашения
 * 
 * ОСОБЕННОСТИ:
 * ────────────
 * - Тёмная тема через класс .dark
 * - Семантические цвета из CSS-переменных (см. index.css)
 * - Интеграция с shadcn/ui компонентами
 * - Анимации для аккордеона (Radix UI)
 * 
 * ЦВЕТОВАЯ СИСТЕМА:
 * ─────────────────
 * Все цвета определены через CSS-переменные в index.css и используются
 * здесь через hsl(var(--имя)). Это позволяет:
 * - Легко менять тему
 * - Поддерживать тёмный режим
 * - Сохранять консистентность цветов
 * 
 * ИСПОЛЬЗОВАНИЕ ЦВЕТОВ:
 * ─────────────────────
 * - bg-background, text-foreground — основные фон и текст
 * - bg-primary, text-primary — розовый акцент
 * - bg-accent — золотой для важных элементов
 * - bg-muted — приглушённые элементы
 * 
 * @see src/index.css - CSS-переменные с цветами
 */
import type { Config } from "tailwindcss";

export default {
  /**
   * ТЁМНАЯ ТЕМА
   * Активируется добавлением класса "dark" к элементу
   */
  darkMode: ["class"],
  
  /**
   * ФАЙЛЫ ДЛЯ СКАНИРОВАНИЯ
   * Tailwind ищет использование классов в этих файлах
   */
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  
  /**
   * ПРЕФИКС ДЛЯ КЛАССОВ
   * Пустой = без префикса (стандартные классы Tailwind)
   */
  prefix: "",
  
  theme: {
    /**
     * НАСТРОЙКИ КОНТЕЙНЕРА
     * Центрированный контейнер с отступами
     */
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",  // Максимальная ширина контейнера
      },
    },
    
    extend: {
      /**
       * ═══════════════════════════════════════════════════════════════════
       * РАСШИРЕНИЕ ЦВЕТОВОЙ ПАЛИТРЫ
       * ═══════════════════════════════════════════════════════════════════
       * 
       * Все цвета берутся из CSS-переменных, определённых в index.css
       * Формат: hsl(var(--имя-переменной))
       */
      colors: {
        /* Границы и рамки */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        /* Основные фон и текст */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        /* PRIMARY — Розовый акцентный цвет */
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        
        /* SECONDARY — Вторичный цвет */
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        
        /* DESTRUCTIVE — Для ошибок и предупреждений */
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        
        /* MUTED — Приглушённые элементы */
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        /* ACCENT — Золотой для важных элементов */
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        /* POPOVER — Всплывающие элементы */
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        /* CARD — Карточки */
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        /* SIDEBAR — Боковая панель (для shadcn/ui) */
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      
      /**
       * ═══════════════════════════════════════════════════════════════════
       * РАДИУСЫ СКРУГЛЕНИЯ
       * ═══════════════════════════════════════════════════════════════════
       * Используют CSS-переменную --radius из index.css
       */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      /**
       * ═══════════════════════════════════════════════════════════════════
       * КЕЙФРЕЙМЫ АНИМАЦИЙ
       * ═══════════════════════════════════════════════════════════════════
       * Для компонентов Radix UI (Accordion)
       */
      keyframes: {
        /* Раскрытие аккордеона */
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        /* Сворачивание аккордеона */
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      
      /**
       * ═══════════════════════════════════════════════════════════════════
       * АНИМАЦИИ
       * ═══════════════════════════════════════════════════════════════════
       * Классы для применения keyframes
       */
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  
  /**
   * ПЛАГИНЫ
   * tailwindcss-animate — дополнительные утилиты для анимаций
   */
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
