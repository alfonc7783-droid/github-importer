/**
 * =============================================================================
 * ТОЧКА ВХОДА ПРИЛОЖЕНИЯ
 * =============================================================================
 * 
 * Файл: src/main.tsx
 * Описание: Главная точка входа React-приложения
 * 
 * Инициализирует React и монтирует главный компонент App в DOM.
 * Подключает глобальные стили из index.css.
 * 
 * @see src/App.tsx - Главный компонент приложения
 * @see src/index.css - Глобальные стили и CSS-переменные
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Монтируем приложение в элемент #root из index.html
createRoot(document.getElementById("root")!).render(<App />);
