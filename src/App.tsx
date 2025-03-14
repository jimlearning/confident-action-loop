
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { useViewport } from '@/hooks/useViewport';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Timelines from '@/pages/Timelines';
import BookDetail from '@/pages/BookDetail';
import Categories from '@/pages/Categories';
import CategoryDetail from '@/pages/CategoryDetail';
import Tags from '@/pages/Tags';
import TagDetail from '@/pages/TagDetail';
import NotFound from '@/pages/NotFound';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from '@/components/Navbar';

const queryClient = new QueryClient();

function AppContent() {
  // Apply consistent viewport settings across all routes
  useViewport(2.0);
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/timelines" element={<Timelines />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categorySlug" element={<CategoryDetail />} />
          <Route path="/categories/:categorySlug/:subcategorySlug" element={<CategoryDetail />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:tagName" element={<TagDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="theme">
            <AppContent />
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
