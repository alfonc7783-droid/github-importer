/**
 * Главный компонент приложения — Свадебное приглашение
 * Алексей и Мария — 3 июля 2026
 */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicProvider } from "./contexts/MusicContext";

// Страницы приложения
import Index from "./pages/Index";
import Home from "./pages/Home";
import Venue from "./pages/Venue";
import Schedule from "./pages/Schedule";
import DressCode from "./pages/DressCode";
import Gifts from "./pages/Gifts";
import NotFound from "./pages/NotFound";

// Клиент для React Query (кэширование данных)
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MusicProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/dress-code" element={<DressCode />} />
            <Route path="/gifts" element={<Gifts />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MusicProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
