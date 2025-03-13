
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
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

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Navbar />
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
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
