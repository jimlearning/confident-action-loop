import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import BookDetail from "./pages/BookDetail";
import Books from "./pages/Books";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tags from "./pages/Tags";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryName" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:tagName" element={<Tags />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
