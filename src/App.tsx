/**
 * =============================================================================
 * ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ — СВАДЕБНОЕ ПРИГЛАШЕНИЕ
 * =============================================================================
 * 
 * Файл: src/App.tsx
 * Описание: Корневой компонент, объединяющий всё приложение
 * 
 * Молодожёны: Алексей и Мария
 * Дата свадьбы: 3 июля 2026
 * 
 * СТРУКТУРА ПРИЛОЖЕНИЯ:
 * ─────────────────────
 * ├── QueryClientProvider - Кэширование данных (React Query)
 * │   ├── TooltipProvider - Всплывающие подсказки (Radix UI)
 * │   │   ├── MusicProvider - Глобальное управление музыкой
 * │   │   │   ├── Toaster - Уведомления (shadcn/ui)
 * │   │   │   ├── Sonner - Альтернативные уведомления
 * │   │   │   └── BrowserRouter - Маршрутизация (React Router)
 * 
 * МАРШРУТЫ (ROUTES):
 * ──────────────────
 * /           → Index      - Стартовый экран с виниловой пластинкой
 * /home       → Home       - Главная страница приглашения
 * /venue      → Venue      - Место проведения (карта)
 * /schedule   → Schedule   - Расписание дня
 * /dress-code → DressCode  - Дресс-код и палитра цветов
 * /gifts      → Gifts      - Информация о подарках
 * *           → NotFound   - Страница 404
 * 
 * @see src/pages/ - Все страницы приложения
 * @see src/contexts/MusicContext.tsx - Контекст управления музыкой
 */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicProvider } from "./contexts/MusicContext";

// ═══════════════════════════════════════════════════════════════════════════
// ИМПОРТ СТРАНИЦ
// ═══════════════════════════════════════════════════════════════════════════
import Index from "./pages/Index";       // Стартовый экран с пластинкой
import Home from "./pages/Home";         // Главная страница приглашения
import Venue from "./pages/Venue";       // Место проведения
import Schedule from "./pages/Schedule"; // Расписание дня
import DressCode from "./pages/DressCode"; // Дресс-код
import Gifts from "./pages/Gifts";       // Информация о подарках
import NotFound from "./pages/NotFound"; // Страница 404

// ═══════════════════════════════════════════════════════════════════════════
// НАСТРОЙКА REACT QUERY
// ═══════════════════════════════════════════════════════════════════════════
/**
 * QueryClient — клиент для кэширования и синхронизации данных
 * Используется для будущей интеграции с API/базой данных
 */
const queryClient = new QueryClient();

// ═══════════════════════════════════════════════════════════════════════════
// ГЛАВНЫЙ КОМПОНЕНТ
// ═══════════════════════════════════════════════════════════════════════════
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MusicProvider>
        {/* Компоненты уведомлений */}
        <Toaster />
        <Sonner />
        
        {/* Маршрутизация приложения */}
        <BrowserRouter>
          <Routes>
            {/* Стартовый экран — клик по пластинке открывает приглашение */}
            <Route path="/" element={<Index />} />
            
            {/* Главная страница со всеми секциями */}
            <Route path="/home" element={<Home />} />
            
            {/* Детальные страницы */}
            <Route path="/venue" element={<Venue />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/dress-code" element={<DressCode />} />
            <Route path="/gifts" element={<Gifts />} />
            
            {/* ВАЖНО: Добавляйте новые маршруты ВЫШЕ этой строки */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MusicProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
