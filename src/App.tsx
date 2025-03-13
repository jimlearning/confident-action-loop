import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { usePathname } from '@/hooks/use-pathname';

const queryClient = new QueryClient();

function App() {
  const pathname = usePathname();
  const linkClass = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-secondary data-[active=true]:text-foreground hover:bg-secondary/50 h-9 px-4 py-2";

  return (
    <BrowserRouter>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
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
